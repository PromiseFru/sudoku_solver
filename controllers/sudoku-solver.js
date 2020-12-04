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

  getDot(board) {
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

  checkRowPlacement(board, row, value) {
    var i;
    for (i = 0; i < 9; i++) {
      if (board[row][i] == value) {
        // console.log("row check false");
        return {
          valid: false,
          conflict: 'row'
        };
      }
    }
    // console.log("row check true");
    return {
      valid: true
    }
  }

  checkColPlacement(board, column, value) {
    var i;

    for (i = 0; i < 9; i++) {
      if (board[i][column] == value) {
        // console.log("col check false")
        return {
          valid: false,
          conflict: 'column'
        }
      }
    }
    // console.log("col check true")
    return {
      valid: true
    };
  }

  checkRegionPlacement(board, row, column, value) {
    var i, j;
    var regRow = Math.floor(row / 3) * 3;
    var regCol = Math.floor(column / 3) * 3;

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (board[regRow + i][regCol + j] == value) {
          // console.log("reg check false")
          return {
            valid: false,
            conflict: 'region'
          }
        }
      }
    }
    // console.log("reg check true");
    return {
      valid: true
    }
  }

  checkvalue(board, row, column, value) {
    var rowCheck = this.checkRowPlacement(board, row, value).valid
    var colCheck = this.checkColPlacement(board, column, value).valid
    var regCheck = this.checkRegionPlacement(board, row, column, value).valid
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

    // console.log(string);
    return string;
  }

  // if no more empty spaces on board return true
  solved(board) {
    if (this.getDot(board)[0] == -1) {
      return true
    }
    return false
  }

  solve(puzzleString) {
    var board = this.boardParser(puzzleString)
    var emptySpot = this.getDot(board);
    var row = emptySpot[0];
    var column = emptySpot[1];

    // check if solved function returns true then return solved board
    if (this.solved(board)) {
      // check if solution string is valid
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          var temp = board[i][j];
          board[i][j] = "."
          if (!this.checkvalue(board, i, j, temp)) {
            return {
              error: 'Puzzle cannot be solved'
            };
          }
          board[i][j] = temp;
        }
      }
      return puzzleString;
    }

    for (var i = 1; i <= 9; i++) {
      if (this.checkvalue(board, row, column, i)) {
        board[row][column] = i;
        var boardString = this.stringifyBoard(board);
        var result = this.solve(boardString);

        //  Check for full board at every recursion
        if (!result.error) {
          return result;
        }
      }
    }

    return {
      error: 'Puzzle cannot be solved'
    };
  }
}

const input = '5...1372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
const row = 0;
const col = 0;
const value = 5;

// console.log(new SudokuSolver().checkRowPlacement(input, row, col, value));
// new SudokuSolver().checkColPlacement(input, row, col, value)
// new SudokuSolver().checkRegionPlacement(input, row, col, value)
// new SudokuSolver().boardParser(input);
// console.log(new SudokuSolver().solve(input));
// new SudokuSolver().checkvalue(input, row, col, value)


module.exports = SudokuSolver;