const TurnTracker = require('./TurnTracker');

class TTTBoard {
  constructor() {
    this.board = [new Array(3).fill('-'), new Array(3).fill('-'), new Array(3).fill('-')];
    this.turn = new TurnTracker();
    this.showBoard();
    this.remindTurn();
  }

  placeMarker(row, col) {
    this.board[row - 1][col - 1] = this.turn.player;
    this.turn.change();
    console.clear();
    this.showBoard();
    this.remindTurn();
  }

  remindTurn() {
    console.log(
      `PLAYER ${this.turn.player}'s turn. Enter row and col separated by comma.(i.e.: 1,2)`,
    );
  }

  showBoard() {
    console.log(this.board.map(row => row.join(' | ')).join('\n'));
  }

  reset() {
    this.board = [new Array(3).fill('-'), new Array(3).fill('-'), new Array(3).fill('-')];
    this.turn.reset();
  }

  get winner() {
    // returns false or the winner;
    return this.checkWinnerHorizontal() || this.checkWinnerVertical() || this.checkWinnerDiagonal();
  }

  checkWinnerHorizontal() {
    const { board } = this;
    for (let row = 0; row < 3; row++) {
      const firstInCol = board[row][0];
      for (let col = 1; col < 3; col++) {
        if (board[row][col] === '-') break;
        if (board[row][col] !== firstInCol) break;
        if (col === 2) {
          return firstInCol;
        }
      }
    }
    return false;
  }

  checkWinnerVertical() {
    const { board } = this;
    if (board[0][0] === board[1][0] && board[2][0] === board[0][0] && board[0][0] !== '-') return board[0][0];
    if (board[0][1] === board[1][1] && board[2][1] === board[0][1] && board[0][1] !== '-') return board[0][1];
    if (board[0][2] === board[1][2] && board[2][2] === board[0][2] && board[0][2] !== '-') return board[0][2];
    return false;
  }

  checkWinnerDiagonal() {
    const { board } = this;
    if (board[0][0] === board[1][1] && board[2][2] === board[0][0] && board[0][0] !== '-') return board[0][0];
    if (board[0][2] === board[1][1] && board[2][0] === board[0][2] && board[0][2] !== '-') return board[0][1];
    return false;
  }
}

module.exports = TTTBoard;
