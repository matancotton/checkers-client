import React, { useContext } from 'react';
import UserField from './UserField';
import {PlayersContext} from '../context/PlayersContext'
const Players = ()=>{
    const {playersState} = useContext(PlayersContext)
    
    return (
        <div className="available-users">
            <h3>Users</h3>
            <div className="available-users__users">
                {playersState.map((user)=>(
                    <UserField key={user.id} id={user.id} username={user.username}/>
                    )
                )}
            </div>
        </div>
    )
}

export default Players;