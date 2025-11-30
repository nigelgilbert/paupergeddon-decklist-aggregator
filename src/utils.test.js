import { parseListLine } from "./utils";

describe("parseListLine", () => {
  it("should parse a basic card line correctly", () => {
    const line = "4 Lightning Bolt";
    const result = parseListLine(line);
    expect(result).toEqual(["Lightning Bolt", 4]);
  });

  it("should correct formatting errors in submitted lists", () => {
    const cases = ["1 annul", "4 lightning bolt"];
    const results = cases.map(parseListLine);
    expect(results[0]).toStrictEqual(["Annul", 1]);
    expect(results[1]).toStrictEqual(["Lightning Bolt", 4]);
  });
});
