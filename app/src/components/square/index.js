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

    const handleLeftClick = () => {
        console.log(identity)
        setStatus("revealed")
    } 
    return (
        <Col
            onClick={handleLeftClick}
        >
            {conditionalRender(status)}
        </Col>
    )
}

export default Square;