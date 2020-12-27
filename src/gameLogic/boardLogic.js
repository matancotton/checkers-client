import { kingEatingMoves, kingValidMoves } from "./kingLogic"
import { isAbleToEat, pieceEatMoves, pieceValidMoves } from "./pieceLogic"

export const setBoard = (pieces)=>{
    for (let row=0; row<8;row++){
        pieces[row]=[]
        for (let column=0; column<8;column++){
            if (row>=0&&row<=2){
                if (row%2===0&&column%2===1 || row%2===1&&column%2===0)
                    pieces[row][column]= {row,column,isWhite: false, color: 'black-piece'}
                else
                    pieces[row][column] = undefined
            }
            else if (row>=5&&row<=7){
                if (row%2===0&&column%2===1 || row%2===1&&column%2===0)
                    pieces[row][column]={row, column, isWhite: true, color: 'white-piece'}
                else
                    pieces[row][column] = undefined
            }
            else
                if (row%2===0&&column%2===1 || row%2===1&&column%2===0)
                    pieces[row][column] = null
                else
                    pieces[row][column] = undefined
        }
    }

    return pieces
}

export const movePiece = (board,fromRow,fromColumn,toRow,toColumn)=>{
    if(board.pieces[fromRow][fromColumn]==null) {
        return board
    }
            
    if (isAbleToEat(board,fromRow,fromColumn,toRow,toColumn)){
        let pieceRow = toRow-fromRow>0?toRow-1:toRow+1
        let pieceColumn = toColumn-fromColumn>0?toColumn-1:toColumn+1
        board.pieces[pieceRow][pieceColumn] = null
    }
    if ((toRow===0 && board.isWhite || toRow===7) && !board.pieces[fromRow][fromColumn].isKing)
        board.pieces[fromRow][fromColumn] = {...board.pieces[fromRow][fromColumn], isKing: true, color:board.isWhite?'white-king':'black-king'}
    board.pieces[toRow][toColumn] = {row:toRow, column: toColumn, isWhite:board.pieces[fromRow][fromColumn].isWhite, color:board.pieces[fromRow][fromColumn].color, isKing: board.pieces[fromRow][fromColumn].isKing}
    board.pieces[fromRow][fromColumn] = null
    // if (isAbleToEat(board,toRow,toColumn)&&isEating){
    //     board.pieces[toRow][toColumn].MultipleEatings = true
    //     // this.mustEatPieces.push(pieces[toRow][toColumn])
    // }
    // else
    return {...board};
}

export const setMustEatPiecesList = (board,isWhite)=>{
    if (board.isWhite !== isWhite) {
        return []
    }
    let mustEatPieces = []
    for (let row=0;row<8;row++){
        for (let column=0;column<8;column++){
            if (board.pieces[row][column]==null)
                continue
            if (board.pieces[row][column].isWhite===isWhite){
                if (pieceEatMoves(board, row, column).length > 0)
                    mustEatPieces.push(board.pieces[row][column])
            }
        }
    }
    return mustEatPieces
}

export const isPlayerWon = (board,isWhite)=>{
    for (let row=0;row<8;row++){
        for (let column=0;column<8;column++){
            if (board.pieces[row][column]!=null) {
                if (board.pieces[row][column].isWhite!==isWhite) {
                    if (board.pieces[row][column].isKing) {
                        if (kingEatingMoves(board,row,column).length >0 || kingValidMoves(board,row,column).length >0) {
                            return false
                        }
                    } else {
                        if (pieceEatMoves(board,row,column).length > 0 || pieceValidMoves(board,row,column).length > 0)
                        return false
                    }
                } 
            }     
        }
    }
    return true
}

// class CheckersGame{
//     constructor(){
//         this.IsWhite=true
//         pieces = [];
//         this.mustEatPieces=[]
//     }
    

//     SetMustEatPiecesList(){
//         for (let row=0;row<8;row++){
//             for (let column=0;column<8;column++){
//                 if (pieces[row][column]==null)
//                     continue
//                 if (pieces[row][column].IsWhite===this.IsWhite){
//                     if (pieces[row][column].IsAbleToEat(pieces))
//                         this.mustEatPieces.push(pieces[row][column])
//                 }
//             }
//         }
//     }
//     IsPieceInMustEatList(piece){
//         for (let i=0;i<this.mustEatPieces.length;i++)
//             if (this.mustEatPieces[i]===piece)
//                 return true
//         return false
//     }
//     ChangeTurn =function(){
//         this.IsWhite = !this.IsWhite
//         this.mustEatPieces=[]
//         this.SetMustEatPiecesList()
//     }

// }


