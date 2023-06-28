import { mapTagToGoogleClassification } from "./mapTagToGoogleClassification";

describe("should map certain tags to google classification", () => {
  test("should return '/People & Society'", async () => {
    expect(mapTagToGoogleClassification("Kirche")).toBe(
      "/People & Society/Religion & Belief"
    );
  });

  test("should return '/Law & Government' for jobs and care tags", async () => {
    expect(mapTagToGoogleClassification("Gremien")).toBe(
      "/Law & Government/Government"
    );
    expect(mapTagToGoogleClassification("Gemeindevertretung")).toBe(
      "/Law & Government/Government"
    );
  });

  test("should return 'everyday-supply' for shopping and waste tags", async () => {
    expect(mapTagToGoogleClassification("Musik")).toBe(
      "/Arts & Entertainment/Music & Audio"
    );
  });

  test("should return 'culture-tourism' for event tags", async () => {
    expect(mapTagToGoogleClassification("Bäckerauto")).toBe(
      "/Food & Drink/Beverages"
    );
  });

  test("should return 'culture-tourism' for event tags", async () => {
    expect(mapTagToGoogleClassification("Restmüll")).toBe(
      "/Law & Government/Social Services"
    );
  });

  test("should map case insensitive", async () => {
    expect(mapTagToGoogleClassification("öPnV")).toBe("/Travel/Bus & Rail");
  });
});
