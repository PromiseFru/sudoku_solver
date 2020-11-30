function solve(bosard) {
    // check if board is solved
    if (solved(board)) {
        return board
    } else {
        const posibilities = nextBoards(boards);
        const validBoard = keepOnlyValid(posibilities);
    }
}