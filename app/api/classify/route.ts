import { getLogger } from "../../../logging/log-util";
import { tagsFromText } from "../../../src/classification/helpers/tagsFromText";
import { classifyByOpenAiCached } from "../../../src/openai/classify/classify.cached";
import { ClassifyQuery } from "../../../src/openai/classify/classify.types";
import { tagByOpenAiCached } from "../../../src/openai/tag/tag.cached";
import { TagQuery, TagResponse } from "../../../src/openai/tag/tag.types";
import { ClassificationResponse } from "../../../src/types/api.types";

/**
 * @swagger
 * /api/classify:
 *   get:
 *     summary: Classifies a limited amount of data given by url parameters.
 *     description: This endpoint classifies a limited amount of data given by url parameters. Use this endpoint if you have a small amount of data like a list of tags or a title. Then you can benefit from the cache headers and the CDN.
 *     tags:
 *       - Classify
 *     parameters:
 *       - name: summary
 *         description: A short text like a title or a summary.
 *         in: query
 *         required: false
 *         type: string
 *       - name: tags
 *         description: A list of tags separated by comma.
 *         in: query
 *         required: false
 *         type: string
 *       - name: others
 *         description: Any other parameters will be used as body.
 *         in: query
 *         required: false
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Category and tags as JSON typed as RuralEventClassification.
 *       400:
 *         description: Missing parameters or URL parameters are too long. Max length is 1000 characters.
 *       500:
 *         description: Could not classify the given content.
 */
export async function GET(request: Request) {
  const log = getLogger("api/classify:GET");

  // get all url parameters
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  // respond with 400 if no parameters are given
  const keys = Array.from(searchParams.keys());
  if (keys.length === 0) {
    return new Response(
      "No parameters given. Please provide at least on URL parameter. Best is to provide 'tags' and a 'summary'.",
      {
        status: 400,
      }
    );
  }

  // respond with 400 if length is greater than 1000
  const length = keys.map((key) => searchParams.get(key)).join("").length;

  if (length > 1000) {
    log.warn({ data: searchParams }, "URL parameters are too long.");
    return new Response(
      "URL parameters are too long. Max length is 1000 characters. Please provide shorter parameters.",
      {
        status: 400,
      }
    );
  }

  // respond with 400 if no tags are given and all other parameters are shorter than 50 characters
  if (
    !keys.includes("tags") &&
    keys
      .filter((key) => key !== "tags")
      .map((key) => searchParams.get(key))
      .join("").length < 50
  ) {
    log.warn(
      { data: searchParams },
      "No tags given and all other parameters are shorter than 50 characters."
    );
    return new Response(
      "No tags given and all other parameters are shorter than 50 characters. Please provide 'tags' or a longer text.",
      {
        status: 400,
      }
    );
  }

  // get summary from searchParams or undefined
  const summary = searchParams.get("summary") || undefined;

  // get tags from searchParams as array slit by comma
  const tags = searchParams.get("tags")?.split(",") || undefined;

  // get body from searchParams by concatenating all searchParams not "summary" and "tags"
  const body =
    Array.from(searchParams.keys())
      .filter((key) => key !== "summary" && key !== "tags")
      .map((key) => `${key}: ${searchParams.get(key)}`)
      .join("\n") || undefined;

  const query: ClassifyQuery = {
    summary: summary,
    tags: tags,
    content: body,
  };

  let response: ClassificationResponse;

  try {
    response = await classifyByOpenAiCached(query);
  } catch (error) {
    log.error({ error, query }, "Error while classifying by open ai.");
    return new Response(`Could not classify the given content. ${error}`, {
      status: 500,
    });
  }

  // define cache headers
  const cacheTTL: number =
    parseInt(process.env.CACHE_MAX_AGE as string) || 30 * 24 * 60 * 60; // 30 days
  const staleTime: number =
    parseInt(process.env.CACHE_STALE_WHILE_REVALIDATE as string) || 60 * 60; // 1 hour

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `max-age=${cacheTTL}, s-maxage=${cacheTTL}, stale-while-revalidate=${staleTime}`,
    },
  });
}

/**
 * @swagger
 * /api/classify:
 *   post:
 *     summary: Classifies data given by the request body.
 *     description: This endpoint classifies data given by the request body. Use this endpoint if you have a large amount of data like a longer text or json. The response is not cachable at HTTP/CDN level but will be cached internally to provide best performance on recurring requests.
 *     tags:
 *       - Classify
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Category and tags as JSON typed as RuralEventClassification.
 *       400:
 *         description: Missing body or body contains no json.
 *       500:
 *         description: Could not classify the given content.
 */
export async function POST(request: Request) {
  const log = getLogger("api/classify:POST");

  // check if body has any value
  let body: object | null = null;

  try {
    body = await request.json();
  } catch (error) {
    log.error({ error }, "Error while parsing request body.");
    return new Response(`Could not parse body. Please provide a json object.`, {
      status: 400,
    });
  }

  if (!body || typeof body !== "object") {
    log.warn("Incoming request body was empty or not an object.");
    return new Response(
      "Request body is missing or no valid json. Please provide a json object.",
      {
        status: 400,
      }
    );
  }

  // get summary from body if available
  const summary = (body as { summary?: string }).summary || undefined;
  log.debug({ summary }, "Summary from body");

  // get tags from body if available
  let tags = (body as { tags?: string[] }).tags || undefined;
  log.debug({ tags }, "Tags from body");

  // get content from body if available
  const content = (body as { content?: string }).content || undefined;
  log.debug({ content }, "Content from body");

  // get all other keys from body
  const otherKeys = Object.keys(body).filter(
    (key) => key !== "summary" && key !== "tags" && key !== "content"
  );

  // search for tag in content
  let textTags: string[] | null | undefined = undefined;
  // concat values of all other keys to one plain text string
  const otherValues = otherKeys.map((key) => (body as any)[key]);
  const plainText: string = [content, ...otherValues].join(", ");
  textTags = tagsFromText(plainText);
  log.debug({ tags: textTags }, "Tags from text.");

  // add text tags to tags if not already included
  if (textTags && textTags.length > 0) {
    if (!tags) {
      tags = textTags;
    } else {
      tags = [...tags, ...textTags];
    }
  }

  // ensure that tags are unique
  if (tags) {
    tags = Array.from(new Set(tags));
  }

  // if no tags are given and no tags are included in the body, generate some tags before classifying
  let generatedTags: string[] | undefined = undefined;
  if (!tags) {
    log.debug("No tags given. Generating some tags before classifying.");
    const tagQuery: TagQuery = {
      summary: summary,
      content: content,
      ...otherKeys.reduce((acc, key) => {
        acc[key] = (body as any)[key];
        return acc;
      }, {} as Record<string, any>),
    };

    const openaiTags: TagResponse | null = await tagByOpenAiCached(tagQuery);
    if (openaiTags && openaiTags.tags) {
      generatedTags = openaiTags.tags;
    }
    log.debug({ generatedTags }, "Generated tags by open ai.");
  }

  // now start classifying
  const query: ClassifyQuery = {
    summary: summary,
    tags: tags || textTags || generatedTags || undefined,
    content: content,
    ...otherKeys.reduce((acc, key) => {
      acc[key] = (body as any)[key];
      return acc;
    }, {} as Record<string, any>),
  };

  log.debug({ query }, "Query for classification.");

  let response: ClassificationResponse;

  try {
    response = await classifyByOpenAiCached(query);
  } catch (error) {
    log.error({ error, query }, "Error while classifying by open ai.");
    return new Response(`Could not classify the given content. ${error}`, {
      status: 500,
    });
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
