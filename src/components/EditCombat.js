import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Jumbotron, Nav, Form, Col, Modal, Button } from 'react-bootstrap';
import SkillProficiencies from './SkillProficiencies';

export default function EditCombat(props) {

  const [showLogin, setShowLogin] = useState(false);
  const [showNoClass, setShowNoClass] = useState(false);
  const [state, setState] = useState({});
  const [userInfo, setInfo] = useState({});
  const [characterInfo, setCharacterInfo] = useState({});
  const [classInfo, setClassInfo] = useState({});
  const [choices, setChoices] = useState([]);

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value})
  }

  // const handleProficiencyInput = (event) => {
  //   setState({
  //     ...state,
  //     [event.target.value]: {

  //     }
  //   })
  // }

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleShowClass = () => setShowNoClass(true);
  const handleCloseClass = () => setShowNoClass(false);

  const getMod = (score) => {
    // PLEASE FIND A BETTER WAY OF DOING THIS IT'S SO UGLY
    switch (score) {
      case 1:
        return -5;
      case 2 || 3:
        return -4;
      case 4 || 5:
        return -3;
      case 6 || 7:
        return -2;
      case 8 || 9:
        return -1;
      case 10 || 11:
        return 0;
      case 12 || 13:
        return 1;
      case 14 || 15:
        return 2;
      case 16 || 17:
        return 3;
      case 18 || 19:
        return 4;
      case 20 || 21:
        return 5;
      case 22 || 23:
        return 6;
      case 24 || 25:
        return 7;
      case 26 || 27:
        return 8;
      case 28 || 29:
        return 9;
      case 30:
        return 10;
      default:
        return null;
    }
  }

  useEffect(() => {
    console.log('useEffect running')
    console.log(characterInfo);
    if (Object.keys(characterInfo).length > 1) {
      // console.log('Character Info:')
      // console.log(characterInfo);
      console.log('worked');
      if (characterInfo.characterInfo?.charClass != '') {
        (async () => {
          console.log('test');
          const response = await axios.get(`https://www.dnd5eapi.co/api/classes/${characterInfo.characterInfo.charClass}`)
          setClassInfo(response.data);
          setChoices({
            ...state,
            profChoices: response.data.proficiency_choices[0].from
          })
        })()
      } else {
        handleShowClass();
      }
    }
  }, [characterInfo]);

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
    if (userInfo.id) {
    (async (userId) => {
      const response = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:3000') + '/sheets/show/' + userId)
      setCharacterInfo(response.data);
      setState({
        ...state,
        strScore: response.data.stats.strength.score,
        dexScore: response.data.stats.dexterity.score,
        conScore: response.data.stats.constitution.score,
        intScore: response.data.stats.intelligence.score,
        wisScore: response.data.stats.wisdom.score,
        chaScore: response.data.stats.charisma.score
      })
    })(userInfo.id)
    }
  }, [userInfo])

  return (
    <Container>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Error Processing Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>It doesn't look like you're logged in. Click below to verify your identity with discord!</Modal.Body>
        <Modal.Footer>
          <Button as="a" variant="primary" href="https://discord.com/api/oauth2/authorize?client_id=759107521117159465&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fedit%2Finfo&response_type=token&scope=identify">Go to Discord!</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNoClass} onHide={handleCloseClass}>
        <Modal.Header>
          <Modal.Title>Warning..</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have not selected a Class yet! Some of the features on this page will not be available. Go set one over on the info tab!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseClass}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Jumbotron className="mt-5">

        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link href="/edit/info">Info</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/edit/combat" active>Combat</Nav.Link>
          </Nav.Item>
        </Nav>

        <Form>
          <Col>
            <Form.Row>
              <Col sm="2">

                <Form.Group>
                  <Form.Label>Strength</Form.Label>
                  <Form.Control type="number" name="strScore" onChange={handleInput} value={state.strScore} placeholder={characterInfo.stats?.strength.score || 10} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Dexterity</Form.Label>
                  <Form.Control type="number" name="dexScore" onChange={handleInput} value={state.dexScore} placeholder={characterInfo.stats?.dexterity.score || 10} />
                </Form.Group>
              
              </Col>
              <Col sm="2">
              
                <Form.Group>
                  <Form.Label>Constitution</Form.Label>
                  <Form.Control type="number" name="conScore" onChange={handleInput} value={state.conScore} placeholder={characterInfo.stats?.constitution.score || 10} />
                </Form.Group>
              
                <Form.Group>
                  <Form.Label>Intelligence</Form.Label>
                  <Form.Control type="number" name="intScore" onChange={handleInput} value={state.intScore} placeholder={characterInfo.stats?.intelligence.score || 10} />
                </Form.Group>
              
              </Col>
              <Col sm="2">
              
                <Form.Group>
                  <Form.Label>Wisdom</Form.Label>
                  <Form.Control type="number" name="wisScore" onChange={handleInput} value={state.wisScore} placeholder={characterInfo.stats?.wisdom.score || 10} />
                </Form.Group>
              
                <Form.Group>
                  <Form.Label>Charisma</Form.Label>
                  <Form.Control type="number" name="chaScore" onChange={handleInput} value={state.chaScore} placeholder={characterInfo.stats?.charisma.score || 10} />
                </Form.Group>
              
              </Col>
            </Form.Row>

            <Form.Row>
              <Col sm="6">
                <SkillProficiencies
                  profChoices={choices}
                  value={state.proficiencies}
                  handleInput={handleInput}
                />
              </Col>
            </Form.Row>
          </Col>
        </Form>

      </Jumbotron>
    </Container>
  )
}