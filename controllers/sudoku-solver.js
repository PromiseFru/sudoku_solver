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

    // console.log(board);
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
        // console.log("row check false");
        return {
          valid: false
        };
      }
    }
    // console.log("row check true");
    return {
      valid: true
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    var i;
    var board = this.boardParser(puzzleString);

    for (i = 0; i < 9; i++) {
      if (board[i][column] == value) {
        // console.log("col check false")
        return {
          valid: false
        }
      }
    }
    // console.log("col check true")
    return {
      valid: true
    };
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    var board = this.boardParser(puzzleString);
    var i, j;
    var regRow = Math.floor(row / 3) * 3;
    var regCol = Math.floor(column / 3) * 3;

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (board[regRow + i][regCol + j] == value) {
          // console.log("reg check false")
          return {
            valid: false
          }
        }
      }
    }
    // console.log("reg check true");
    return {
      valid: true
    }
  }

  checkvalue(puzzleString, row, column, value) {
    var rowCheck = this.checkRowPlacement(puzzleString, row, column, value).valid
    var colCheck = this.checkColPlacement(puzzleString, row, column, value).valid
    var regCheck = this.checkRegionPlacement(puzzleString, row, column, value).valid
    // console.log(rowCheck, colCheck, regCheck);

    if (rowCheck && colCheck && regCheck) {
      // console.log(true)
      return true;
    }
    // console.log(false)
    return false;
  }

  stringifyBoard(board) {
    var string = ""
    var i, j;

    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {
        string += board[i][j];
      }
    }

    console.log(string);
    return string;
  }

  solve(puzzleString) {
    var board = this.boardParser(puzzleString)
    var boardString;
    var emptySpot = this.getDot(puzzleString);
    var row = emptySpot[0];
    var column = emptySpot[1];
    var i;

    if (row == -1) {
      return boardString
    }

    for (i = 1; i <= 9; i++) {
      if (this.checkvalue(puzzleString, row, column, i)) {
        board[row][column] = i;
        boardString = this.stringifyBoard(board);
        this.solve(boardString);
      }
    }

    if (row != -1) {
      board[row][column] = ".";
    }

    console.log(boardString);
    return boardString;
  }
}

const input = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
const row = 1;
const col = 0;
const value = 3;

// new SudokuSolver().checkRowPlacement(input, row, col, value);
// new SudokuSolver().checkColPlacement(input, row, col, value)
// new SudokuSolver().checkRegionPlacement(input, row, col, value)
// new SudokuSolver().boardParser(input);
new SudokuSolver().solve(input);
// new SudokuSolver().checkvalue(input, row, col, value)


module.exports = SudokuSolver;