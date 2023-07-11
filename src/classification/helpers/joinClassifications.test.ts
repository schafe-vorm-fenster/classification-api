import { joinClassifications } from "./joinClassifications";

describe("joinClassifications", () => {
  test("should join classifications by category", () => {
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
    ];
    expect(joinClassifications(classificationList)).toEqual({
      category: "community-life",
      tags: ["kirche", "öpNv"],
      classifications: [
        "/People & Society/Religion & Belief",
        "/Travel/Bus & Rail",
      ],
    });
  });
});
