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
    var i, j;

    for (i = 0; i < 81; i += 9) {
      var text = "";
      for (j = 0; j < 9; j++) {
        text += puzzleString.charAt(i + j);
      }
      rowArr.push(text)
    }

    var search = rowArr[row].indexOf(value);
    if (search != -1) return {
      valid: false,
      conflict: ["row"]
    };
    return {
      valid: true
    };
  }

  checkColPlacement(puzzleString, row, column, value) {
    var colArr = [];
    var i, j;

    for (i = 0; i < 9; i++) {
      var text = "";
      for (j = 0; j < 81; j += 9) {
        text += puzzleString.charAt(i + j);
      }
      colArr.push(text)
    }

    var search = colArr[column].indexOf(value);
    if (search != -1) return {
      valid: false,
      conflict: ["column"]
    };
    return {
      valid: true
    };
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    var reg1 = []
    var reg2 = []
    var reg3 = [];
    var i, j, k;

    for (i = 0; i < 9; i += 3) {
      var text = "";
      for (j = 0; j < 27; j += 9) {
        for (k = 0; k < 3; k++) {
          text += puzzleString.charAt(i + j + k);
        }
      }
      reg1.push(text)
    }

    for (i = 27; i < 36; i += 3) {
      var text = "";
      for (j = 0; j < 27; j += 9) {
        for (k = 0; k < 3; k++) {
          text += puzzleString.charAt(i + j + k);
        }
      }
      reg2.push(text)
    }

    for (i = 54; i < 63; i += 3) {
      var text = "";
      for (j = 0; j < 27; j += 9) {
        for (k = 0; k < 3; k++) {
          text += puzzleString.charAt(i + j + k);
        }
      }
      reg3.push(text)
    }

    var regArr = reg1.concat(reg2, reg3);

    if (row >= 0 && row <= 2 && column >= 0 && column <= 2) {
      var search = regArr[0].indexOf(value);
    }
    if (row >= 0 && row <= 2 && column >= 3 && column <= 5) {
      var search = regArr[1].indexOf(value);
    }
    if (row >= 0 && row <= 2 && column >= 6 && column <= 8) {
      var search = regArr[2].indexOf(value);
    }
    if (row >= 3 && row <= 5 && column >= 0 && column <= 2) {
      var search = regArr[3].indexOf(value);
    }
    if (row >= 3 && row <= 5 && column >= 3 && column <= 5) {
      var search = regArr[4].indexOf(value);
    }
    if (row >= 3 && row <= 5 && column >= 6 && column <= 8) {
      var search = regArr[5].indexOf(value);
    }
    if (row >= 6 && row <= 8 && column >= 0 && column <= 2) {
      var search = regArr[6].indexOf(value);
    }
    if (row >= 6 && row <= 8 && column >= 3 && column <= 5) {
      var search = regArr[7].indexOf(value);
    }
    if (row >= 6 && row <= 8 && column >= 6 && column <= 8) {
      var search = regArr[8].indexOf(value);
    }

    console.log(search);
    if (search != -1) return {
      valid: false,
      conflict: ["region"]
    };
    return {
      valid: true
    };
  }

  solve(puzzleString) {

  }
}

const input = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
const row = 1;
const col = 1;
const value = 3;

new SudokuSolver().checkRowPlacement(input, row, col, value);
new SudokuSolver().checkColPlacement(input, row, col, value)
new SudokuSolver().checkRegionPlacement(input, row, col, value)


module.exports = SudokuSolver;