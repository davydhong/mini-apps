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
}

module.exports = TTTBoard;
