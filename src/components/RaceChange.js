import React from 'react';
import { Form } from 'react-bootstrap'

export default function RaceChange (props) {
  return (
    <Form.Group>
      <Form.Label>Race</Form.Label>
      <Form.Control as="select" name="race" onChange={props.handleInput} value={props.state.race}>
        {
          props.races.map((race) => {
            return (
              <option>{race.index}</option>
            )
          })
        }
      </Form.Control>
    </Form.Group>
  )
}