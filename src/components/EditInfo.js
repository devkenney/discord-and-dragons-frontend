import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Jumbotron, Form, Col, InputGroup, Nav, Button } from 'react-bootstrap';

export default function EditInfo(props) {

  const [userInfo, setInfo] = useState({});
  const [characterInfo, setCharacterInfo] = useState({});
  const [state, setState] = useState({
    character: '',
    player: '',
    gender: '',
    age: '',
    height: '',
    hair: '',
    skin: '',
    weight: '',
    description: '',
    alignment: '',
    background: '',
    race: '',
    charClass: ''
  })

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/users/signup', {
        names: {
          character: state.character,
          player: state.player
        },
        characterInfo: {
          descriptors: {
            description: state.description,
            gender: state.gender,
            age: state.age,
            height: state.height,
            weight: state.weight,
            hair: state.hair,
            skin: state.skin
          },
          alignment: state.alignment,
          background: state.background,
          race: state.race,
          charClass: state.charClass
        }
      });
      setCharacterInfo(response.data)
    } catch (error) {
      console.error(error);
    }
  }


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

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link href="/edit/info" active>Info</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/edit/combat">Combat</Nav.Link>
        </Nav.Item>
      </Nav>

        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Col sm="2">

              <Form.Group>
                <Form.Label>Discord Username</Form.Label>
                <Form.Control onChange={handleInput} type="text" placeholder={`${userInfo.username}#${userInfo.discriminator}`} readOnly />
              </Form.Group>

            </Col>
            <Col>

              <Form.Group>
                <Form.Label>Character Name</Form.Label>
                <Form.Control onChange={handleInput} name="character" type="text" placeholder={characterInfo.names?.character || 'eg. Charles Thornbush'} />
              </Form.Group>

            </Col>
            <Col>

              <Form.Group>
                <Form.Label>Player Name</Form.Label>
                <Form.Control onChange={handleInput} name="player" type="text" placeholder={characterInfo.names?.player || 'Your name'} />
              </Form.Group>

            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm="2" className="mr-2">

              <Form.Row>

                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control onChange={handleInput} name="gender" type="text" placeholder={characterInfo.characterInfo?.descriptors.gender || 'Character gender'} />
                </Form.Group>

              </Form.Row>
              <Form.Row>

                <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <Form.Control onChange={handleInput} name="age" type="number" placeholder={characterInfo.characterInfo?.descriptors.age || 0} />
                </Form.Group>

              </Form.Row>
              <Form.Row>

                <Form.Group>
                  <Form.Label>Height</Form.Label>
                  <Form.Control onChange={handleInput} name="height" type="text" placeholder={characterInfo.characterInfo?.descriptors.height || `eg. 5'4"`} />
                </Form.Group>
              </Form.Row>

            </Col>
            <Col sm="2" className="mr-2">

              <Form.Row>

                <Form.Group>
                  <Form.Label>Hair</Form.Label>
                  <Form.Control onChange={handleInput} name="hair" type="text" placeholder={characterInfo.characterInfo?.descriptors.hair || 'Hair color'} />
                </Form.Group>

              </Form.Row>
              <Form.Row>

                <Form.Group>
                  <Form.Label>Skin</Form.Label>
                  <Form.Control onChange={handleInput} name="skin" type="text" placeholder={characterInfo.characterInfo?.descriptors.skin || 'Skin color'} />
                </Form.Group>

              </Form.Row>
              <Form.Row>

                <Form.Group>
                  <Form.Label>Weight</Form.Label>
                  <InputGroup>
                    <Form.Control onChange={handleInput} name="weight" type="number" placeholder={characterInfo.characterInfo?.descriptors.weight || 0} />
                    <InputGroup.Append>
                      <InputGroup.Text>lbs.</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>

              </Form.Row>

            </Col>
            <Col>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <textarea onChange={handleInput} name="description" rows="8" className="form-control" placeholder={characterInfo.characterInfo?.descriptors.description || 'Put your creative description here!'} />
              </Form.Group>

            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Alignment</Form.Label>
                <Form.Control onChange={handleInput} name="alignment" type="text" placeholder={characterInfo.characterInfo?.alignment || 'eg. Neutral Good'} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Background</Form.Label>
                <Form.Control onChange={handleInput} name="background" type="text" placeholder={characterInfo.characterInfo?.background || 'eg. Acolyte'} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Race</Form.Label>
                <Form.Control onChange={handleInput} name="race" type="text" placeholder={characterInfo.characterInfo?.race || 'Character Race'} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Class</Form.Label>
              <Form.Control onChange={handleInput} name="charClass" type="text" placeholder={characterInfo.characterInfo?.charClass || 'Character Class'} />
            </Col>
          </Form.Row>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Jumbotron>
    </Container>
  )
}