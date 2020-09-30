import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Jumbotron, Alert, Row, Col, Card, ListGroup } from 'react-bootstrap'
import SkillShow from './SkillShow'
import Username from './Username';

export default function Sheet(props) {
  const [sheet, setSheet] = useState({});
  const [skills, setSkills] = useState([]);
  const [userInfo, setInfo] = useState({});

  useEffect(() => {
    console.log('useEffect running...');
    async function fetchSkills() {
      const response = await axios.get('https://www.dnd5eapi.co/api/skills')
      setSkills(response.data.results);
    } fetchSkills();
  }, [])
  useEffect(() => {
    async function fetchUserData(type, access) {
      const response = await axios.get('https://discordapp.com/api/users/@me', {
        headers: {
          authorization: `${type} ${access}`
        }
      })
      console.log(response);
      setInfo(response.data)
    }

    if (localStorage.accessToken) {
      fetchUserData(localStorage.tokenType, localStorage.accessToken)
    } else {
      const fragment = new URLSearchParams(window.location.hash.slice(1));
      if (fragment.has("access_token")) {
        const accessToken = fragment.get("access_token");
        const tokenType = fragment.get("token_type");
        fetchUserData(tokenType, accessToken);
        localStorage.setItem('tokenType', tokenType);
        localStorage.setItem('accessToken', accessToken);
      }
    }
  }, [])

  return (
    <Container>
      <Jumbotron className="mt-5">
        <Row>
          <Col sm="5">
            <Alert variant="primary" className="p-1">
              <h2 className="m-0">Septa the Ineffable</h2>
              <hr className="m-0" />
              <Username info={userInfo} />  
            </Alert>
          </Col>
          <Col sm="7">
            <Jumbotron className="p-2 bg-secondary text-light">
              <Row>
                <Col sm="4" className="text-left">
                  Sourcerer
                  <hr className="bg-light m-0" />
                  <small>Class</small>
                </Col>
                <Col sm="4" className="text-left">
                  Literally a Crab
                  <hr className="bg-light m-0" />
                  <small>Race</small>
                </Col>
                <Col sm="4" className="text-left">
                  Chaotic Neutral
                  <hr className="bg-light m-0" />
                  <small>Alignment</small>
                </Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col sm="2" className="text-center">
            <h5>Stats</h5>
            <Card bg="dark" text="warning" className="my-3">
              <Card.Header className="p-0"><small>Strength</small></Card.Header>
              <Card.Body className="p-1">15</Card.Body>
              <Card.Footer className="p-0">+2</Card.Footer>
            </Card>
            <Card bg="dark" text="warning" className="my-3">
              <Card.Header className="p-0"><small>Dexterity</small></Card.Header>
              <Card.Body className="p-1">15</Card.Body>
              <Card.Footer className="p-0">+2</Card.Footer>
            </Card>
            <Card bg="dark" text="warning" className="my-3">
              <Card.Header className="p-0"><small>Constitution</small></Card.Header>
              <Card.Body className="p-1">15</Card.Body>
              <Card.Footer className="p-0">+2</Card.Footer>
            </Card>
            <Card bg="dark" text="warning" className="my-3">
              <Card.Header className="p-0"><small>Intelligence</small></Card.Header>
              <Card.Body className="p-1">15</Card.Body>
              <Card.Footer className="p-0">+2</Card.Footer>
            </Card>
            <Card bg="dark" text="warning" className="my-3">
              <Card.Header className="p-0"><small>Wisdom</small></Card.Header>
              <Card.Body className="p-1">15</Card.Body>
              <Card.Footer className="p-0">+2</Card.Footer>
            </Card>
            <Card bg="dark" text="warning" className="my-3">
              <Card.Header className="p-0"><small>Charisma</small></Card.Header>
              <Card.Body className="p-1">15</Card.Body>
              <Card.Footer className="p-0">+2</Card.Footer>
            </Card>
          </Col>
          <Col sm="2">
            <h5 className="text-center">Skills</h5>
            <SkillShow skills={skills} />
          </Col>
        </Row>
      </Jumbotron>
    </Container>
  )
}