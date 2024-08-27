import { expect, test } from "vitest";

import { generateKey } from "./helper";

test("generateKey during loop", () => {
  [...Array(5).keys()].forEach(number => {
    expect(generateKey("TEST", number)).toBe(`TEST-${number}`);
  });
});