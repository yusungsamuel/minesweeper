import React from "react";
import "./style.scss"
const Button = (props) =>{
    return (
        <div
            onClick={props.change}
            className={"button"}
        >
            {props.gameStatus === "game over" ?  <i class="fas fa-sad-tear"></i> : <i class="fas fa-smile"></i>}
        </div>
    )
}

export default Button;