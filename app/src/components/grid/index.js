import React, { useEffect, useState, useRef } from "react";
import Row from 'react-bootstrap/Row'
import Square from "../square"
import Button from "../button"
import Timer from "../timer"
import "./style.scss"
const Grid = () => {
  const [board, setBoard] = useState([])
  const [revealed, setRevealed] = useState(0)
  const [flagCount, setFlagCount] = useState(0)
  const [gameStatus, setGameStatus] = useState("not started")
  const [time, setTime] = useState(0)
  const timeRef = useRef(null)

  const createEmptyBoard = () => {
    let data = [];

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

  const getCovered = (data) => {
    let mineArray = [];

    data.forEach(row => {
      row.forEach(item => {
        if (!item.isRevealed) {
          mineArray.push(item);
        }
      });
    });

    return mineArray;
  }

  const getFlaggedMine = (data) => {
    let flaggedMine = 0

    data.forEach(row => {
      row.forEach(item => {
        if (item.isFlagged && item.isMine) {
          flaggedMine++
        }
      })
    })

    return flaggedMine
  }

  const revealAllMine = () => {
    let tempBoard = board
    tempBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isMine) {
          cell.isRevealed = true
        }
      })
    })
    setBoard(tempBoard)
  }

  const dfsEmpty = (x, y, data) => {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    const m = data.length;

    for (let [dx, dy] of directions) {
      const i = x + dx, j = y + dy;
      if (i >= 0 && i < m && j >= 0 && j < m) {
        if (
          !data[i][j].isFlagged &&
          !data[i][j].isRevealed &&
          (data[i][j].isEmpty || !data[i][j].isMine)
        ) {
          data[i][j].isRevealed = true;
          setRevealed(revealed + 1)
          if (data[i][j].isEmpty) {
            dfsEmpty(i, j, data);
          }
        }
      }

    }
    return data;
  }

  const handleLeftClick = (x, y) => {
    if (gameStatus === "not started") {
      setGameStatus("on going")
      timeRef.current = setInterval(() => { setTime(timer => timer + 1); }, 1000);
    }

    if (
      board[x][y].isRevealed ||
      board[x][y].isFlagged
    )
      return null;

    if (board[x][y].isMine) {
      // this.setState({ gameStatus: "You Lost." });
      revealAllMine();
      setGameStatus("game over");
      clearInterval(timeRef.current)
      alert("game over")
    }

    let tempBoard = board;
    tempBoard[x][y].isFlagged = false;
    tempBoard[x][y].isRevealed = true;
    setRevealed(revealed + 1)

    if (tempBoard[x][y].isEmpty) {
      tempBoard = dfsEmpty(x, y, tempBoard);
    }

    if (getCovered(tempBoard).length === 10) {
      // this.setState({ mineCount: 0, gameStatus: "You Win." });
      revealAllMine();
      clearInterval(timeRef.current)
      setGameStatus("game over");
      alert("You Win");
    }

    setBoard(tempBoard)
  }

  const handleRightClick = (x, y, e) => {
    e.preventDefault();
    let tempBoard = board;
    let flag = flagCount;

    // check if already revealed
    if (tempBoard[x][y].isRevealed) return;

    if (tempBoard[x][y].isFlagged) {
      tempBoard[x][y].isFlagged = false;
      flag--;
    } else {
      tempBoard[x][y].isFlagged = true;
      flag++;
    }
    console.log(flag, getFlaggedMine(tempBoard))
    if (flag === 10 && getFlaggedMine(tempBoard) === 10) {
      revealAllMine();
      setGameStatus("game over");
      clearInterval(timeRef.current)
      alert("You Win");
    }

    setBoard(tempBoard);
    setFlagCount(flag)
  }

  const changeGameState = (e) => {
    e.preventDefault();
    if (gameStatus === "game over" || gameStatus === "on going") {
      setGameStatus("not started")
      clearInterval(timeRef.current)
      setTime(0)
      generateNewBoard()
    }
    else {
      return
    }
  }

  useEffect(() => {
    generateNewBoard()
  }, [])

  console.log(board)

  return (
    <div>
      <div className="top-bar"> 
        <Button
          change={changeGameState}
          gameStatus={gameStatus}
        ></Button>
        <Timer
          time={time}
        ></Timer>

      </div>
      <div className="container">
        {board.map((row, i) => {
          return (
            <Row
              key={i}
            >
              {row.map((col, j) => {
                return (
                  <Square
                    leftClick={gameStatus === "game over" ? null : () => { handleLeftClick(col.x, col.y) }}
                    rightClick={gameStatus === "game over" ? null : (e) => { handleRightClick(col.x, col.y, e) }}
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

    </div>
  )
}

export default Grid;