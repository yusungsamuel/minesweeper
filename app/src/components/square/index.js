import React, {useState} from "react";
import Col from 'react-bootstrap/Col'
import "./style.scss";

const Square = (props) => {
    const [status, setStatus] = useState("covered")
    const identity = props.identity
    
    const conditionalRender = (status) => {
        switch (status){
            case "revealed": 
                return identity
            case "flagged":
                return "flag"
            default:
                return " "
        }
    }

    const handleClick = (e) => {
        if(e.type === "click"){
            setStatus("revealed")
        }
        else if(e.type === 'contextmenu'){
            e.preventDefault();
            setStatus("flagged")
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