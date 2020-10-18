import React from "react";
import Col from 'react-bootstrap/Col'
import "./style.scss";

const Square = (props) => {
    return (
        <Col>
            {props.children}
        </Col>
    )
}

export default Square;