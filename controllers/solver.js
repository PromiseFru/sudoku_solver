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

