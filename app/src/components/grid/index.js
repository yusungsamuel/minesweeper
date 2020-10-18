import React, {useEffect, useState} from "react";
import Row from 'react-bootstrap/Row'
import Square from "../square"
import "./style.scss"
const Grid = () => {
    const [bombMap, setBombMap] = useState([])
        
    useEffect(()=>{
        const generateBombs = () =>{
            let arr = [
                ["","","","","","","",""],
                ["","","","","","","",""],
                ["","","","","","","",""],
                ["","","","","","","",""],
                ["","","","","","","",""],
                ["","","","","","","",""],
                ["","","","","","","",""],
                ["","","","","","","",""]
            ]
            let bombCounts = 0
            while (bombCounts < 10){
                let row = Math.floor(Math.random()* 8);
                let column = Math.floor(Math.random()* 8)
                // if(!bombMap.has(`row${row}column${column}`)){
                //     bombMap.add(`row${row}column${column}`)
                //     bombCounts ++
                // }
                if(arr[row][column] === ""){
                    arr[row][column] = "x"
                    bombCounts ++
                }
            }
            setBombMap(arr)
        }
        generateBombs()
    }, [])
    
    console.log(bombMap)
    return(
        <div className="container">
            {bombMap.map((row, i)=>{
                return (
                    <Row>
                        {row.map((col, j)=>{
                           return (
                            <Square>
                                {/* {bombMap.has(`row${i}column${j}`)? "x" : ""} */}
                                {col}
                            </Square>
                           ) 
                        })}
                    </Row>
                )
            })}
        </div>
        
    )
}

export default Grid;