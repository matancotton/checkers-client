import React, { createContext, useReducer, useEffect } from 'react';
import gameBoardReducer, { initialBoard } from '../../reducers/gameBoardReducer';
import {setBoardAction} from '../../actions/gameBoardAction'

export const GameBoardContext = createContext();

const GameBoardContextProvider = (props)=>{

    const [gameBoardState, gameBoardDispatch] = useReducer(gameBoardReducer,initialBoard)

    // useEffect(()=>{

    //     return ()=>{
    //         gameBoardDispatch(setBoardAction(initialBoard))
    //     }
    // })
    
    return (
        <GameBoardContext.Provider value={{gameBoardState, gameBoardDispatch}}>
            {props.children}
        </GameBoardContext.Provider>
    )
}

export default GameBoardContextProvider;