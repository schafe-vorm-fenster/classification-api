import { reduceClassifications } from "./reduceClassifications";

describe("reduceClassifications", () => {
  test("should sort, group and join classifications", () => {
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
    expect(reduceClassifications(classificationList)).toEqual({
      category: "community-life",
      tags: ["kirche", "gottesdienst", "öpNv"],
      classifications: [
        "/People & Society/Religion & Belief",
        "/Travel/Bus & Rail",
      ],
    });
  });
});
