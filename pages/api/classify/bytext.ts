import type { NextApiRequest, NextApiResponse } from "next";
import { classifyByText } from "../../../src/classification/naturallanguage/classifyByText";
import { getLogger } from "../../../logging/log-util";
import { tagsFromText } from "../../../src/classification/helpers/tagsFromText";
import {
  ClassificationResponse,
  RuralEventClassification,
} from "../../../src/types/api.types";

/**
 * @swagger
 * /api/classify/bytext:
 *   post:
 *     summary: Returns a category for a given text.
 *     description: Returns a category for a given text based on Google Natural Language API.
 *     tags:
 *       - Classify
 *     requestBody:
 *       description: A text as string.
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of categories typed as RuralEventCategory.
 *       400:
 *         description: Missing body parameter.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: No category found for the given tag.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClassificationResponse>
) {
  const log = getLogger("api.classify.bytext");

  const text = <string>req.body;

  if (!text)
    return res.status(400).end({
      status: 400,
      message: "Missing body parameter. Please provide a text as plain text.",
    });

  const shortText: string = text.split(" ").slice(0, 6).join(" ") + " ...";

  // classify by text
  let categoryByText: RuralEventClassification | null = null;
  try {
    categoryByText = await classifyByText(text);
  } catch (error: Error | any) {
    log.warn(error, error?.message);
  }

  if (!categoryByText) {
    const message: string = `no category found for text "${shortText}"`;
    log.info(message);
    return res.status(404).json({ status: 404, message: message });
  }

  log.debug(`category "${categoryByText}" found for text "${shortText}"`);

  // set tags if available
  categoryByText.tags = tagsFromText(text) || categoryByText.tags || [];

  // add cache header to allow cdn caching of responses
  const cacheMaxAge: string = process.env.CACHE_MAX_AGE || "604800"; // 7 days
  const cacheStaleWhileRevalidate: string =
    process.env.CACHE_STALE_WHILE_REVALIDATE || "120"; // 2 minutes
  res.setHeader(
    "Cache-Control",
    `max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}, stale-while-revalidate=${cacheStaleWhileRevalidate}`
  );

  return res.status(200).json(categoryByText);
}
