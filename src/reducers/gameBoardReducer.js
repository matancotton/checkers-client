import { setBoard } from "../gameLogic/boardLogic";

export const initialBoard = {
    isWhite: true,
    pieces: setBoard([])
}

const gameBoardReducer =(boardState, action)=>{
    switch (action.type) {
        case 'SET_BOARD':
            return action.board;
        default:
            return {...boardState};
    }
}

export default gameBoardReducer;