import { mapGoogleClassificationToRuralEventCategory } from "./mapGoogleClassificationToRuralEventCategory";

describe("should find a category for certain google classifications", () => {
  test("should return 'community-life'", async () => {
    const result1 = await mapGoogleClassificationToRuralEventCategory(
      "/People & Society"
    );
    expect(result1?.category).toBe("community-life");
    expect(result1?.scope).toBe("nearby");

    const result2 = await mapGoogleClassificationToRuralEventCategory(
      "/Law & Government"
    );
    expect(result2?.category).toBe("community-life");
    expect(result2?.scope).toBe("municipality");
  });

  test("should return 'education-health' for jobs and care tags", async () => {
    const result = await mapGoogleClassificationToRuralEventCategory("/Health");
    expect(result?.category).toBe("education-health");
    expect(result?.scope).toBe("region");
  });

  test("should return 'everyday-supply' for shopping and waste tags", async () => {
    const result1 = await mapGoogleClassificationToRuralEventCategory(
      "/Shopping"
    );
    expect(result1?.category).toBe("everyday-supply");
    expect(result1?.scope).toBe("nearby");

    const result2 = await mapGoogleClassificationToRuralEventCategory(
      "/Law & Government/Social Services"
    );
    expect(result2?.category).toBe("everyday-supply");
    expect(result2?.scope).toBe("community");
  });

  test("should return correct category for a 3rd level match", async () => {
    const result1 = await mapGoogleClassificationToRuralEventCategory(
      "/Business & Industrial/Hospitality Industry/Event Planning"
    );
    expect(result1?.category).toBe("culture-tourism");
    expect(result1?.scope).toBe("region");

    const result2 = await mapGoogleClassificationToRuralEventCategory(
      "/Business & Industrial/Hospitality Industry/Food Service"
    );
    expect(result2?.category).toBe("everyday-supply");
    expect(result2?.scope).toBe("community");
  });

  test("should return 'culture-tourism' for event tags", async () => {
    const result = await mapGoogleClassificationToRuralEventCategory(
      "/Arts & Entertainment"
    );
    expect(result?.category).toBe("culture-tourism");
    expect(result?.scope).toBe("region");
  });

  test("should return null for no match", async () => {
    const result = await mapGoogleClassificationToRuralEventCategory(
      "/Something Strange" as any
    );
    expect(result).toBeNull();
  });
});
