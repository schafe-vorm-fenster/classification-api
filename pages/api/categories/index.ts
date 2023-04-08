import type { NextApiRequest, NextApiResponse } from "next";
import { RuralEventCategory } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { ruralEventCategories } from "../../../packages/rural-event-categories/src/types/ruralEventCategory";

// define response type
export type CategoriesResponse = ReadonlyArray<RuralEventCategory>;

/**
 * @swagger
 * /api/categories/:
 *   get:
 *     summary: Returns a list of categories supported by the app incl. all locales.
 *     description: Returns a list of categories supported by the app incl. all locales.
 *     tags:
 *       - Constants
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of categories typed as RuralEventCategory.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CategoriesResponse>
) {
  // add cache header to allow cdn caching of responses
  const cacheMaxAge: string = process.env.CACHE_MAX_AGE || "604800"; // 7 days
  const cacheStaleWhileRevalidate: string =
    process.env.CACHE_STALE_WHILE_REVALIDATE || "120"; // 2 minutes
  res.setHeader(
    "Cache-Control",
    `max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}, stale-while-revalidate=${cacheStaleWhileRevalidate}`
  );

  return res.status(200).json(ruralEventCategories);
}
