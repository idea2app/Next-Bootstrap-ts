import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Navbar, Container, Nav, Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>nextjs-reactbootstrap-typescript</title>
        <meta name="description" content="Nextjs React-Bootstrap TypeScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar bg="dark" variant="dark" className={styles.navbar}>
        <Container>
          <Navbar.Brand href="#home">nextjs-reactbootstrap-typescript</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
              {/* <Nav.Link href="#component">Component</Nav.Link> */}
            <Nav.Link href="https://github.com/idea2app/nextjs-reactbootstrap-ts">Source code</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <main className={styles.main}>
        <h1 className={styles.title}>Upstream projects</h1>

        <div className={styles.grid}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="nextjs.png" className={styles.cardImg} />
            <Card.Body>
              <Card.Title>Next.js</Card.Title>
              <Card.Text>
                The React Framework for Production.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Button variant="primary" href="https://nextjs.org/">Home Page</Button>{' '}
              <Button variant="success" href="https://github.com/vercel/next.js">Source Code</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="reactbootstrap.svg" className={styles.cardImg} />
            <Card.Body>
              <Card.Title>React Bootstrap</Card.Title>
              <Card.Text>
              The most popular front-end framework Rebuilt for React.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Button variant="primary" href="https://react-bootstrap.github.io/">Home Page</Button>{' '}
              <Button variant="success" href="https://github.com/react-bootstrap/react-bootstrap">Source Code</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="./typescript.png" className={styles.cardImg} />
            <Card.Body>
              <Card.Title>TypeScript</Card.Title>
              <Card.Text>
                TypeScript is JavaScript with syntax for types.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Button variant="primary" href="https://www.typescriptlang.org">Home Page</Button>{' '}
              <Button variant="success" href="https://github.com/microsoft/TypeScript">Source Code</Button>
            </Card.Body>
          </Card>
        </div>
      </main>

      <footer className={styles.footer}>
        Powered by GitHub
      </footer>
    </div>
  )
}

export default Home
