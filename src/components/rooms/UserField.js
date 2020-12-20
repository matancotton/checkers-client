import React, { useState } from 'react';
import InVitation from '../messages/Invitation';

const UserField = (props)=>{
    const [displayMessage, setDisplayMessage] = useState(false)
    const onPlayerClicked = ()=>{
        setDisplayMessage(!displayMessage)
    }

    return (
        <div className="user-field" onClick={onPlayerClicked}>
            <div className="online"></div>
            <span>{props.username}</span>
            {displayMessage && <InVitation id={props.id} username={props.username} closeMessage={onPlayerClicked}/>}
        </div>
    )
}

export default UserField;