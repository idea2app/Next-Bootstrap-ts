import '../styles/globals.less';

import { configure } from 'mobx';
import { enableStaticRendering, observer } from 'mobx-react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { Image } from 'react-bootstrap';

import { MainNavigator } from '../components/MainNavigator';
import { MDXLayout } from '../components/MDXLayout';
import { isServer } from '../models/Base';
import { i18n } from '../models/Translation';

configure({ enforceActions: 'never' });

enableStaticRendering(isServer());

const { t } = i18n;

const AppShell: FC<AppProps> = observer(({ Component, pageProps, router }) => (
  <>
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
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </>
));

export default AppShell;
