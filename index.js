"use strict";

import { createHmac } from "node:crypto";

const MAX_INTEGER = 0x7fffffff;
const BASE32_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export const totp = (
  secret,
  { digits = 6, period = 30, algorithm = "sha1", timestamp = Date.now() } = {}
) => {
  const key = Buffer.isBuffer(secret)
    ? secret
    : Buffer.from(base32ToHex(secret), "hex");
  const epoch = Math.floor(timestamp / 1000.0);
  const time = decimalToHex(Math.floor(epoch / period))
    .toString()
    .padStart(16, "0");
  const hash = createHmac(algorithm, key).update(time, "hex").digest("hex");
  const offset = hexToDecimal(hash.slice(hash.length - 1));
  const otp = (
    hexToDecimal(substringFromStart(hash, offset * 2, 8)) & MAX_INTEGER
  ).toString();
  return substringFromStart(otp, otp.length - digits, digits);
};

const base32ToHex = (base32) => {
  let bits = "",
    hex = "";
  base32 = base32.replace(/=+$/, "");
  for (let i = 0; i < base32.length; i++) {
    const val = BASE32_CHARS.indexOf(base32.charAt(i).toUpperCase());
    if (val === -1) throw new Error("Invalid character in the base32 string.");
    bits += val.toString(2).padStart(5, "0");
  }
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    const chunk = substringFromStart(bits, i, 8);
    hex = hex + parseInt(chunk, 2).toString(16).padStart(2, "0");
  }
  return hex;
};
const hexToDecimal = (hex) => parseInt(hex, 16);
const decimalToHex = (decimal) => decimal.toString(16).padStart(2, "0");
const substringFromStart = (str, start, end) =>
  str.substring(start, start + end);
