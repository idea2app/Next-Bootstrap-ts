import { HTTPClient } from 'koajax';
import { githubClient, RepositoryModel } from 'mobx-github';

export const isServer = () => typeof window === 'undefined';

const VercelHost = process.env.VERCEL_URL,
  GithubToken = process.env.GITHUB_TOKEN;

const API_Host = isServer()
  ? VercelHost
    ? `https://${VercelHost}`
    : 'http://localhost:3000'
  : globalThis.location.origin;

export const ownClient = new HTTPClient({
  baseURI: `${API_Host}/api/`,
  responseType: 'json',
});

githubClient.use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${GithubToken}`,
    };
  return next();
});

export const repositoryStore = new RepositoryModel('idea2app');
