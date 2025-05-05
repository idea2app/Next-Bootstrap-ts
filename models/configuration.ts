export const isServer = () => typeof window === 'undefined';

export const Name = process.env.NEXT_PUBLIC_SITE_NAME,
  Summary = process.env.NEXT_PUBLIC_SITE_SUMMARY;

export const { VERCEL_URL, GITHUB_TOKEN } = process.env;

export const API_Host = isServer()
  ? VERCEL_URL
    ? `https://${VERCEL_URL}`
    : 'http://localhost:3000'
  : globalThis.location.origin;
