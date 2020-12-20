export const initialPlayersState = []

const playersReducer = (playersState, action)=>{
    switch (action.type) {
        case "SET_PLAYERS":
            return [...action.players]
        default:
            return [...playersState];
    }
}

export default playersReducer;