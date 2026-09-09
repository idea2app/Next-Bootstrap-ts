import { Context, Middleware } from 'koa';
import { HTTPError } from 'koajax';
import { KoaOption, withKoa } from 'next-ssr-middleware';
import { ProxyAgent, setGlobalDispatcher } from 'undici';

const { HTTP_PROXY } = process.env;

if (HTTP_PROXY) setGlobalDispatcher(new ProxyAgent(HTTP_PROXY));

export const safeAPI: Middleware<any, any> = async (context: Context, next) => {
  try {
    return await next();
  } catch (error) {
    if (!(error instanceof HTTPError)) {
      console.error(error);

      context.status = 400;

      return (context.body = { message: (error as Error).message });
    }
    const { message, response } = error;
    let { body } = response;

    context.status = response.status;
    context.statusMessage = message;

    if (body instanceof ArrayBuffer)
      try {
        body = new TextDecoder().decode(new Uint8Array(body));

        body = JSON.parse(body);
      } catch {
        //
      }
    console.error(JSON.stringify(body, null, 2));

    context.body = body;
  }
};

export const withSafeKoa = <S, C>(...middlewares: Middleware<S, C>[]) =>
  withKoa<S, C>({} as KoaOption, safeAPI, ...middlewares);
