export const setPlayersAction = (players)=>({
    type: "SET_PLAYERS",
    players
})

export const addOnlinePlayersAction = (players)=>{
    return {
        type: "ADD_ONLINE_PLAYERS",
    players
    }
    
}