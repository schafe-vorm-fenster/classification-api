import { joinClassifications } from "./joinClassifications";

describe("joinClassifications", () => {
  test("should join classifications by category", () => {
    const classificationList: any[] = [
      {
        category: "community-life",
        tags: ["kirche"],
        scope: "nearby",
      },
      {
        category: "everyday-supply",
        tags: ["öpNv"],
        scope: "nearby",
      },
    ];
    expect(joinClassifications(classificationList)).toEqual({
      category: "community-life",
      tags: ["kirche", "öpNv"],
      scope: "nearby",
    });
  });
});
