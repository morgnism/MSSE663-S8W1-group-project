import { ConcatPipe } from "./concat.pipe";

describe("ConcatPipe", () => {
  it("create an instance", () => {
    const pipe = new ConcatPipe();
    expect(pipe).toBeTruthy();
  });

  it("should combine arrays of strings with a space", () => {
    const pipe = new ConcatPipe();
    const originalValues = ["1", "2", "3"];
    const expectedValues = "1 2 3";

    expect(pipe.transform(originalValues)).toBeTruthy(expectedValues);
  });
});
