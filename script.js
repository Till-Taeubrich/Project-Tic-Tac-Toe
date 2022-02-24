// -----------------------gameboardModule
const gameboard = (function(){
  
  const boardContent = ['X','X','X','X','X','X','O','O','O',];
  
  (function _setGameboard(boardContent){
    const gameboard = document.querySelector('.gameboard');

    for (let i = 0; i < boardContent.length; i++) {
      const square = document.createElement('div');
      square.classList.add('squares');
      gameboard.append(square);
    }
  })(boardContent);

  function updateBoardContent(boardContent){
    const squares = document.querySelectorAll('.squares')
    const squaresArray = Array.from(squares)

    for (let i = 0; i < squaresArray.length; i++) {
      squaresArray[i].innerHTML = boardContent[i];
    }
  }

    return{
      boardContent: boardContent,
      updateBoardContent: updateBoardContent,
    }
  })();
  
  // gameboard.updateBoardContent(gameboard.boardContent);
  
// -----------------------gameModule
// const game = (function(){
// })


// -----------------------playerModule
const players = (function (){

  function _playerFactory (name, playerNumber){
    const roundsWon = 0;
    return {name, playerNumber, roundsWon};
  };

  const playerOne = _playerFactory('pete', 1)
  const playerTwo = _playerFactory('robin', 2)

  return {
    playerOne: playerOne,
    playerTwo: playerTwo,
  }
})();
