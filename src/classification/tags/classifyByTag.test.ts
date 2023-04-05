import { RuralEventCategoryId } from "../../../packages/rural-event-categories/src/types/ruralEventCategory.types";
import { classifyByTag } from "./classifyByTag";

// unit tests for classifyByTags
describe("should find a category for certain tags", () => {
  test("should return 'community-life' for relegious tag", async () => {
    const tag = "Kirche";
    const category: RuralEventCategoryId | null = await classifyByTag(tag);
    expect(category).not.toBeNull();
    expect(category).toBe("community-life");
  });

  test("should return 'education-health' for jobs and care tags", async () => {
    const tag = "Fußpflege";
    const category: RuralEventCategoryId | null = await classifyByTag(tag);
    expect(category).not.toBeNull();
    expect(category).toBe("education-health");
  });

  test("should return 'everyday-supply' for shopping and waste tags", async () => {
    const tag = "Restmüll";
    const category: RuralEventCategoryId | null = await classifyByTag(tag);
    expect(category).not.toBeNull();
    expect(category).toBe("everyday-supply");
  });

  test("should return 'culture-tourism' for event tags", async () => {
    const tag = "Konzert";
    const category: RuralEventCategoryId | null = await classifyByTag(tag);
    expect(category).not.toBeNull();
    expect(category).toBe("culture-tourism");
  });
});
