import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Jumbotron, Form, Col } from 'react-bootstrap';

export default function New(props) {

  const [userInfo, setInfo] = useState({});

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
        <Form>
          <Form.Row>
            <Col>
              <Form.Group>
              <Form.Label>Discord Username</Form.Label>
              <Form.Control type="text" placeholder={`${userInfo.username}#${userInfo.discriminator}`} readOnly />
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      </Jumbotron>
    </Container>
  )
}