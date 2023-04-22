export interface Options {
  digits?: number;
  period?: number;
  algorithm?: "sha1" | "sha256" | "sha512";
  timestamp?: number;
}

export function totp(secret: string, options?: Options): string;
