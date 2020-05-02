import React from 'react'
import { Col, Container, Navbar, NavbarBrand, Row } from 'react-bootstrap'

const NavBar = () => (
  <Navbar as="header" variant="dark" bg="dark">
    <Container>
      <Row>
        <Col xs={12}>
          <NavbarBrand as="a" href="/">
            Hookah Stores
          </NavbarBrand>
        </Col>
      </Row>
    </Container>
  </Navbar>
)

export default NavBar
