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
const game = (function(){
})


// -----------------------playerFactory
function player (name){
  let roundsWon = 0;
  return {name, roundsWon};
}