import { ServerResponse } from 'http';
import { HTTPError, Request, request as call } from 'koajax';
import { parseLanguageHeader } from 'mobx-i18n';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { setCookie } from 'nookies';
import { ParsedUrlQuery } from 'querystring';

import { i18n } from '../../models/Translation';

const BackHost = process.env.NEXT_PUBLIC_API_HOST;
const Host =
  typeof window !== 'undefined'
    ? new URL('/api/', location.origin) + ''
    : BackHost;

export async function request<T = void>(
  path: string,
  method?: Request['method'],
  body?: any,
  context?: Partial<GetServerSidePropsContext>,
  headers: Record<string, any> = {},
) {
  const token = context?.req && readCookie(context.req, 'token');

  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  } catch {}

  const { response } = call<T>({
    path: new URL(path, Host) + '',
    method,
    body,
    headers,
    responseType: 'json',
  });
  const { body: data } = await response;

  return data!;
}

export async function requestClient<T = void>(
  path: string,
  method?: Request['method'],
  body?: any,
  headers: Record<string, any> = {},
) {
  try {
    const token = '';

    return request<T>(
      new URL(path, BackHost) + '',
      method,
      body,
      {},
      { Authorization: `Bearer ${token}`, ...headers },
    );
  } catch (error) {
    if (error instanceof HTTPError) location.href = `/${error.status}`;

    throw error;
  }
}

export type NextAPI = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<any>;

export function safeAPI(handler: NextAPI): NextAPI {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      if (!(error instanceof HTTPError)) {
        console.error(error);
        return res.end(error);
      }
      let { message, status, body } = error;

      res.status(status);
      res.statusMessage = message;

      if (body instanceof ArrayBuffer)
        try {
          body = new TextDecoder().decode(new Uint8Array(body));
          console.error(body);

          body = JSON.parse(body);
          console.error(body);
        } catch {}

      res.send(body);
    }
  };
}

interface RouteProps<T extends ParsedUrlQuery> {
  route: Pick<
    GetServerSidePropsContext<T>,
    'resolvedUrl' | 'params' | 'query' | 'locales'
  >;
}

export function withRoute<
  R extends Record<string, any>,
  P extends Record<string, any> = {},
  O extends GetServerSideProps<P, R> = GetServerSideProps<P, R>,
>(
  origin?: O,
): GetServerSideProps<RouteProps<R> & InferGetServerSidePropsType<O>, R> {
  return async context => {
    const options =
        (await origin?.(context)) || ({} as GetServerSidePropsResult<{}>),
      { resolvedUrl, params, query, locales } = context;

    return {
      ...options,
      props: {
        ...('props' in options ? options.props : {}),
        route: JSON.parse(
          JSON.stringify({ resolvedUrl, params, query, locales }),
        ),
      },
    } as GetServerSidePropsResult<
      RouteProps<R> & InferGetServerSidePropsType<O>
    >;
  };
}

export function withTranslation<
  R extends Record<string, any>,
  P extends Record<string, any> = {},
  O extends GetServerSideProps<P, R> = GetServerSideProps<P, R>,
>(
  origin?: O,
): GetServerSideProps<RouteProps<R> & InferGetServerSidePropsType<O>, R> {
  return async context => {
    const options =
      (await origin?.(context)) || ({} as GetServerSidePropsResult<{}>);

    const languages = parseLanguageHeader(
      context.req.headers['accept-language'] || '',
    );
    await i18n.loadLanguages(languages);

    return options as GetServerSidePropsResult<
      RouteProps<R> & InferGetServerSidePropsType<O>
    >;
  };
}
const Env = process.env.NODE_ENV;

export function writeCookie(
  res: ServerResponse,
  key: string,
  value: string,
  expiredAt: string,
) {
  setCookie({ res }, key, value, {
    httpOnly: true,
    secure: Env !== 'development',
    maxAge: +new Date(expiredAt) - Date.now(),
    path: '/',
  });
}

export function readCookie(req: GetServerSidePropsContext['req'], key: string) {
  return req.cookies[key];
}
