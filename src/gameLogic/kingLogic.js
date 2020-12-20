

export const isKingValidMove=(board,fromRow,fromColumn,endRow,endColumn)=>{
    // if (this.PiecesToEat(board).length>0){
    //     if (this.IsAbleToEat(board,endRow,endColumn)) 
    //         return true
    //     else
    //         return false
    // }
    let changeRow=endRow-fromRow>0?1:-1
    let changeColumn=endColumn-fromColumn>0?1:-1
    let row = endRow
    let column = endColumn
    while (row!==fromRow&&column!=changeColumn){
            if (board.pieces[row][column]!==null)
                return false
        row-=changeRow
        column-=changeColumn
    }
    return true       
}
export const isKingAbleToEat=(board,fromRow,fromColumn,endRow,endColumn)=>{
    // if (endRow==null || endColumn==null){
    //     if (this.PiecesToEat(board).length>0)
    //         return true
    //     return false
    // }
    let eatenPieceRow=endRow-fromRow>0?endRow-1:endRow+1
    let eatenPieceColumn=endColumn-fromColumn>0?endColumn-1:endColumn+1
    if (eatenPieceColumn<0||eatenPieceColumn>7||eatenPieceRow<0||eatenPieceRow>7)
        return false
    let eatenPiece = board.pieces[eatenPieceRow][eatenPieceColumn];
    let changeRow = endRow-fromRow>0?1:-1
    let changeColumn = endColumn-fromColumn>0?1:-1
    if (eatenPiece==null || board.pieces[endRow][endColumn]!==null)
        return false
    if (eatenPiece.isWhite===board.isWhite)
        return false
    let row = fromRow+changeRow
    let column = fromColumn+changeColumn
    if (row<0||row>7||column<0||column>7)
        return false
    while (row!==eatenPieceRow&&column!=eatenPieceColumn){
        if (board.pieces[row][column]!==null)
            return false
        row+=changeRow
        column+=changeColumn
        if (row<0||row>7||column<0||column>7)
            return false
    }
    if (row===eatenPieceRow&& column===eatenPieceColumn)
        return true
    return false
}

export const kingValidMoves = (board,fromRow,fromColumn)=>{
    let moves=[]
    validMovesInDiagonal(board,moves,fromRow,fromColumn,fromRow+1,fromColumn+1,+1,+1)
    validMovesInDiagonal(board,moves,fromRow,fromColumn,fromRow-1,fromColumn+1,-1,+1)
    validMovesInDiagonal(board,moves,fromRow,fromColumn,fromRow+1,fromColumn-1,+1,-1)
    validMovesInDiagonal(board,moves,fromRow,fromColumn,fromRow-1,fromColumn-1,-1,-1)
    return moves
}

export const validMovesInDiagonal = (board,moves,fromRow,fromColumn,row,column,changeRow,changeColumn)=>{
    while (row>=0 && row<8 && column >=0 && column < 8)
    {
        if (isKingValidMove(board,fromRow,fromColumn,row,column))
            moves.push({row,column})
        else
            return
        row+=changeRow;
        column+=changeColumn;
    }
}

export const kingEatingMoves = (board,fromRow,fromColumn)=>{
    let pieces=[]
    for (let row=0;row<8;row++)
        for (let column=0;column<8;column++){
            if (board.pieces[row][column]===undefined)
                continue
            if (isKingAbleToEat(board,fromRow,fromColumn,row,column))
                pieces.push({row,column})
        }
    return pieces
}


// class Queen extends Piece{
//     constructor(row,column,isWhite){
//         super(row,column,isWhite)
//         this.IsQueen = true
//     }
//     IsAbleToMove = function(board){
//         for (let row=0;row<8;row++){
//             for (let column=0;column<8;column++){
//                 if (this.IsValidMove(board,row,column))
//                     return true
//             }
//         }
//         return false
//     }

// }