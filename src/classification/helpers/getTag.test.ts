import { getTag } from "./getTag";

describe("gets tag from tag mapping", () => {
  test("should return the tag in proper case", () => {
    expect(getTag("öPnV")).toEqual("ÖPNV");
    expect(getTag("bus")).toEqual("Bus");
  });
});
