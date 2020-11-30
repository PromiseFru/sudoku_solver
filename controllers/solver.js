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