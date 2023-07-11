import { getTagListFromString } from "./getTagListFromtString";

describe("get tag list from string", () => {
  test("should return empty list for empty string", () => {
    const tagList = getTagListFromString("");
    expect(tagList).toEqual([]);
  });

  test("should return empty list for null", () => {
    const tagList = getTagListFromString(null as any);
    expect(tagList).toEqual([]);
  });

  test("should return empty list for undefined", () => {
    const tagList = getTagListFromString(undefined as any);
    expect(tagList).toEqual([]);
  });
  test("should return empty list for string with only spaces", () => {
    const tagList = getTagListFromString("   ");
    expect(tagList).toEqual([]);
  });

  test("should return empty list for string with only commas", () => {
    const tagList = getTagListFromString(",,");
    expect(tagList).toEqual([]);
  });

  test("should return empty list for string with only commas and spaces", () => {
    const tagList = getTagListFromString(" , , ");
    expect(tagList).toEqual([]);
  });

  test("should return tag list for given string with one tag", () => {
    const tagList = getTagListFromString("tag1");
    expect(tagList).toEqual(["tag1"]);
  });

  test("should return tag list for given string with one tag and spaces", () => {
    const tagList = getTagListFromString(" tag1 ");
    expect(tagList).toEqual(["tag1"]);
  });

  test("should return tag list for given string with several comma separated tags", () => {
    const tagList = getTagListFromString("tag1,tag2,tag3");
    expect(tagList).toEqual(["tag1", "tag2", "tag3"]);
  });

  test("should return tag list with uniqueness for given string with several comma separated tags", () => {
    const tagList = getTagListFromString("tag1,tag2,tag1");
    expect(tagList).toEqual(["tag1", "tag2"]);
  });
});
