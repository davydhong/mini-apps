const TTTBoard = require('./TTTBoard');

console.clear();

const game = new TTTBoard();

process.stdin.on('data', (chunk) => {
  console.clear();
  const inputLocation = chunk.toString().trim();
  const isValid = /^[1-3],[1-3]$/.test(inputLocation);

  if (isValid) {
    // change board
    const rowColFromInput = inputLocation
      .split('')
      .map(cell => parseInt(cell, 10))
      .filter(num => !isNaN(num));
    game.placeMarker(...rowColFromInput);
  } else {
    console.clear();
    game.showBoard();
    console.log('input valid location. format: 1,2');
  }
  // TODO: check winner
  if (game.winner) {
    console.log(`${game.turn.otherPlayer} WON!!!`);
    process.exit();
  }
  // if there is show winner and exit
});

process.stdin.on('end', () => {
  process.exit();
});
