import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row'
import Square from "../square"
import "./style.scss"
const Grid = () => {
    const [bombMap, setBombMap] = useState([
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
    ])
    const [bombDirectory, setBombDirectory] = useState()
    useEffect(() => {
        const generateBombs = () => {
            let bombCounts = 0
            let temp = [...bombMap]
            let directory = new Set()
            while (bombCounts < 10) {
                let row = Math.floor(Math.random() * 8);
                let column = Math.floor(Math.random() * 8)

                if (!directory.has(`row${row}column${column}`)) {
                    directory.add(`row${row}column${column}`)
                    temp[row][column] = "x";
                    bombCounts++;
                }
            }
            setBombMap(temp)
            setBombDirectory(directory)
        }
        generateBombs()
    }, [])

    const calculateNeighbors = (row, col) => {
        let number = 0
        //check top left
        if (bombDirectory.has(`row${row - 1}column${col - 1}`)) {
            number++
        }
        //check top 
        if (bombDirectory.has(`row${row - 1}column${col}`)) {
            number++
        }
        //check top right
        if (bombDirectory.has(`row${row - 1}column${col + 1}`)) {
            number++
        }
        //check left
        if (bombDirectory.has(`row${row}column${col - 1}`)) {
            number++
        }
        //check right 
        if (bombDirectory.has(`row${row}column${col + 1}`)) {
            number++
        }
        //check bottom left
        if (bombDirectory.has(`row${row + 1}column${col - 1}`)) {
            number++
            //check bottom
        }
        if (bombDirectory.has(`row${row + 1}column${col}`)) {
            number++
        }
        //check bottom right 
        if (bombDirectory.has(`row${row + 1}column${col + 1}`)) {
            number++
        }
        return number
    }

    const handleBoxClick = (row, col) => {
        let number = calculateNeighbors(row, col)
        if (number > 0) {
            let temp = [...bombMap];
            temp[row][col] = number
            setBombMap(temp)
        }
    }


    console.log(bombMap)
    return (
        <div className="container">
            {bombMap.map((row, i) => {
                return (
                    <Row>
                        {row.map((col, j) => {
                            return (
                                <Square
                                    click={(i, j) => { handleBoxClick(i, j) }}
                                >
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