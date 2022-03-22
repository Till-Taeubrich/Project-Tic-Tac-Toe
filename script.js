const gameboard = (function () {
	let gameboard = ['', '', '', '', '', '', '', '', ''];
	const playerOneIndicator = document.querySelector('.player-one-indicator');
	const playerTwoIndicator = document.querySelector('.player-two-indicator');
	const squares = Array.from(document.querySelectorAll('.squares'));
	const _startGameButton = document.querySelector('.start-game-button');
	const _restartGameButton = document.querySelector('.restart-game-button');
	const _preGameScreen = document.querySelector('.pre-game');
	const _gameboardScreen = document.querySelector('.gameboard-screen');
	const _playerOneName = document.querySelector('.player-one-name');
	const _playerTwoName = document.querySelector('.player-two-name');
	const _playerOneCounter = document.querySelector('.player-one-counter');
	const _playerTwoCounter = document.querySelector('.player-two-counter');
	const winnerAnnouncementOne = document.querySelector('.winner-announcement-one');
	const winnerAnnouncementTwo = document.querySelector('.winner-announcement-two');
	const drawAnnouncementOne = document.querySelector('.draw-announcement-one');
	const drawAnnouncementTwo = document.querySelector('.draw-announcement-two');

	function loadGameScreen() {
		_preGameScreen.classList.add('hidden');
		_startGameButton.classList.add('hidden');

		_gameboardScreen.classList.remove('hidden');
		_restartGameButton.classList.remove('hidden');
		_startGameButton.classList.add('hidden');
		playerOneIndicator.classList.add('turn');
		displayPlayerNames();

		_playerOneCounter.textContent = '0';
		_playerTwoCounter.textContent = '0';
	}

	function displayPlayerNames() {
		players.updatePlayerNames();
		_playerOneName.textContent = players.playerOne.name;
		_playerTwoName.textContent = players.playerTwo.name;
	}

	function addPointToWinner(winner) {
		winner.roundsWon++;

		if (winner.name === _playerOneName.textContent) {
			_playerOneCounter.textContent = winner.roundsWon;
		} else {
			_playerTwoCounter.textContent = winner.roundsWon;
		}
	}

	function updateGameboardContent(i, value) {
		gameboard[i] = value;
		squares[i].textContent = gameboard[i];
	}
	function resetGameboard() {
		for (let i = 0; i < squares.length; i++) {
			gameboard[i] = '';
			squares[i].textContent = '';
		}
	}

	function resetCounter() {
		players.playerOne.roundsWon = 0;
		_playerOneCounter.textContent = '0';
		players.playerTwo.roundsWon = 0;
		_playerTwoCounter.textContent = '0';
	}

	// EventListener
	_startGameButton.addEventListener('click', loadGameScreen);
	_restartGameButton.addEventListener('click', () => {
		game.resetGame();
	});

	return {
		gameboard: gameboard,
		squares: squares,
		updateGameboardContent: updateGameboardContent,
		resetGameboard: resetGameboard,
		playerOneIndicator: playerOneIndicator,
		playerTwoIndicator: playerTwoIndicator,
		addPointToWinner: addPointToWinner,
		resetCounter: resetCounter,
		winnerAnnouncementOne: winnerAnnouncementOne,
		winnerAnnouncementTwo: winnerAnnouncementTwo,
		drawAnnouncementOne: drawAnnouncementOne,
		drawAnnouncementTwo: drawAnnouncementTwo,
	};
})();

const game = (function () {
	let currentPlayerSymbol = 'X';
	let roundCounter = 0;

	function updateGameboardData(e) {
		if (e.target.textContent === '') {
			const indexSquare = Array.prototype.indexOf.call(gameboard.squares, e.target);
			gameboard.updateGameboardContent(indexSquare, currentPlayerSymbol);
			roundCounter++;
			checkForRoundEnd();
			_changePlayer();
		} else return;
	}

	function checkForRoundEnd() {
		// pairs
		const _firstRow = [gameboard.gameboard[0], gameboard.gameboard[1], gameboard.gameboard[2]];
		const _secondRow = [gameboard.gameboard[3], gameboard.gameboard[4], gameboard.gameboard[5]];
		const _thirdRow = [gameboard.gameboard[6], gameboard.gameboard[7], gameboard.gameboard[8]];
		// Columns
		const _firstColumn = [gameboard.gameboard[0], gameboard.gameboard[3], gameboard.gameboard[6]];
		const _secondColumn = [gameboard.gameboard[1], gameboard.gameboard[4], gameboard.gameboard[7]];
		const _thirdColumn = [gameboard.gameboard[2], gameboard.gameboard[5], gameboard.gameboard[8]];
		// Diagonals
		const _TopLeftToBottomRight = [
			gameboard.gameboard[0],
			gameboard.gameboard[4],
			gameboard.gameboard[8],
		];
		const _TopRightToBottomLeft = [
			gameboard.gameboard[2],
			gameboard.gameboard[4],
			gameboard.gameboard[6],
		];

		_checkForThreeInLine(_firstRow);
		_checkForThreeInLine(_secondRow);
		_checkForThreeInLine(_thirdRow);

		_checkForThreeInLine(_firstColumn);
		_checkForThreeInLine(_secondColumn);
		_checkForThreeInLine(_thirdColumn);

		_checkForThreeInLine(_TopLeftToBottomRight);
		_checkForThreeInLine(_TopRightToBottomLeft);
	}

	function _checkForThreeInLine(pair) {
		if (pair.every((field) => field === 'X')) {
			_playerOneWon();
			return;
		}
		if (pair.every((field) => field === 'O')) {
			_playerTwoWon();
			return;
		}
		if (roundCounter === 9) {
			_draw();
		}
	}

	function _changePlayer() {
		if (currentPlayerSymbol === 'X') {
			currentPlayerSymbol = 'O';
			gameboard.playerOneIndicator.classList.remove('turn');
			gameboard.playerTwoIndicator.classList.add('turn');
		} else {
			currentPlayerSymbol = 'X';
			gameboard.playerOneIndicator.classList.add('turn');
			gameboard.playerTwoIndicator.classList.remove('turn');
		}
	}

	function _resetPlayerTurn() {
		currentPlayerSymbol = 'X';
		if (gameboard.playerTwoIndicator.classList.contains('turn')) {
			gameboard.playerOneIndicator.classList.add('turn');
			gameboard.playerTwoIndicator.classList.remove('turn');
		}
	}

	function _playerOneWon() {
		gameboard.winnerAnnouncementOne.classList.toggle('off-screen');
		setTimeout(function () {
			gameboard.winnerAnnouncementOne.classList.toggle('off-screen');
			resetRound();
			_changePlayer();
		}, 1300);
		gameboard.addPointToWinner(players.playerOne);
	}

	function _playerTwoWon() {
		gameboard.winnerAnnouncementTwo.classList.toggle('off-screen');
		setTimeout(function () {
			gameboard.winnerAnnouncementTwo.classList.toggle('off-screen');
			_changePlayer();
			resetRound();
		}, 1300);
		gameboard.addPointToWinner(players.playerTwo);
	}

	function _draw() {
		gameboard.drawAnnouncementOne.classList.remove('off-screen');
		gameboard.drawAnnouncementTwo.classList.remove('off-screen');
		setTimeout(function () {
			gameboard.drawAnnouncementOne.classList.add('off-screen');
			gameboard.drawAnnouncementTwo.classList.add('off-screen');
			_changePlayer();
			resetRound();
		}, 1300);
	}

	function resetRound() {
		gameboard.resetGameboard();
		_resetPlayerTurn();
		roundCounter = 0;
	}

	function resetGame() {
		gameboard.resetGameboard();
		_resetPlayerTurn();
		gameboard.resetCounter();
		roundCounter = 0;
	}

	// EventListeners
	gameboard.squares.forEach((square) => {
		square.addEventListener('click', (e) => {
			updateGameboardData(e);
		});
	});

	return {
		resetRound: resetRound,
		resetGame: resetGame,
	};
})();

const players = (function () {
	const playerOne = {
		roundsWon: 0,
	};

	const playerTwo = {
		roundsWon: 0,
	};

	function updatePlayerNames() {
		playerOne.name = document.querySelector('.player-one-input').value;
		playerTwo.name = document.querySelector('.player-two-input').value;
	}

	return {
		playerOne: playerOne,
		playerTwo: playerTwo,
		updatePlayerNames: updatePlayerNames,
	};
})();
