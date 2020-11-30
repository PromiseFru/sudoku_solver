function solve(boards) {
    // check if board is solved
    if (solved(board)) {
        return board
    } else {
        const posibilities = nextBoards(boards);
        const validBoards = keepOnlyValid(posibilities);
        return searchForSolution(validBoards);
    }
}

function searchForSolution(boards) {
    if (boards < 1) {
        return false
    } else {
        // Backtraking search for solution
        var firstBoard = boards.shift();
        const trypath = solve(firstBoard);
        if (trypath != false) {
            return trypath
        } else {
            return searchForSolution(boards)
        }
    }
}

function solved(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] == ".") {
                return false;
            }
        }
    }
    return true;
}

function nextBoards(board) {
    var res = [];
    const firstEmpty = findEmptySquare(board);
    if (firstEmpty != undefined) {
        const y = firstEmpty[0];
        const x = firstEmpty[1];
        for (var i = 1; i <= 9; i++) {
            var newBoard = [...board];
            var row = [...newBoard[y]]
            row[x] = i;
            newBoard[y] = row;
            res.push(newBoard);
        }
    }
    return res;
}

function firstEmptySquare(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] == ".") {
                return [i, j];
            }
        }
    }
}

function keepOnlyValid(boards) {
    return boards.filter(b => validBoard(b))
}

function validBoard(board) {
    return checkRowPlacement(board).valid && checkColPlacement(board).valid && checkRegionPlacement(board).valid;
}

function checkRowPlacement(board, row, value) {
    for (var i = 0; i < 9; i++) {
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

function checkColPlacement(board, column, value) {
    for (var i = 0; i < 9; i++) {
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

function checkRegionPlacement(board, row, column, value) {
    var regRow = Math.floor(row / 3) * 3;
    var regCol = Math.floor(column / 3) * 3;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
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