import type { NextApiRequest, NextApiResponse } from "next";
import { getLogger } from "../../../../logging/log-util";
import { getTagListFromString } from "../../../../src/classification/helpers/getTagListFromtString";
import { classifyByTags } from "../../../../src/classification/tags/classifyByTags";
import { reduceClassifications } from "../../../../src/classification/helpers/reduceClassifications";
import {
  ClassificationResponse,
  RuralEventClassification,
} from "../../../../src/types/api.types";

/**
 * @swagger
 * /api/classify/bytags:
 *   get:
 *     summary: Returns a category for a given tag.
 *     description: Evaluates a tag based on some mapping definitions and returns a category.
 *     tags:
 *       - Classify
 *     parameters:
 *       - name: tags
 *         description: List of tags, comma separated.
 *         in: query
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Classification for the given tags typed as RuralEventClassification.
 *       400:
 *         description: Missing tag parameter.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No category found for the given tag.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClassificationResponse>
) {
  const log = getLogger("api.classify.bytags");
  const { tags } = req.query;
  const tagList: string[] = getTagListFromString(tags as string);

  if (tagList.length <= 0)
    return res
      .status(400)
      .end("Empty tags parameter. Please provide a list of tags.");

  // get classifications for all tags
  let classificationList: RuralEventClassification[] = await classifyByTags(
    tagList
  );

  // reduce to one combined and ranked classification
  const classification: RuralEventClassification =
    reduceClassifications(classificationList);

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
