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

  boardParser(puzzleString) {
    var board = [];
    var i, j;
    var k = 0;

    for (i = 0; i < 81; i += 9) {
      var boardRow = [];
      for (j = 0; j < 9; j++) {
        boardRow.push(puzzleString.charAt(i + j));
      }
      board.push(boardRow)
    }

    console.log(board);
    return board;
  }

  getDot(puzzleString) {
    var board = this.boardParser(puzzleString);
    var i, j;

    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {
        if (board[i][j] == ".") {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  }

  checkRowPlacement(puzzleString, row, column, value) {
    var board = this.boardParser(puzzleString);

    var i;
    for (i = 0; i < 9; i++) {
      if (board[row][i] == value) {
        // console.log(false);
        return {
          valid: false
        };
      }
    }
    // console.log(true);
    return {
      valid: true
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    var i;
    var board = this.boardParser(puzzleString);

    for (i = 0; i < 9; i++) {
      if (board[i][column] == value) {
        // console.log(false)
        return {
          valid: false
        }
      }
    }
    // console.log(true)
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    var board = this.boardParser(puzzleString);
    var i, j;
    var regRow = Math.floor(row / 3) * 3;
    var regCol = Math.floor(col / 3) * 3;

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (board[regRow + i][regCol + j] == value) {
          // console.log(false)
          return {
            valid: false
          }
        }
      }
    }
    // console.log(true);
    return {
      valid: true
    }
  }

  checkvalue(puzzleString, row, column, value) {
    if (this.checkRowPlacement(puzzleString, row, column, value).valid && this.checkColPlacement(puzzleString, row, column, value).valid && this.checkRegionPlacement(puzzleString, row, column, value).valid) {
      return true;
    }
    return false;
  }

  solve(puzzleString) {

  }
}

const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
const row = 0;
const col = 1;
const value = 7;

new SudokuSolver().checkRowPlacement(input, row, col, value);
new SudokuSolver().checkColPlacement(input, row, col, value)
new SudokuSolver().checkRegionPlacement(input, row, col, value)
new SudokuSolver().boardParser(input);


module.exports = SudokuSolver;