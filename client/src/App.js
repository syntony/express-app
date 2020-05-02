import React from 'react'
import 'typeface-roboto'
import { Container, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './routes'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main className="py-5">
          <Container className="px-md-0">
            <Row>
              <Col xs={12}>
                <Routes />
              </Col>
            </Row>
          </Container>
        </main>
      </Router>
    </div>
  )
}

export default App
