import React from 'react'
import { Row } from "react-bootstrap";

const Title = (props) => {
  return (
    <div>
        <Row>
          <h2 className="title">{props.title}</h2>
        </Row>
    </div>
  )
}

export default Title