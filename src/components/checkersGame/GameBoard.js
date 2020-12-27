import { nanoid } from 'nanoid';
import React, { useContext, useEffect, useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { setBoardAction } from '../../actions/gameBoardAction';
import { isPlayerWon, movePiece, setMustEatPiecesList } from '../../gameLogic/boardLogic';
import { isAbleToEat,pieceEatMoves } from '../../gameLogic/pieceLogic';
import { isKingAbleToEat,kingEatingMoves } from '../../gameLogic/kingLogic';
import { addMessage, gameSockets, sendMessageSocket } from '../../sockets/socket';
import { GameBoardContext } from '../context/GameBoardContext';
import GamePiece from './GamePiece';


const GameBoard = (props)=>{
    
    const {gameBoardState,gameBoardDispatch} = useContext(GameBoardContext)
    const [squares, setSquares] = useState([])
    const [selectedPiece, setSelectedPiece] = useState(null)
    const [pieceValidMoves,setPieceValidMoves] = useState([])
    

    const isSquareBlack = (index) => {
        const isEvenColumn = index % 2 === 0;
        const isEvenRow = Math.floor(index / 8) % 2 === 0;
    
        if (isEvenRow) {
            return isEvenColumn ? false : true;
        } else {
            return isEvenColumn ? true : false;
        }
    };

    const updateValidMoves = (validMoves,eatingMoves)=>{
        const initSquares = [...squares]
        if (eatingMoves.length > 0) {
            validMoves = eatingMoves
            for (let i=0; i<initSquares.length; i++) {
                initSquares[i].color=isSquareBlack(i)?'black':'white'
                validMoves.forEach((location)=>{
                    if (location.row === parseInt(i/8) && location.column === i%8) {
                        initSquares[i].color='red'
                    } 
                })
            }
        } else {
            for (let i=0; i<initSquares.length; i++) {
                initSquares[i].color=isSquareBlack(i)?'black':'white'
                validMoves.forEach((location)=>{
                    if (location.row === parseInt(i/8) && location.column === i%8) {
                        initSquares[i].color='green'
                    } 
                })
            }
        }
        
        setSquares(initSquares)
        setPieceValidMoves(validMoves)
    }

    const setBoard = (pieces)=>{
        const initSquares = []
        let squaresIndex = 0;
        for (let i=0; i < 8; i++) {
            for (let j=0; j< 8; j++) {
                if (pieces[i][j] != null) {
                    initSquares.push({color: isSquareBlack(squaresIndex)?'black':'white', piece: {...pieces[i][j]}, id: nanoid()})
                }

                else if (!!pieceValidMoves.find(place=>place.row===i&&place.column===j)) {
                    initSquares.push({color: 'red', piece: null, id: nanoid()})
                }

                else {
                    initSquares.push({color: isSquareBlack(squaresIndex)?'black':'white', piece: null, id: nanoid()})
                }
                squaresIndex++
            }
            
        }
        setSquares(initSquares)
    }

    const squareClicked = (row,column)=>{
        if (selectedPiece==null) {
            return
        }
        if (!!pieceValidMoves.find((location)=>(location.row===row && location.column===column))){
                submitTurn(row,column)
                if (!selectedPiece) {
                    setPieceValidMoves([]) 
                }
        }

    }

    const submitTurn = (row,column)=>{
        const oldBoard = cloneDeep(gameBoardState)
        const newBoard = movePiece(oldBoard,selectedPiece.row,selectedPiece.column,row,column)
        let eatingMoves = []
        let isEating = false
        if (selectedPiece.isKing) {
            eatingMoves = kingEatingMoves(newBoard, row, column)
            isEating = isKingAbleToEat(gameBoardState,selectedPiece.row,selectedPiece.column,row,column)
        } else {
            eatingMoves = pieceEatMoves(newBoard,row,column)
            isEating = isAbleToEat(gameBoardState,selectedPiece.row,selectedPiece.column,row,column)
        }
        
        if (eatingMoves.length > 0 && isEating) {
            setSelectedPiece({row,column, isEating: true})
            setPieceValidMoves(eatingMoves)
        } else {
            newBoard.isWhite = !newBoard.isWhite
            setSelectedPiece(null)
            setPieceValidMoves([])
        }
        
        gameBoardDispatch(setBoardAction(newBoard))
        // setBoard(gameBoardState.pieces)
        sendMessageSocket(props.opponent.socketId, {
            type: 'GAME_MOVE',
            content: {...newBoard}
        })
        
    }

    useEffect(()=>{
        if (isPlayerWon(gameBoardState,props.isMyColorWhite)) {
            sendMessageSocket(props.opponent.socketId, {
                type: 'GAME_OVER'
            })
            props.setIsWinner(true)
        }
        setBoard(gameBoardState.pieces)
        props.setMustEatPieces(setMustEatPiecesList(gameBoardState,props.isMyColorWhite))
        gameSockets(gameBoardDispatch,props.setIsWinner)

    },[gameBoardState])


    return (
        <div className="board-container">
            {squares.map((square, i) => (
				<div
                    className={`square-${square.color}`} key={square.id} 
                    onClick={(()=>{
                        squareClicked(parseInt(i/8),i%8)
                    })}>
                    {square.piece != null && <GamePiece 
                                            isKing={square.piece.isKing}
                                            color={square.piece.color} 
                                            isMyPiece={square.piece.isWhite === props.isMyColorWhite}
                                            isMyTurn = {gameBoardState.isWhite===props.isMyColorWhite}
                                            row={square.piece.row} column={square.piece.column}
                                            isSelectedPiece = {selectedPiece != null && selectedPiece.row ===square.piece.row && selectedPiece.column === square.piece.column}
                                            setSelectedPiece={setSelectedPiece}
                                            selectedPiece = {selectedPiece}
                                            updateValidMoves={updateValidMoves}
                                            mustEatPieces={props.mustEatPieces}/>}
				</div>
			))}
        </div>
    )
}

export default GameBoard;