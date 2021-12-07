import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import styles from '../styles/Home.module.scss';
import { mainNav, framework } from './api/home';

export function getStaticProps() {
  return { props: { mainNav, framework } };
}

const HomePage = ({
  mainNav,
  framework,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <div>
    <Head>
      <title>Next-Bootstrap.ts</title>
      <meta
        name="description"
        content="React project scaffold based on TypeScript, Next.js &amp; Bootstrap."
      />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      />
    </Head>

    <Navbar bg="dark" variant="dark" className={styles.navbar}>
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

    <main
      className={`flex-fill d-flex flex-column justify-content-center align-items-center ${styles.main}`}
    >
      <h1 className={`m-0 text-center ${styles.title}`}>
        Welcome to
        <a className="text-primary mx-2" href="https://nextjs.org">
          Next.js!
        </a>
      </h1>

      <p className={`text-center fs-4 ${styles.description}`}>
        Get started by editing
        <code className={`mx-2 rounded-3 bg-light ${styles.code}`}>
          pages/index.tsx
        </code>
      </p>

      <div
        className={`d-flex flex-wrap flex-column flex-sm-row justify-content-center align-items-center ${styles.grid}`}
      >
        {mainNav.map(({ link, title, summary }) => (
          <Card
            key={link}
            className={`m-3 p-4 rounded-3 border ${styles.card}`}
            tabIndex={-1}
          >
            <Card.Body>
              <Card.Title as="h2" className="fs-4 mb-3">
                <a href={link} className="stretched-link">
                  {title} &rarr;
                </a>
              </Card.Title>
              <Card.Text className="fs-5">{summary}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      <h2 className="my-4 text-center">Upstream projects</h2>
      <Row>
        {framework.map(({ logo, title, summary, link, repository }) => (
          <Col sm={4} key={title}>
            <Card className={`h-100 ${styles.card}`}>
              <Card.Img variant="top" src={logo} className={styles.cardImg} />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{summary}</Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-around">
                <Button variant="primary" href={link}>
                  Home Page
                </Button>
                <Button variant="success" href={repository}>
                  Source Code
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </main>

    <footer
      className={`flex-fill d-flex justify-content-center align-items-center border-top ${styles.footer}`}
    >
      <a
        className="flex-fill d-flex justify-content-center align-items-center"
        href="https://vercel.com?utm_source=create-next-app&amp;utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by
        <span className={`mx-2 ${styles.logo}`}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  </div>
);

export default HomePage;
