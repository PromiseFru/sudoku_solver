class SudokuSolver {

  validate(puzzleString) {
    var check = puzzleString.match(/[^1-9.]/g);
    var stringLength = puzzleString.length

    if (check) return {
      error: 'Invalid characters in puzzle'
    };
    if (stringLength > 81 || stringLength < 81) return {
      error: 'Expected puzzle to be 81 characters long'
    };
    return puzzleString;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    var rowArr = [];
    var i,j;

    for(i = 0; i < 81; i+=9) {
      var text = "";
      for(j = 0; j < 9; j++) {
        text += puzzleString.charAt(i+j);
      }
      rowArr.push(text)
    }

    console.log(rowArr)
    // if (search != -1) return {
    //   valid: false,
    //   conflict: ["row"]
    // };
    // return {
    //   valid: true
    // };
  }

  checkColPlacement(puzzleString, row, column, value) {
    var puzzleRow = puzzleString.match(/.{9}/g);
    var puzzleCol;
    puzzleRow.forEach(ele => puzzleCol = ele.match(/.{1}/g));

    console.log(puzzleCol);
  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {

  }
}

const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
const row = 0;
const col = 0;
const value = 9;

new SudokuSolver().checkRowPlacement(input, row, col, value)

module.exports = SudokuSolver;