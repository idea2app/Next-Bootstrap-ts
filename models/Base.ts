import { HTTPClient } from 'koajax';

export const isServer = () => typeof window === 'undefined';

export const client = new HTTPClient({
  baseURI: `${
    isServer() ? process.env.NEXT_PUBLIC_API_HOST! : globalThis.location?.origin
  }/api/`,
  responseType: 'json',
});
