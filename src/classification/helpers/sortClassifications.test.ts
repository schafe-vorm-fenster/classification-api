import { sortClassifications } from "./sortClassifications";

describe("sortClassifications", () => {
  test("should sort classifications by category", () => {
    const classificationList: any[] = [
      {
        category: "community-life",
        tags: ["kirche"],
        classifications: ["/People & Society/Religion & Belief"],
      },

      {
        category: "everyday-supply",
        tags: ["öpNv"],
        classifications: ["/Travel/Bus & Rail"],
      },
      {
        category: "community-life",
        tags: ["gottesdienst"],
        classifications: ["/People & Society/Religion & Belief"],
      },
    ];
    expect(sortClassifications(classificationList)).toEqual([
      {
        category: "community-life",
        tags: ["kirche"],
        classifications: ["/People & Society/Religion & Belief"],
      },
      {
        category: "community-life",
        tags: ["gottesdienst"],
        classifications: ["/People & Society/Religion & Belief"],
      },
      {
        category: "everyday-supply",
        tags: ["öpNv"],
        classifications: ["/Travel/Bus & Rail"],
      },
    ]);
  });

  test("should return empty array for missing input data", () => {
    const classificationList: any[] = [];
    expect(sortClassifications(classificationList)).toEqual([]);
  });

  test("should return empty array for undefined input", () => {
    const classificationList: any[] = undefined as any;
    expect(sortClassifications(classificationList)).toEqual([]);
  });
});
