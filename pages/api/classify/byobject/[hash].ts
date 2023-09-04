import type { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "../../../../logging/log-util";
import { classifyByOpenAi } from "../../../../src/openai/classifyByOpenAi";
import { OpenAiClassification } from "../../../../src/openai/openAiClassification.types";
import { RuralEventCategory } from "../../../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { RuralEventScope } from "../../../../packages/rural-event-categories/src/types/ruralEventScopes";

interface Classification {
  category: RuralEventCategory;
  scope: RuralEventScope;
}

/**
 * @swagger
 * /api/classify/byobject/{hash}:
 *   post:
 *     summary: Returns a classification and a scopification for a json object.
 *     description: Based on an incoming json object, a classification and a scopification is returned. For both the open ai api is used to get best results.
 *     tags:
 *       - Classify
 *     parameters:
 *       - name: hash
 *         description: Hash of the content to allow post request caching.
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Classification and scopification typed as Classification.
 *       400:
 *         description: Missing body or parameters.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No classification found.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Classification>
) {
  const log = getLogger("api.classify.byobject");
  const { hash } = req.query;

  // check if POST request
  if (req.method !== "POST")
    return res.status(400).end("Please use a POST request.");

  // check for hash
  if (!hash)
    return res
      .status(400)
      .end(
        "Please provide a hash of the content to classify. This allows caching of the result."
      );

  // check if body has any value
  const body: object = req.body;
  if (!body || typeof body !== "object")
    return res.status(400).end("Please provide a json object to classify.");

  log.debug("body", body);

  const openAiClassification: OpenAiClassification | null =
    await classifyByOpenAi(body);

  // return error if no response
  if (!openAiClassification) {
    return res.status(404).end("No classification found.");
  }

  let mappedScope: RuralEventScope = "nearby"; // default

  switch (openAiClassification.relevance) {
    case "tight-nearby":
      mappedScope = "nearby";
      break;
    case "formal-municipality":
      mappedScope = "municipality";
      break;
    case "wider-region":
      mappedScope = "region";
      break;
    case "specific-location":
      mappedScope = "community";
      break;
    default:
      mappedScope = "nearby";
  }

  // convert from OpenAiClassification to Classification
  const typedResult: Classification = {
    category: openAiClassification.category as unknown as RuralEventCategory,
    scope: mappedScope as RuralEventScope,
  };

  // add cache header to allow cdn caching of responses
  // const cacheMaxAge: string = process.env.CACHE_MAX_AGE || "604800"; // 7 days
  // const cacheStaleWhileRevalidate: string =
  //   process.env.CACHE_STALE_WHILE_REVALIDATE || "120"; // 2 minutes
  // res.setHeader(
  //   "Cache-Control",
  //   `max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}, stale-while-revalidate=${cacheStaleWhileRevalidate}`
  // );

  return res.status(200).json(typedResult);
}
