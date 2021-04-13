import { isKingAbleToEat, kingEatingMoves } from "./kingLogic";

export const isAbleToEat = (board, fromRow, fromColumn, endRow, endColumn) => {
    if (
        board.pieces[fromRow][fromColumn].isKing &&
        isKingAbleToEat(board, fromRow, fromColumn, endRow, endColumn)
    ) {
        return true;
    }
    let finalSquare;
    let middleSquare;
    if (endRow < 0 || endRow > 7 || endColumn < 0 || endColumn > 7)
        return false;
    if (endColumn - fromColumn !== -2 && endColumn - fromColumn !== 2)
        return false;
    let differenceRow = board.isWhite ? -2 : 2;
    if (endRow - fromRow !== differenceRow) return false;
    let middleRow = board.isWhite ? fromRow - 1 : fromRow + 1;
    let middleColumn =
        endColumn - fromColumn > 0 ? endColumn - 1 : endColumn + 1;
    finalSquare = board.pieces[endRow][endColumn];
    middleSquare = board.pieces[middleRow][middleColumn];
    if (finalSquare !== null) return false;
    if (middleSquare == null) return false;
    if (middleSquare.isWhite === board.isWhite) return false;
    return true;
};

export const pieceEatMoves = (board, row, column) => {
    if (!!board.pieces[row][column] && board.pieces[row][column].isKing) {
        return kingEatingMoves(board, row, column);
    }
    const validMoves = [];
    let eatRow = board.isWhite ? -2 : 2;
    if (isAbleToEat(board, row, column, row + eatRow, column - 2)) {
        validMoves.push({ row: row + eatRow, column: column - 2 });
    }

    if (isAbleToEat(board, row, column, row + eatRow, column + 2)) {
        validMoves.push({ row: row + eatRow, column: column + 2 });
    }

    return validMoves;
};

export const pieceValidMoves = (board, row, column) => {
    const validMoves = [];
    if (pieceEatMoves(board, row, column).length > 0) return [];
    let endRow = board.isWhite ? row - 1 : row + 1;
    if (isValidMove(board, row, column, endRow, column + 1))
        validMoves.push({ row: endRow, column: column + 1 });
    if (isValidMove(board, row, column, endRow, column - 1))
        validMoves.push({ row: endRow, column: column - 1 });
    return validMoves;
};

export const isValidMove = (board, fromRow, fromColumn, endRow, endColumn) => {
    if (endRow < 0 || endRow > 7 || endColumn < 0 || endColumn > 7)
        return false;
    let differenceRow = board.isWhite ? -1 : 1;
    if (
        endRow === fromRow + differenceRow &&
        (endColumn === fromColumn - 1 || endColumn === fromColumn + 1)
    )
        if (board.pieces[endRow][endColumn] === null) return true;
    return false;
};
