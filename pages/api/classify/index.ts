import type { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "../../../logging/log-util";
import { getTagListFromString } from "../../../src/classification/helpers/getTagListFromtString";
import { tagsFromText } from "../../../src/classification/helpers/tagsFromText";
import { reduceClassifications } from "../../../src/classification/helpers/reduceClassifications";
import { classifyByTags } from "../../../src/classification/tags/classifyByTags";
import { classifyByText } from "../../../src/classification/naturallanguage/classifyByText";
import {
  ClassificationResponse,
  RuralEventClassification,
} from "../../../src/types/api.types";

/**
 * @swagger
 * /api/classify/?tags={tags}&text={text}:
 *   get:
 *     summary: Returns a classification for a text and/or tags.
 *     description: Uses tags from tags parameter and extracted from the text to evaluate a combined classification based on a mapping definition. If no tags are included, a classification is evaluated by a ai service based on the given text. One combined classification is returned.
 *     tags:
 *       - Classify
 *     parameters:
 *       - name: tags
 *         description: List of tags, comma separated.
 *         in: query
 *         required: false
 *         type: string
 *       - name: text
 *         description: Text as string. Might contain tags as hash tags e.g. #tag1 #tag2.
 *         in: query
 *         required: false
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Classification for the given tags typed as RuralEventClassification.
 *       400:
 *         description: Missing tags or text parameter.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No classification found for the given tags or text.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClassificationResponse>
) {
  const log = getLogger("api.classify");
  const { tags, text } = req.query;

  if (!tags && !text)
    return res
      .status(400)
      .end(
        "Empty tags and text parameter. Please provide a list of tags or at least a text."
      );

  const tagList: string[] = getTagListFromString(tags as string);
  const tagListFromText: string[] =
    (tagsFromText(text as string) as string[]) || [];

  // combine tags from param and from text
  const combinedTagList: string[] = [...tagList, ...tagListFromText];

  // ensure unique tags
  const uniqueTagList: string[] = [...new Set(combinedTagList)];
  log.debug({ tags: uniqueTagList }, "unique tags from tags and text params");

  let classification: RuralEventClassification | null;

  if (uniqueTagList.length > 0) {
    // if tags are available, classify by tags
    // get classifications for all tags
    let classificationList: RuralEventClassification[] = await classifyByTags(
      uniqueTagList
    );

    // reduce to one combined and ranked classification
    classification = reduceClassifications(classificationList);
  } else {
    // if no result and text is given, get classification by text
    classification = await classifyByText(text as string);
  }

  // add cache header to allow cdn caching of responses
  const cacheMaxAge: string = process.env.CACHE_MAX_AGE || "604800"; // 7 days
  const cacheStaleWhileRevalidate: string =
    process.env.CACHE_STALE_WHILE_REVALIDATE || "120"; // 2 minutes
  res.setHeader(
    "Cache-Control",
    `max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}, stale-while-revalidate=${cacheStaleWhileRevalidate}`
  );

  return res.status(200).json(classification);
}
