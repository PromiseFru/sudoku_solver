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
    var puzzleArr = puzzleString.match(/.{9}/g);

    var search = puzzleArr[row].indexOf(value)
    if (search != -1) return {
      valid: false,
      conflict: ["row"]
    };
    return {
      valid: true
    };
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;