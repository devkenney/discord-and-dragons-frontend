import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

export default function (props) {

  return (
    <ListGroup>
    {props.skills.map((skill, i) => {
      return (
        <ListGroup.Item className="p-1 text-left d-flex justify-content-between" variant="secondary" key={i}><div><small>{skill.name}</small></div><Badge variant="dark" className="p-1">+1</Badge></ListGroup.Item>
      )
    })}
    </ListGroup>

  )
}