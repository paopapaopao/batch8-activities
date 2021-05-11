/**
 * DOM Nodes/Elements
 */
let board = document.querySelectorAll("#board > button");
let info = document.querySelector("#info");
let reset = document.querySelector("#reset");
let previous = document.querySelector("#previous");
let next = document.querySelector("#next");

/**
 * Constants
 */
const BOARD_SIZE = 3;
const MAX_MOVES = 9;
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
const X = "X";
const O = "O";
const X_TURN = `Player ${X}'s Turn`;
const O_TURN = `Player ${O}'s Turn`;
const X_WINNER = `Player ${X} Won!`;
const O_WINNER = `Player ${O} Won!`;
const DRAW = "It's a draw!";

/**
 * Variables
 */
let history = [
	[
		["", "", ""],
		["", "", ""],
		["", "", ""]
	]
];
let move = 0;
let turn = X;
let currentMove;
let winningCombinations;
let scoreX = 0;
let scoreO = 0;
let draws = 0;
let games = 0;

/**
 * Checks the board if there is a winner.
 * @returns The winning combination(s).
 */
function getWinningCombinations() {
	return (WINNING_COMBINATIONS.filter(combination =>
		combination.every(index =>
			history[move][Math.floor(index / BOARD_SIZE)][index % BOARD_SIZE] == turn
		) ? combination : null
	));
}

/**
 * Highlights the winning combination(s).
 * @param {string} color The color used for highlighting.
 */
function highlightWinningCombinations(color) {
	winningCombinations.forEach(function(combination) {
		combination.forEach(function(index) {
			board[index].style.backgroundColor = color;
		});
	});
}

/**
 * Updates some variables and DOM nodes/elements.
 * @param {string} result The result of the game.
 */
function gameOver(result) {
	//update some game-over variables
	currentMove = move;
	games++;

	//show the stats
	document.querySelector("#scoreX").innerText = scoreX;
	document.querySelector("#scoreO").innerText = scoreO;
	document.querySelector("#draws").innerText = draws;
	document.querySelector("#games").innerText = games;

	//show the result
	info.innerText = result;

	//highlight the winning combination(s)
	highlightWinningCombinations("green");

	//enable the previous button, disable the next button
	previous.disabled = false;
	next.disabled = true;
	//show the game-over buttons
	previous.style.visibility = "visible";
	next.style.visibility = "visible";
}

/**
 * Shows a move on the board.
 */
function showMove() {
	for (let row = 0; row < BOARD_SIZE; row++) {
		for (let col = 0; col < BOARD_SIZE; col++) {
			board[BOARD_SIZE * row + col].innerText = history[currentMove][row][col];
		}
	}
}

board.forEach(function(button) {
	button.onclick = function() {
		//place the move on the board
		this.innerText = turn;
		this.disabled = true;

		//save the move in the moves history
		move++;
		let newMove = [];
		for (let row = 0; row < BOARD_SIZE; row++) {
			let newMoveRow = [];
			for (let col = 0; col < BOARD_SIZE; col++) {
				newMoveRow.push(board[BOARD_SIZE * row + col].innerText);
			}
			newMove.push(newMoveRow);
		}
		history.push(newMove);

		//get the winning combination(s)
		winningCombinations = getWinningCombinations();
		//if there is a winner
		if (winningCombinations.length) {
			//disable the board
			board.forEach(function(button) {
				button.disabled = true;
			});

			//update the score
			(turn == X) ? scoreX++ : scoreO++;
			gameOver((turn == X) ? X_WINNER : O_WINNER);

			return;
		}
		//if there is no winner and the maximum # of moves is reached
		if (!winningCombinations.length && move == MAX_MOVES) {
			//update the draws
			draws++;
			gameOver(DRAW);

			return;
		}

		//update the next turn
		turn = ((games + move) % 2 == 0) ? X : O;

		//show whose turn it is
		info.innerText = (turn == X) ? X_TURN : O_TURN;
	};
});

reset.onclick = function() {
	//reset the in-game variables
	for (let i = 0; i < move; i++) {
		history.pop();
	}
	move = 0;
	turn = ((games + move) % 2 == 0) ? X : O;

	//show whose turn it is
	info.innerText = (turn == X) ? X_TURN : O_TURN;

	//reset the board
	board.forEach(function(button) {
		button.innerText = "";
		button.disabled = false;
		button.style.backgroundColor = "";
	});

	//hide the game-over buttons
	previous.style.visibility = "hidden";
	next.style.visibility = "hidden";
};

previous.onclick = function() {
	//show the previous move on the board
	currentMove--;
	showMove();

	//if the initial state of the board (no moves) is shown
	if (currentMove == 0) {
		//disable the previous button
		this.disabled = true;
	}
	//if the final state of the board (last move) is not shown
	if (currentMove < move) {
		//highlight the winning combination(s)
		highlightWinningCombinations("black");

		//enable the next button
		next.disabled = false;
	}
};

next.onclick = function() {
	//show the next move on the board
	currentMove++;
	showMove();

	//if the final state of the board (last move) is shown
	if (currentMove == move) {
		//highlight the winning combination(s)
		highlightWinningCombinations("green");

		//disable the next button
		this.disabled = true;
	}
	//if the initial state of the board (no moves) is not shown
	if (currentMove > 0) {
		//enable the previous button
		previous.disabled = false;
	}
};