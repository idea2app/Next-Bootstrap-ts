import '../styles/globals.less';

import { HTTPError } from 'koajax';
import { configure } from 'mobx';
import { enableStaticRendering, observer } from 'mobx-react';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { Image } from 'react-bootstrap';

import { MainNavigator } from '../components/MainNavigator';
import { MDXLayout } from '../components/MDXLayout';
import { isServer } from '../models/configuration';
import {
  createI18nStore,
  I18nContext,
  LanguageCode,
  loadLanguage,
} from '../models/Translation';
import zhCN from '../translation/zh-CN';

configure({ enforceActions: 'never' });

enableStaticRendering(isServer());

globalThis.addEventListener?.('unhandledrejection', ({ reason }) => {
  const { message, response } = reason as HTTPError;
  const { statusText, body } = response || {};

  const tips = body?.message || statusText || message;

  if (tips) alert(tips);
});

interface AppShellProps extends AppProps {
  language: LanguageCode;
  languageData: typeof zhCN;
}

@observer
export default class AppShell extends App<AppShellProps> {
  static async getInitialProps(context: AppContext) {
    const props = await App.getInitialProps(context);

    return { ...props, ...(await loadLanguage(context.ctx.req!.headers)) };
  }

  i18nStore = createI18nStore(this.props.language, this.props.languageData);

  render() {
    const { Component, pageProps, router } = this.props,
      { t } = this.i18nStore;

    return (
      <I18nContext.Provider value={this.i18nStore}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <MainNavigator />

        {router.route.startsWith('/article/') ? (
          <MDXLayout title={router.route.split('/').at(-1)}>
            <Component {...pageProps} />
          </MDXLayout>
        ) : (
          <div className="mt-5 pt-4">
            <Component {...pageProps} />
          </div>
        )}

        <footer className="flex-fill d-flex justify-content-center align-items-center border-top py-4">
          <a
            className="flex-fill d-flex justify-content-center align-items-center"
            href="https://vercel.com?utm_source=create-next-app&amp;utm_medium=default-template&amp;utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('powered_by')}
            <span className="mx-2">
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </I18nContext.Provider>
    );
  }
}
