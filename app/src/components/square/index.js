import React from "react";
import Col from 'react-bootstrap/Col'
import "./style.scss";

const Square = (props) => {

    const conditionalRender = () => {
        console.log("I was run")
        let data = props.data
        if (!data.isRevealed) {
            return (
                data.isFlagged ? <i class="far fa-flag"></i> : null
            )

        }
        if (data.isMine) {
            return (<i class="fas fa-bomb"></i>)
        }
        if (data.neighbors === 0) {
            return (
                data.isFlagged ? <i class="far fa-flag"></i> : ""
            );
        }
        return (
            data.neighbors
        );
    }

    let className = `col ${props.data.isRevealed ? "revealed" : " unrevealed"}`
    return (
        <Col
            bsPrefix={className}
            onClick={props.leftClick}
            onContextMenu={props.rightClick}
        >
            {
                conditionalRender()
            }
        </Col>
    )
}

export default Square;