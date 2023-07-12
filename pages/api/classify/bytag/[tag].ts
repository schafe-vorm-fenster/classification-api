import type { NextApiRequest, NextApiResponse } from "next";
import { classifyByTag } from "../../../../src/classification/tags/classifyByTag";
import { getLogger } from "../../../../logging/log-util";
import {
  ClassificationResponse,
  RuralEventClassification,
} from "../../../../src/types/api.types";

/**
 * @swagger
 * /api/classify/bytag/{tag}:
 *   get:
 *     summary: Returns a classification for a given tag.
 *     description: Evaluates a tag based on a mapping definition and returns a classification.
 *     tags:
 *       - Classify
 *     parameters:
 *       - name: tag
 *         description: A tag as string.
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Classification for the given tag typed as RuralEventClassification.
 *       400:
 *         description: Missing tag parameter.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No classification found for the given tag.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClassificationResponse>
) {
  const log = getLogger("api.classify.bytag");
  const { tag } = req.query;

  if (!tag)
    return res.status(400).end({
      status: 400,
      message: "Missing tag parameter. Please provide a tag as string.",
    });

  // classify by tags
  let classificationByTag: RuralEventClassification | null = null;
  try {
    classificationByTag = await classifyByTag(tag as string);
  } catch (error: Error | any) {
    log.warn(error, error?.message);
  }

  if (!classificationByTag) {
    const message: string = `no category found for tag "${tag}"`;
    log.info(message);
    return res.status(404).json({ status: 404, message: message });
  }

  log.debug(
    `category "${classificationByTag.category}" found for tag "${tag}"`
  );

  // add cache header to allow cdn caching of responses
  const cacheMaxAge: string = process.env.CACHE_MAX_AGE || "604800"; // 7 days
  const cacheStaleWhileRevalidate: string =
    process.env.CACHE_STALE_WHILE_REVALIDATE || "120"; // 2 minutes
  res.setHeader(
    "Cache-Control",
    `max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}, stale-while-revalidate=${cacheStaleWhileRevalidate}`
  );

  return res.status(200).json(classificationByTag);
}
