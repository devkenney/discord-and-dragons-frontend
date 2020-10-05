import React from 'react';
import { Form } from 'react-bootstrap'

export default function ClassChange (props) {
  return (
    <Form.Group>
      <Form.Label>Class</Form.Label>
      <Form.Control as="select" name="charClass" onChange={props.handleInput} value={props.state.charClass}>
        {
          props.classes.map((charClass) => {
            return (
              <option>{charClass.index}</option>
            )
          })
        }
      </Form.Control>
    </Form.Group>
  )
}