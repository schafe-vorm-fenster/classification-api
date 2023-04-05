import createHttpError from "http-errors";
import { Body, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { ruralEventCategories } from "../../packages/rural-event-categories/src/types/ruralEventCategory";
import {
  RuralEventCategory,
  RuralEventCategoryId,
} from "../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { ContentToClassify } from "./classification.types";
import { classifyByText } from "./naturallanguage/classifyByText";
import { classifyByTag } from "./tags/classifyByTag";

export type ClassificationResponse = RuralEventCategory | null;

// TODO: add another GET route for classifyByTag
// TODO: add another GET route for classifyByTags

@Route("classify")
@Tags("Classification")
export default class ClassificationController {
  /**
   * Returns a rural category.
   */
  @Post("")
  @SuccessResponse(201, "Classified")
  @Response("204", "No Events")
  @Response("400", "Invalid Parameters")
  @Response("404", "Could not classify")
  public async getClassification(
    @Body() body: ContentToClassify
  ): Promise<ClassificationResponse> {
    console.debug(body);

    // check preconditions
    if (!body) throw createHttpError(400, "no content");
    if (
      (!body.tag || body.tag.length === 0) &&
      (!body.body || body.body.trim().length < 100)
    )
      throw createHttpError(
        400,
        "invalid content, content mus contain tags or a body with at least 100 characters"
      );

    // classify by tags
    if (body.tag && body.tag.length > 0) {
      const categoryByTag: RuralEventCategoryId | null = await classifyByTag(
        body.tag
      );
      if (categoryByTag) {
        console.debug(
          `category "${categoryByTag}" found for tag/s "${body.tag}"`
        );
        return ruralEventCategories.find(
          (category) => category.id === categoryByTag
        ) as RuralEventCategory; // exit early
      }
    }

    // classify by text
    if (body.body && body.body.length > 0) {
      const categoryByText: RuralEventCategoryId | null = await classifyByText(
        body.body
      );

      if (categoryByText) {
        console.debug(
          `category "${categoryByText}" found for text "${body.body
            .split(" ")
            .slice(0, 6)
            .join(" ")} ...}"`
        );
        return ruralEventCategories.find(
          (category) => category.id === categoryByText
        ) as RuralEventCategory;
      }
    }

    throw createHttpError(404, "could not classify the given content");
  }
}
