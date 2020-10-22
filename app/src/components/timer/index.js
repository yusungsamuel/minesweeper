import React from "react";
import "./style.scss"
const Timer = (props) =>{
    
    return (
    <div className="time"> Time: {props.time}</div>
    )
}

export default Timer;