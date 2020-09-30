import React from 'react';

export default function Username (props) {
  const info = props.info

  return (
    <small>{info.username}#{info.discriminator}</small>

  )
}