import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col'
import "./style.scss";

const Square = (props) => {
    const [status, setStatus] = useState("covered")
    // const [identity, setIdentity] = useState("")
    const [x, y] = props.coordinate

    const conditionalRender = (status) => {
        switch (status) {
            case "revealed":
                return props.board[x][y]
            case "flagged":
                return "flag"
            default:
                return ""
        }
    }

    const handleClick = (e) => {
        if (status === "covered") {
            if (e.type === "click") {
                props.update(props.coordinate, setStatus)
            }
            else if (e.type === 'contextmenu') {
                e.preventDefault();
                setStatus("flagged")
            }
        }
        else if (status === "flagged") {
            if (e.type === 'contextmenu') {
                e.preventDefault();
                setStatus("covered")
            }
        }

    }
    return (
        <Col
            onClick={handleClick}
            onContextMenu={handleClick}
        >
            {conditionalRender(status)}
        </Col>
    )
}

export default Square;