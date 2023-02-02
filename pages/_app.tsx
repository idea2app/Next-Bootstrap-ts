import '../styles/globals.less';

import { Option, Select } from 'idea-react';
import { observer, useStaticRendering } from 'mobx-react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';

import { isServer } from '../models/Base';
import { i18n, LanguageName } from '../models/Translation';

// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer());

const Name = process.env.NEXT_PUBLIC_SITE_NAME || '';

const AppShell = observer(({ Component, pageProps }: AppProps) => {
  const { currentLanguage, t } = i18n;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar
        bg="primary"
        variant="dark"
        fixed="top"
        expand="sm"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand href="/">{Name}</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-inner" />

          <Navbar.Collapse id="navbar-inner">
            <Nav className="me-auto">
              <Link href="/component" passHref>
                <Nav.Link>{t('component')}</Nav.Link>
              </Link>
              <Link href="/pagination" passHref>
                <Nav.Link>{t('pagination')}</Nav.Link>
              </Link>
              <Link href="/scroll-list" passHref>
                <Nav.Link>{t('scroll_list')}</Nav.Link>
              </Link>
              <Nav.Link
                target="_blank"
                href="https://github.com/idea2app/Next-Bootstrap-TS"
              >
                {t('source_code')}
              </Nav.Link>
            </Nav>

            <Select
              value={currentLanguage}
              onChange={key =>
                i18n.changeLanguage(key as typeof currentLanguage)
              }
            >
              {Object.entries(LanguageName).map(([key, name]) => (
                <Option key={key} value={key}>
                  {name}
                </Option>
              ))}
            </Select>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="mt-5 pt-2">
        <Component {...pageProps} />
      </div>

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
  );
});

export default AppShell;
