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

    const calculateNeighbors = (bombDirectory, row, col) => {
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

    useEffect(() => {
        const generateIdentity = () => {
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
            // setBombDirectory(directory)
            temp.forEach((row, i) => {
                row.forEach((box, j) => {
                    let number = calculateNeighbors(directory, i, j)
                    if (!directory.has(`row${i}column${j}`) && number > 0) {
                        temp[i][j] = number
                    }
                })
            })
            setBombMap(temp)
        }
        generateIdentity()
    }, [])


    return (
        <div className="container">
            {bombMap.map((row, i) => {
                return (
                    <Row>
                        {row.map((col, j) => {
                            return (
                                <Square
                                    identity={col}
                                >
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