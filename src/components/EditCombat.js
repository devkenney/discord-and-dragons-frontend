import React from 'react';
import { Container, Jumbotron, Nav } from 'react-bootstrap';

export default function EditCombat(props) {


  return (
    <Container>
      <Jumbotron className="mt-5">

        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link href="/edit/info">Info</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/edit/combat" active>Combat</Nav.Link>
          </Nav.Item>
        </Nav>

      </Jumbotron>
    </Container>
  )
}