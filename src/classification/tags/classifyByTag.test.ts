import { RuralEventClassification } from "../../../pages/api/classify/bytag/[tag]";
import { classifyByTag } from "./classifyByTag";

// unit tests for classifyByTags
describe("should find a classification?.category for certain tags", () => {
  test("should return 'community-life' for relegious tag", async () => {
    const tag = "Kirche";
    const classification: RuralEventClassification | null = await classifyByTag(
      tag
    );
    expect(classification).not.toBeNull();
    expect(classification?.category).toBe("community-life");
    expect(classification?.tags).toContain(tag);
    expect(classification?.classifications).toContain(
      "/People & Society/Religion & Belief"
    );
  });

  test("should return 'education-health' for jobs and care tags", async () => {
    const tag = "Fußpflege";
    const classification: RuralEventClassification | null = await classifyByTag(
      tag
    );
    expect(classification).not.toBeNull();
    expect(classification?.category).toBe("education-health");
    expect(classification?.tags).toContain(tag);
    expect(classification?.classifications).toContain("/Health");
  });

  test("should return 'everyday-supply' for shopping and waste tags", async () => {
    const tag = "Restmüll";
    const classification: RuralEventClassification | null = await classifyByTag(
      tag
    );
    expect(classification?.category).not.toBeNull();
    expect(classification?.category).toBe("everyday-supply");
    expect(classification?.tags).toContain(tag);
    expect(classification?.classifications).toContain(
      "/Law & Government/Social Services"
    );
  });

  test("should return 'culture-tourism' for event tags", async () => {
    const tag = "Konzert";
    const classification: RuralEventClassification | null = await classifyByTag(
      tag
    );
    expect(classification?.category).not.toBeNull();
    expect(classification?.category).toBe("culture-tourism");
    expect(classification?.tags).toContain(tag);
    expect(classification?.classifications).toContain(
      "/Arts & Entertainment/Events & Listings/Concerts & Music Festivals"
    );
  });
});
