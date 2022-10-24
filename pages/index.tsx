import type { InferGetStaticPropsType } from 'next';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import PageHead from '../components/PageHead';
import styles from '../styles/Home.module.less';
import { framework, mainNav } from './api/home';

export function getStaticProps() {
  return { props: { mainNav, framework } };
}

const HomePage = ({
  mainNav,
  framework,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <PageHead />

    <Container as="main" className={styles.main}>
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

      <Row className="g-4" xs={1} sm={2} md={4}>
        {mainNav.map(({ link, title, summary }) => (
          <Col key={link}>
            <Card
              className={`h-100 p-4 rounded-3 border ${styles.card}`}
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
          </Col>
        ))}
      </Row>

      <h2 className="my-4 text-center">Upstream projects</h2>
      <Row className="g-4" xs={1} sm={2} md={3}>
        {framework.map(({ logo, title, summary, link, repository }) => (
          <Col key={title}>
            <Card className={`h-100 ${styles.card}`}>
              <Card.Img variant="top" src={logo} />
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
    </Container>
  </>
);

export default HomePage;
