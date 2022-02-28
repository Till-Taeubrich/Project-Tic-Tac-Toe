const gameboard = (function(){
  let gameboard = ['','','','','','','','',''];
  const squares = Array.from(document.querySelectorAll('.squares'));
  const _startGameButton = document.querySelector('.startGameButton');
  const _restartGameButton = document.querySelector('.restartGameButton');
  const _preGameScreen = document.querySelector('.preGame');
  const _gameboardScreen = document.querySelector('.gameboardScreen')

  
  function loadGameScreen(){
    _preGameScreen.classList.add('hidden');
    _gameboardScreen.classList.remove('hidden');
    players.updatePlayerNames()
  }
  
  function updateGameboardContent(i, value) {
    gameboard[i] = value;
    squares[i].textContent = gameboard[i]
  }
  function resetGameboard(){
    for (let i = 0; i < squares.length; i++) {
      gameboard[i] = '';
      squares[i].textContent = '';
    }
  console.log(gameboard);

  }
  
  // EventListener
  _startGameButton.addEventListener('click', loadGameScreen);
  _restartGameButton.addEventListener('click', () => {
    game.resetRound();
  })

  return {
    gameboard: gameboard,
    squares: squares,
    updateGameboardContent: updateGameboardContent,
    resetGameboard: resetGameboard,
  }
})();

const game = (function(){
  let currentPlayerSymbol = 'X';
  let roundCounter = 0;
  
  function updateGameboardData(e){
    if (e.target.textContent === ''){
      const indexSquare = Array.prototype.indexOf.call(gameboard.squares, e.target);
      gameboard.updateGameboardContent(indexSquare, currentPlayerSymbol);
      roundCounter++;
      checkForRoundEnd();
      _changePlayer();
      } else return
  }

  function checkForRoundEnd(){
    // pairs
    const _firstRow = [gameboard.gameboard[0], gameboard.gameboard[1], gameboard.gameboard[2]];
    const _secondRow = [gameboard.gameboard[3], gameboard.gameboard[4], gameboard.gameboard[5]];
    const _thirdRow = [gameboard.gameboard[6], gameboard.gameboard[7], gameboard.gameboard[8]];
    // Columns
    const _firstColumn = [gameboard.gameboard[0], gameboard.gameboard[3], gameboard.gameboard[6]];
    const _secondColumn = [gameboard.gameboard[1], gameboard.gameboard[4], gameboard.gameboard[7]];
    const _thirdColumn = [gameboard.gameboard[2], gameboard.gameboard[5], gameboard.gameboard[8]];
    // Diagonals
    const _TopLeftToBottomRight = [gameboard.gameboard[0], gameboard.gameboard[4], gameboard.gameboard[8]];
    const _TopRightToBottomLeft = [gameboard.gameboard[2], gameboard.gameboard[4], gameboard.gameboard[6]];
    
    _checkForThreeInLine(_firstRow);
    _checkForThreeInLine(_secondRow);
    _checkForThreeInLine(_thirdRow);
    
    _checkForThreeInLine(_firstColumn);
    _checkForThreeInLine(_secondColumn);
    _checkForThreeInLine(_thirdColumn);
    
    _checkForThreeInLine(_TopLeftToBottomRight);
    _checkForThreeInLine(_TopRightToBottomLeft);
  }
    
  function _checkForThreeInLine(pair){
      if (pair.every(field => field === 'X')){
        _playerOneWon()
      }
      if (pair.every(field => field === 'O')){
        _playerTwoWon()
      }else if (roundCounter === 9){
        _draw()
      }
  }
    
  function _changePlayer(){
  
      if (currentPlayerSymbol === 'X') {
        currentPlayerSymbol = 'O'
      } else {
        currentPlayerSymbol = 'X'
      };
  }

  function _playerOneWon(){
    alert(`${players.playerOne.name} won.`);
    players.playerOne.roundsWon++;
    _changePlayer();
    resetRound();
  }
  
  function _playerTwoWon(){
    alert(`${players.playerTwo.name} won.`);
    players.playerTwo.roundsWon++;
    resetRound();
  }

  function _draw(){
    alert('Draw');
    resetRound();
  }

  function resetRound() {
    gameboard.resetGameboard();
    roundCounter = 0;
  }


  // EventListeners
  gameboard.squares.forEach((square) => {
    square.addEventListener('click', (e) => {
      updateGameboardData(e)
    })
  });

  return {
    resetRound: resetRound,
  }

})();

const players = (function(){
  const playerOne = { 
  roundsWon : 0,
  }

  const playerTwo = {
  roundsWon : 0,
  }

  function updatePlayerNames(){
    playerOne.name = document.querySelector('#playerOneName').value;
    playerTwo.name = document.querySelector('#playerTwoName').value;
  }

  return{
    playerOne: playerOne,
    playerTwo: playerTwo,
    updatePlayerNames: updatePlayerNames,
  }
})();
