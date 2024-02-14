import { ruralEventCategories } from "../../../packages/rural-event-categories/src/types/ruralEventCategory";
import { RuralEventCategory } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";

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
export async function GET() {
  // define cache headers
  const cacheTTL: number =
    parseInt(process.env.CACHE_MAX_AGE as string) || 7 * 24 * 60 * 60; // 7 days
  const staleTime: number =
    parseInt(process.env.CACHE_STALE_WHILE_REVALIDATE as string) || 10 * 60; // 10 minutes

  const response: CategoriesResponse = ruralEventCategories;

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `max-age=${cacheTTL}, s-maxage=${cacheTTL}, stale-while-revalidate=${staleTime}`,
    },
  });
}
