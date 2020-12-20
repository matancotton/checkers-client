import React, { createContext, useContext, useEffect, useReducer} from 'react';
import { setPlayersAction } from '../../actions/playersAction';
import playersReducer, { initialPlayersState } from '../../reducers/playersReducer';
import { disconnectSocket, getOnlinePlayers } from '../../sockets/socket';
import { LoginContext } from './LoginContext';

export const PlayersContext = createContext();

const PlayersContextProvider = (props)=>{
    const {userState} = useContext(LoginContext)
    const [playersState, playersDispatch] = useReducer(playersReducer,initialPlayersState)
    

    return (
        <PlayersContext.Provider value={{playersState, playersDispatch}}>
            {props.children}
        </PlayersContext.Provider>
    )
}

export default PlayersContextProvider;