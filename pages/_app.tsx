import '../styles/globals.less';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { Container, Dropdown, Image, Nav, Navbar } from 'react-bootstrap';

const Name = process.env.NEXT_PUBLIC_SITE_NAME || '';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar bg="primary" variant="dark" fixed="top" expand="sm">
        <Container>
          <Navbar.Brand href="/">{Name}</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-inner" />

          <Navbar.Collapse id="navbar-inner">
            <Nav className="me-auto">
              <Link href="/component" passHref>
                <Nav.Link> {t('common:nav1')}</Nav.Link>
              </Link>
              <Link
                href="https://github.com/idea2app/nextjs-reactbootstrap-ts"
                passHref
              >
                <Nav.Link> {t('common:link2')}</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>

          <Dropdown className="me-3 mt-1">
            <Dropdown.Toggle>{t('common:lang')}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/en">En/英</Dropdown.Item>
              <Dropdown.Item href="/zh">Zh/中</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
          Powered by
          <span className="mx-2">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  );
}
