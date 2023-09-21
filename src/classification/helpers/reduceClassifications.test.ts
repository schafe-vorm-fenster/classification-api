import { reduceClassifications } from "./reduceClassifications";

describe("reduceClassifications", () => {
  test("should sort, group and join classifications", () => {
    const classificationList: any[] = [
      {
        category: "community-life",
        tags: ["kirche"],
      },
      {
        category: "everyday-supply",
        tags: ["öpNv"],
      },
      {
        category: "community-life",
        tags: ["gottesdienst"],
      },
    ];
    expect(reduceClassifications(classificationList)).toEqual({
      category: "community-life",
      tags: ["kirche", "gottesdienst", "öpNv"],
    });
  });
});
