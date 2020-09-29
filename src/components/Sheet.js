import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Alert, Row, Col, Card } from 'react-bootstrap'

export default function Sheet(props) {
  const id = props.match.params.id;
  const [sheet, setSheet] = useState({});

  return (
    <Container>
      <Jumbotron style={{ margin: 20 }}>
        <Row>
          <Col sm="5">
            <Alert variant="primary"><h2>Character Name Here</h2></Alert>
          </Col>
          <Col sm="7">
            <Jumbotron className="p-2 bg-secondary text-light">
              <Row>
                <Col sm="4" className="text-left">
                  class name
                  <hr className="bg-light m-0" />
                  <small>Class</small>
                </Col>
                <Col sm="4" className="text-left">
                  Race name
                  <hr className="bg-light m-0" />
                  <small>Race</small>
                </Col>
                <Col sm="4" className="text-left">
                  alignment name
                  <hr className="bg-light m-0" />
                  <small>Alignment</small>
                </Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col sm="2">
            <Card bg="dark" text="warning">
              <Card.Header className="p-0"><small>Strength</small></Card.Header>
              <Card.Body className="p-1">15</Card.Body>
              <Card.Footer className="p-0">+2</Card.Footer>
            </Card>
              <Card bg="dark" text="warning">
              <Card.Header className="p-0"><small>Dexterity</small></Card.Header>
              <Card.Body className="p-1">15</Card.Body>
              <Card.Footer className="p-0">+2</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Jumbotron>
    </Container>
  )
}