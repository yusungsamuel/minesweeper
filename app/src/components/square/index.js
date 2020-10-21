import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col'
import "./style.scss";

const Square = (props) => {

    const conditionalRender = () => {
        console.log("I was run")
        let data = props.data
        if (!data.isRevealed) {
            return (
                data.isFlagged ? "flag" : null
            )

        }
        if (data.isMine) {
            console.log("im a bomb")
            return ("bomb")
        }
        if (data.neighbors === 0) {
            return (
                data.isFlagged ? "flag" : 0
            );
        }
        return (
            data.neighbors
        );
    }
    // const handleClick = (e) => {
    //     if (status === "covered") {
    //         if (e.type === "click") {
    //             props.update(props.coordinate, setStatus)
    //         }
    //         else if (e.type === 'contextmenu') {
    //             e.preventDefault();
    //             setStatus("flagged")
    //         }
    //     }
    //     else if (status === "flagged") {
    //         if (e.type === 'contextmenu') {
    //             e.preventDefault();
    //             setStatus("covered")
    //         }
    //     }

    // }
    return (
        <Col
            onClick={props.click}
        // onContextMenu={handleClick}
        >
            {
                conditionalRender()
            }
        </Col>
    )
}

export default Square;