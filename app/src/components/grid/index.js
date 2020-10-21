import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row'
import Square from "../square"
import "./style.scss"
const Grid = () => {
  const [board, setBoard] = useState([])
  const [revealed, setRevealed] = useState(0)
  const [flagCount, setFlagCount] = useState(0)
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

  const generateNewBoard = () => {
    let data = createEmptyBoard();
    data = generateBombs(data);
    data.forEach((row, x) => {
      row.forEach((item, y) => {
        let neighbors = calculateNeighbors(x, y, data)
        item.neighbors = neighbors
        if (neighbors === 0 && !item.isMine) {
          item.isEmpty = true
        }
      })
    })
    setBoard(data)
  }


  const dfs = (x, y, board) => {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    const m = board.length;
    // Count the adjacent mines
    if (board[x][y].neighbors > 0 && !board[x][y].isMine) {
      board[x][y].isRevealed = true
      setRevealed(revealed + 1)
    }
    else {
      // If an empty square ('E') with no adjacent mines is revealed, then change it to revealed blank ('B')
      // and all of its adjacent unrevealed squares should be revealed recursively.
      // console.log("board:" + board,  "x:" + x, y)
      for (let [dx, dy] of directions) {
        const i = x + dx, j = y + dy;
        if (i >= 0 && i < m && j >= 0 && j < m && !board[i][j].isRevealed) {
          board[i][j].isRevealed = true;
          setRevealed(revealed + 1)
          dfs(i, j, board);
        }
      }
    }
    return board
  };

  const updateBoard = (x, y, board) => {
    if (board[x][y].isMine) {
      board[x][y].isRevealed = true;
      setRevealed(revealed + 1)
    } 
    else {
      board = dfs(x, y, board);
    }
    return board;
  };



  const handleLeftClick = (x, y) => {
    if (board[x][y].isRevealed || board[x][y].isFlagged) {
      return
    }

    let tempBoard =updateBoard(x, y, board)
    setBoard(tempBoard)
  }

  const handleRightClick = (x, y, e) => {
    e.preventDefault()
    if (board[x][y].isRevealed) {
      return
    }
    
    let tempBoard = board
    if(!tempBoard[x][y].isFlagged){
      tempBoard[x][y].isFlagged = true
      setFlagCount(flagCount + 1)
    }
    else {
      tempBoard[x][y].isFlagged = false 
      setFlagCount(flagCount - 1)
    }
    
    setBoard(tempBoard)
  }


  useEffect(() => {
    generateNewBoard()
  }, [])

  console.log(board)

  return (
    <div className="container">
      {board.map((row, i) => {
        return (
          <Row
            key={i}
          >
            {row.map((col, j) => {
              return (
                <Square
                  leftClick={() => { handleLeftClick(col.x, col.y) }}
                  rightClick={(e) => { handleRightClick(col.x, col.y, e) }}
                  key={`${col.x}and${col.y}is${col.isRevealed}`}
                  data={col}
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