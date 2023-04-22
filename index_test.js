import { strictEqual } from "node:assert";
import { it } from "node:test";

import { totp } from "./index.js";

const fixtures = [
  {
    secret: "A",
    timestamp: 1682136282553,
    code: "842486",
  },
  {
    secret: "A",
    timestamp: 1682136327106,
    code: "827557",
  },
];

it("Should generate the correct code", () => {
  for (const { secret, timestamp, code } of fixtures) {
    const compare = totp(secret, { timestamp });
    strictEqual(compare, code);
  }
});
