import { groupClassifications } from "./groupClassifications";

describe("groupClassifications", () => {
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
    expect(groupClassifications(classificationList)).toEqual([
      {
        category: "community-life",
        tags: ["kirche", "gottesdienst"],
        classifications: ["/People & Society/Religion & Belief"],
      },
      {
        category: "everyday-supply",
        tags: ["öpNv"],
        classifications: ["/Travel/Bus & Rail"],
      },
    ]);
  });
});
