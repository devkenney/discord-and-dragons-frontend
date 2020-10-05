import React from 'react';
import { Form } from 'react-bootstrap';

export default function SkillProficiencies (props) {
  const { profChoices } = props.profChoices;
  if (profChoices) {
  return (
    <Form.Group>
      <Form.Label>Skill Proficiencies</Form.Label>
      <Form.Control as="select" value={props.value} onChange={props.handleInput} multiple>
        {
          profChoices.map((choice) => {


            return (
              <option>{choice.index}</option>
            )
          })
        }
      </Form.Control>
    </Form.Group>

  )
  } else {
    return (

    <Form.Group>
      <Form.Label>Skill Proficiencies</Form.Label>
      <Form.Control as="select" value={props.value} onChange={props.handleInput} multiple>
        <option>Loading...</option>
      </Form.Control>
    </Form.Group>      
    )
  }
}