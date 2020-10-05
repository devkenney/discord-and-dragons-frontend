import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Jumbotron, Form, Col, InputGroup, Nav, Button, Modal } from 'react-bootstrap';
import ClassChange from './ClassChange'
import RaceChange from './RaceChange'

export default function EditInfo(props) {

  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showNoSheet, setShowNoSheet] = useState(false);
  const [userInfo, setInfo] = useState({});
  const [characterInfo, setCharacterInfo] = useState({});
  const [state, setState] = useState({
    character: '',
    player: '',
    gender: '',
    age: 0,
    height: '',
    hair: '',
    skin: '',
    weight: 0,
    description: '',
    alignment: '',
    background: '',
    race: '',
    charClass: ''
  });

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseNoSheet = () => setShowNoSheet(false);
  const handleShowNoSheet = () => setShowNoSheet(true);

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/sheets/update/info', {
        playerId: userInfo.id,
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
    (async () => {
      const response = await axios.get('https://www.dnd5eapi.co/api/classes')
      setClasses(response.data.results)
    })()
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get('https://www.dnd5eapi.co/api/races')
      setRaces(response.data.results)
    })()
  }, [])

  useEffect(() => {
    async function fetchUserData(type, access) {
      const response = await axios.get('https://discordapp.com/api/users/@me', {
        headers: {
          authorization: `${type} ${access}`
        }
      })
      setInfo(response.data);
    }

    async function putTogether() {
      if (localStorage.accessToken) {
        await fetchUserData(localStorage.tokenType, localStorage.accessToken)
      } else {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        if (fragment.has("access_token")) {
          const accessToken = fragment.get("access_token");
          const tokenType = fragment.get("token_type");
          await fetchUserData(tokenType, accessToken);
          localStorage.setItem('tokenType', tokenType);
          localStorage.setItem('accessToken', accessToken);
        } else {
          handleShowLogin();
        }
      }
    }
    putTogether();
  }, [])

  useEffect(() => {
    console.log('test')
    console.log(userInfo.id);
    if (userInfo.id) {
    (async (userId) => {
      const response = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/sheets/show/' + userId)
      // console.log(response);
      setCharacterInfo(response.data);
      setState({
        character: response.data.names.character,
        player: response.data.names.player,
        gender: response.data.characterInfo.descriptors.gender,
        age: response.data.characterInfo.descriptors.age,
        height: response.data.characterInfo.descriptors.height,
        hair: response.data.characterInfo.descriptors.hair,
        skin: response.data.characterInfo.descriptors.skin,
        weight: response.data.characterInfo.descriptors.weight,
        description: response.data.characterInfo.descriptors.description,
        alignment: response.data.characterInfo.alignment,
        background: response.data.characterInfo.background,
        race: response.data.characterInfo.race,
        charClass: response.data.characterInfo.charClass
      })
      console.log(characterInfo);
    })(userInfo.id)
    }
  }, [userInfo])

  return (
    <Container>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header>
          <Modal.Title>Error Processing Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>It doesn't look like you're logged in. Click below to verify your identity with discord!</Modal.Body>
        <Modal.Footer>
          <Button as="a" variant="primary" href="https://discord.com/api/oauth2/authorize?client_id=759107521117159465&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fedit%2Finfo&response_type=token&scope=identify">Go to Discord!</Button>
        </Modal.Footer>
      </Modal>

      <Jumbotron className="mt-5">

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link href="/edit/info" active>Info</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/edit/combat">Combat</Nav.Link>
        </Nav.Item>
      </Nav>

        <Form>
          <Form.Row>
            <Col sm="2">

              <Form.Group>
                <Form.Label>Discord Username</Form.Label>
                <Form.Control onChange={handleInput} type="text" value={`${userInfo.username}#${userInfo.discriminator}`} readOnly />
              </Form.Group>

            </Col>
            <Col>

              <Form.Group>
                <Form.Label>Character Name</Form.Label>
                <Form.Control onChange={handleInput} name="character" type="text" value={state.character} placeholder={characterInfo.names?.character || 'eg. Charles Thornbush'} />
              </Form.Group>

            </Col>
            <Col>

              <Form.Group>
                <Form.Label>Player Name</Form.Label>
                <Form.Control onChange={handleInput} name="player" type="text" value={state.player} placeholder={characterInfo.names?.player || 'Your name'} />
              </Form.Group>

            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm="2" className="mr-2">

              <Form.Row>

                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control onChange={handleInput} name="gender" type="text" value={state.gender} placeholder={characterInfo.characterInfo?.descriptors.gender || 'Character gender'} />
                </Form.Group>

              </Form.Row>
              <Form.Row>

                <Form.Group>
                  <Form.Label>Age</Form.Label>
                  <Form.Control onChange={handleInput} name="age" type="number" value={state.age} placeholder={characterInfo.characterInfo?.descriptors.age || 0} />
                </Form.Group>

              </Form.Row>
              <Form.Row>

                <Form.Group>
                  <Form.Label>Height</Form.Label>
                  <Form.Control onChange={handleInput} name="height" type="text" value={state.height} placeholder={characterInfo.characterInfo?.descriptors.height || `eg. 5'4"`} />
                </Form.Group>
              </Form.Row>

            </Col>
            <Col sm="2" className="mr-2">

              <Form.Row>

                <Form.Group>
                  <Form.Label>Hair</Form.Label>
                  <Form.Control onChange={handleInput} name="hair" type="text" value={state.hair} placeholder={characterInfo.characterInfo?.descriptors.hair || 'Hair color'} />
                </Form.Group>

              </Form.Row>
              <Form.Row>

                <Form.Group>
                  <Form.Label>Skin</Form.Label>
                  <Form.Control onChange={handleInput} name="skin" type="text" value={state.skin} placeholder={characterInfo.characterInfo?.descriptors.skin || 'Skin color'} />
                </Form.Group>

              </Form.Row>
              <Form.Row>

                <Form.Group>
                  <Form.Label>Weight</Form.Label>
                  <InputGroup>
                    <Form.Control onChange={handleInput} name="weight" type="number" value={state.weight} placeholder={characterInfo.characterInfo?.descriptors.weight || 0} />
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
                <textarea onChange={handleInput} name="description" rows="8" className="form-control" value={state.description} placeholder={characterInfo.characterInfo?.descriptors.description || 'Put your creative description here!'} />
              </Form.Group>

            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Alignment</Form.Label>
                <Form.Control onChange={handleInput} name="alignment" type="text" value={state.alignment} placeholder={characterInfo.characterInfo?.alignment || 'eg. Neutral Good'} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Background</Form.Label>
                <Form.Control onChange={handleInput} name="background" type="text" value={state.background} placeholder={characterInfo.characterInfo?.background || 'eg. Acolyte'} />
              </Form.Group>
            </Col>
            <Col>
              <RaceChange handleInput={handleInput} state={state} races={races} />
            </Col>
            <Col>
              <ClassChange handleInput={handleInput} state={state} classes={classes} />
            </Col>
          </Form.Row>
          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
      </Jumbotron>
    </Container>
  )
}