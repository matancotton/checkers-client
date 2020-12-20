import React, { useContext, useEffect, useState } from 'react';
import { kingValidMoves,kingEatingMoves } from '../../gameLogic/kingLogic';
import { pieceEatMoves, pieceValidMoves } from '../../gameLogic/pieceLogic';
import { GameBoardContext } from '../context/GameBoardContext';


const GamePiece = (props)=>{
    
    const {gameBoardState} = useContext(GameBoardContext)
    const [isClicked, setIsClicked] = useState(false)
    const [cssClassName, setCssClassName] = useState(props.color)

    const PieceClicked = (e)=>{
        e.stopPropagation();
        if (cssClassName.includes('active-piece')) {
            setCssClassName(`${props.color} my-piece`)
            props.updateValidMoves([],[])
            return
        }
        if (props.isKing) {
            kingClicked()
            return
        }
        const eatingMoves = pieceEatMoves(gameBoardState,props.row,props.column)
        const validMoves = pieceValidMoves(gameBoardState,props.row,props.column)
        if(validMoves.length > 0 || eatingMoves.length > 0) {
            props.updateValidMoves(validMoves,eatingMoves)
            setCssClassName(`${props.color} active-piece`)
            props.setSelectedPiece({row: props.row, column: props.column})
        }
    }

    const kingClicked = ()=>{
        const eatingMoves = kingEatingMoves(gameBoardState,props.row,props.column)
        const validMoves = kingValidMoves(gameBoardState,props.row,props.column)
        if(validMoves.length > 0 || eatingMoves.length > 0) {
            props.updateValidMoves(validMoves,eatingMoves)
            setCssClassName(`${props.color} active-piece`)
            props.setSelectedPiece({row: props.row, column: props.column, isKing: true})
        }
    }


    useEffect(()=>{
        // if (!!props.selectedPiece && props.selectedPiece.row !==props.row && props.selectedPiece.column !== props.column && props.selectedPiece.isEating) {
        //     setCssClassName(props.color)
            
        // }
        if (!!props.selectedPiece) {
            if (props.selectedPiece.row===props.row && props.selectedPiece.column === props.column && props.isMyTurn) {
                setCssClassName(`${props.color} active-piece`)
                return
            }
            if (props.selectedPiece.isEating) {
                setCssClassName(props.color)
                return
            }
        }

        if (props.mustEatPieces.length > 0) {
            if (!!props.mustEatPieces.find((piece)=>(piece.row===props.row&&piece.column===props.column))) {
                setCssClassName(`${props.color} my-piece`)
            } else {
                setCssClassName(props.color)
            }
            return
        }
         
        if (props.isMyTurn && props.isMyPiece) {
             
            setCssClassName(`${props.color} my-piece`)
               
        }
        
    },[props.selectedPiece,props.isMyTurn])


    return (
        <div className={cssClassName}
            onClick={cssClassName!==props.color?PieceClicked:(()=>{})}>

        </div>
    )
}

export default GamePiece;