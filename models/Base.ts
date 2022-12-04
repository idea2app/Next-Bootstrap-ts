import { HTTPClient } from 'koajax';

export const isServer = () => typeof window === 'undefined';

export const ownClient = new HTTPClient({
  baseURI: `${
    isServer() ? process.env.NEXT_PUBLIC_API_HOST! : globalThis.location?.origin
  }/api/`,
  responseType: 'json',
});

const GithubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export const githubClient = new HTTPClient({
  baseURI: 'https://api.github.com/',
  responseType: 'json',
}).use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${GithubToken}`,
    };
  return next();
});
