import { randomSentencesArray } from "./slug";

describe("testing sentence generator", () => {
  it("generating 0 sentence", () => {
    expect(randomSentencesArray(0).length).toBe(0);
  });
  it("generating 1 sentence", () => {
    expect(randomSentencesArray(1).length).toBe(1);
  });
  it("generating 10 sentences", () => {
    expect(randomSentencesArray(10).length).toBe(10);
  });
  it("generating -1 sentence", () => {
    expect(randomSentencesArray(-1).length).toBe(0);
  });
});
