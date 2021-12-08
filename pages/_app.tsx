import type { AppProps } from 'next/app';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        />
      </Head>

      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href=".">Next-Bootstrap.ts</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#component">Component</Nav.Link> */}
            <Nav.Link href="https://github.com/idea2app/nextjs-reactbootstrap-ts">
              Source code
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="mt-5 pt-2">
        <Component {...pageProps} />
      </div>
    </>
  );
}
