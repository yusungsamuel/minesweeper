import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col'
import "./style.scss";

const Square = (props) => {
    
    const conditionalRender = () => {
        let data = props.data
        if(!data.isRevealed){
            return data.isFlagged ? "flag" : null
        }
        if (data.isMine) {
            return "bomb";
          }
          if (data.neighbour === 0) {
            return null;
          }
          return data.neighbor;
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
            onClick={props.onClick}
            // onContextMenu={handleClick}
        >
            {conditionalRender()}
        </Col>
    )
}

export default Square;