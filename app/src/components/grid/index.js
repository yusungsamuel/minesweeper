import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row'
import Square from "../square"
import "./style.scss"
const Grid = () => {
  const [board, setBoard] = useState([])

  const createEmptyBoard = () => {
    let data = new Array();

    for (let i = 0; i < 8; i++) {
      data.push([]);
      for (let j = 0; j < 8; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbors: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false
        };
      }

    }
    return data
  }

  const generateBombs = data => {
    let bombCounts = 0
    while (bombCounts < 10) {
      let row = Math.floor(Math.random() * 8);
      let column = Math.floor(Math.random() * 8)
      if (!data[row][column].isMine) {
        data[row][column].isMine = true;
        bombCounts++;
      }
    }
    return data
  }

  const calculateNeighbors = (x, y, data) => {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    const m = data.length;

    // Count the adjacent mines
    let bombCounts = 0;
    for (let [dx, dy] of directions) {
      const i = x + dx, j = y + dy;

      if (i >= 0 && i < m && j >= 0 && j < m && data[i][j].isMine) {
        bombCounts++;
      }
    }
    return bombCounts
  }

  const generateNewBoard = () =>{
    let data = createEmptyBoard();
    data = generateBombs(data);
    data.forEach((row, x)=>{
      row.forEach((item, y)=>{
        item.neighbors = calculateNeighbors(x, y, data)
      })
    })
    setBoard(data)
  }


  // const dfs = (x, y, board, reveal) => {
  //   console.log(reveal)
  //   const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  //   const m = board.length;

  //   // Count the adjacent mines
  //   let bombCounts = 0;
  //   for (let [dx, dy] of directions) {
  //     const i = x + dx, j = y + dy;

  //     if (i >= 0 && i < m && j >= 0 && j < m && board[i][j] === 'M') {
  //       bombCounts++;
  //     }
  //   }

  //   if (bombCounts > 0) {
  //     board[x][y] = '' + bombCounts;
  //     reveal("revealed")
  //   }
  //   else {
  //     // If an empty square ('E') with no adjacent mines is revealed, then change it to revealed blank ('B')
  //     // and all of its adjacent unrevealed squares should be revealed recursively.
  //     // console.log("board:" + board,  "x:" + x, y)
  //     board[x][y] = 'B';
  //     reveal("revealed")

  //     for (let [dx, dy] of directions) {
  //       const i = x + dx, j = y + dy;
  //       if (i >= 0 && i < m && j >= 0 && j < m && board[i][j] === "E") {
  //         board[i][j] = 'B';
  //         reveal("revealed")
  //         dfs(i, j, board);
  //       }
  //     }
  //   }
  //   return board
  // };

  // const updateBoard = (coordinate, reveal, board = bombMap) => {
  //   const [x, y] = coordinate;
  //   if (board[x][y] === 'M') {
  //     // If a mine ('M') is revealed, then the game is over - change it to 'X'
  //     board[x][y] = 'X';
  //   } else {
  //     setBombMap(dfs(x, y, board, reveal));
  //   }

  //   setBombMap(board);
  // };

  useEffect(() => {
    generateNewBoard();
  }, [])

  console.log(board)
  return (
    <div className="container">
      {/* {bombMap.map((row, i) => {
        return (
          <Row>
            {row.map((col, j) => {
              return (
                <Square
                  identity={col}
                  board={bombMap}
                  coordinate={[i, j]}
                  update={updateBoard}
                >
                </Square>
              )
            })}
          </Row>
        )
      })} */}
    </div>

  )
}

export default Grid;