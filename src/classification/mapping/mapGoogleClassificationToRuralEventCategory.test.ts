import { mapGoogleClassificationToRuralEventCategory } from "./mapGoogleClassificationToRuralEventCategory";

describe("should find a category for certain google classifications", () => {
  test("should return 'community-life'", async () => {
    expect(
      await mapGoogleClassificationToRuralEventCategory("/People & Society")
    ).toBe("community-life");
    expect(
      await mapGoogleClassificationToRuralEventCategory("/Law & Government")
    ).toBe("community-life");
  });

  test("should return 'education-health' for jobs and care tags", async () => {
    expect(await mapGoogleClassificationToRuralEventCategory("/Health")).toBe(
      "education-health"
    );
  });

  test("should return 'everyday-supply' for shopping and waste tags", async () => {
    expect(await mapGoogleClassificationToRuralEventCategory("/Shopping")).toBe(
      "everyday-supply"
    );
    expect(
      await mapGoogleClassificationToRuralEventCategory(
        "/Law & Government/Social Services"
      )
    ).toBe("everyday-supply");
  });

  test("should return correct category for a 3rd level match", async () => {
    expect(
      await mapGoogleClassificationToRuralEventCategory(
        "/Business & Industrial/Hospitality Industry/Event Planning"
      )
    ).toBe("culture-tourism");
    expect(
      await mapGoogleClassificationToRuralEventCategory(
        "/Business & Industrial/Hospitality Industry/Food Service"
      )
    ).toBe("everyday-supply");
  });

  test("should return 'culture-tourism' for event tags", async () => {
    expect(
      await mapGoogleClassificationToRuralEventCategory("/Arts & Entertainment")
    ).toBe("culture-tourism");
  });

  test("should return null for no match", async () => {
    expect(
      await mapGoogleClassificationToRuralEventCategory(
        "/Something Strange" as any
      )
    ).toBeNull();
  });
});
