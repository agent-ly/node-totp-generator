export interface Options {
  /**
   * The number of digits for the one-time password.
   * @default 6
   */
  digits?: number;
  /**
   * The number of seconds a TOTP hash is valid for.
   * @default 30
   */
  period?: number;
  /**
   * The hashing algorithm to use.
   * @default "sha1"
   */
  algorithm?: "sha1" | "sha256" | "sha512";
  /**
   * The current time in milliseconds.
   * @default Date.now()
   */
  timestamp?: number;
}

/**
 *
 * @param {string | Buffer} secret Base-32 encoded secret key or a buffer.
 * @param {Options} [options]
 * @returns The generated time-based one-time password.
 */
export function totp(secret: string | Buffer, options?: Options): string;
