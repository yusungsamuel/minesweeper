import React from "react";

const Button = (props) =>{
    return (
        <div
            onClick={props.change}
        >
            {props.gameStatus === "game over" ?  <i class="fas fa-sad-tear"></i> : <i class="fas fa-smile"></i>}
        </div>
    )
}

export default Button;