import { RuralEventClassification } from "../../types/api.types";
import { classifyByTags } from "./classifyByTags";

describe("should find classifications for certain tags", () => {
  test("should return one classification item for one tag", async () => {
    const tags: string[] = ["Kirche"];
    const classifications: RuralEventClassification[] = (await classifyByTags(
      tags
    )) as RuralEventClassification[];
    expect(classifications).not.toBeNull();
    expect(classifications.length).toBe(1);
    expect(classifications[0].category).toBe("community-life");
  });

  test("should return two classification items for two tags", async () => {
    const tags: string[] = ["Kirche", "Fußpflege"];
    const classifications: RuralEventClassification[] = (await classifyByTags(
      tags
    )) as RuralEventClassification[];
    expect(classifications).not.toBeNull();
    expect(classifications.length).toBe(2);
    expect(classifications[0].category).toBe("community-life");
    expect(classifications[1].category).toBe("education-health");
  });

  test("should return three classification items for three tags", async () => {
    const tags: string[] = ["Kirche", "Fußpflege", "Restmüll"];
    const classifications: RuralEventClassification[] = (await classifyByTags(
      tags
    )) as RuralEventClassification[];
    expect(classifications).not.toBeNull();
    expect(classifications.length).toBe(3);
    expect(classifications[0].category).toBe("community-life");
    expect(classifications[1].category).toBe("education-health");
    expect(classifications[2].category).toBe("everyday-supply");
  });

  test("should return one classification for duplicate tags", async () => {
    const tags: string[] = ["Kirche", "Kirche"];
    const classifications: RuralEventClassification[] = (await classifyByTags(
      tags
    )) as RuralEventClassification[];
    expect(classifications).not.toBeNull();
    expect(classifications.length).toBe(1);
    expect(classifications[0].category).toBe("community-life");
  });
});
