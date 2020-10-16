# Frontend Engineer Technical Task: Minesweeper

## Task

Create an in-browser minesweeper game using React.js in a dockerized container.

## Getting started

Start the development container by following the instructions in [./DOCKER.md](./DOCKER.md). Working knowledge of docker, HTML, CSS and javascript are assumed.

## Requirements

- This task must be completed using React.js
- Build a single-page application that allows the user to play the minesweeper game in their browser, implementing the following functions:
	- An 8-by-8 grid of cells. For every new game, place 10 mines in random locations throughout this board. All cells should be hidden when a new game is started.
	- A button to change the game state. Clicking this button changes game state according to the following rules:
		- If there is no game ongoing, start a new game
		- If a game is ongoing, stop the game
	- A text box that shows a timer that increments in one second increments until the game is stopped, won or lost. Starting a new game resets the timer.
	- Right clicking a cell marks the cell as a mine using a flag icon. Right clicking a marked cell unmarks it and leaves it unrevealed.
	- Left clicking a cell reveals the contents of that cell according to the following rules:
		- If the cell has no mines adjacent to it, it is revealed as an empty cell. Adjacent cells are revealed until all the revealed cells have at least one mine next to it. 
		- If a left-clicked cell has a mine adjacent to it, the cell is revealed with a number on it marking the number of adjacent cells that are mines
		- If a left-clicked cell is a mine, the cell is revealed as a mine and the game is lost
	- The game is won when all non-mine cells are revealed, or all mine cells are correctly marked with a flag
- Any open-source graphic library may be used to implement the game symbols. At a minimum, users must be able to distinguish between mines, flags, and cells in unrevealed, revealed-empty, and revealed-numbered state.

## Notes

- An example implementation may be viewed [here](http://minesweeperonline.com/)
- Don't worry about annotations to your own code. The only documentation required (other than citations for others' code) is instructions on how to start and access the application.
- You may use any additional frameworks or libraries you wish.
- You may reuse your own code from prior work.
- You may use code snippets from other authors but they must be annotated in comments, and they must not constitute wholesale copying (to be arbitrated by Geosite engineers)

## Evaluation Criteria

- Functionality: Are all functional requirements met?
- Ease of Use: Can I just `docker-compose up` and have everything working? If environment variables or settings must be defined, are they sufficiently explained/documented?
- Idiomatics: Do you follow React.js code conventions and avoid anti-patterns?
# minesweeper
# minesweeper
