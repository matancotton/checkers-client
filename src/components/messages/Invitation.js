import React, { useContext } from 'react';
import { sendMessageSocket } from '../../sockets/socket';
import { LoginContext } from '../context/LoginContext';
const InVitation = (props)=>{
    const {userState} = useContext(LoginContext)
    
    const onClickedCancelButton = ()=>{
        props.closeMessage()
    }
    
    const onInvitationClicked =(event)=>{
        event.stopPropagation();
    }

    const onInviteClicked = ()=>{
        const message = {
            content: `${userState.user.username} wants to play with you`,
            type: 'INVITATION',
            name: userState.user.username
        }
        sendMessageSocket(props.id,message)
        props.closeMessage()
    }
    
    

    

    return (
        <div className="invitation-container" onClick={onInvitationClicked}>
            <div className="invitation__message">
                <h3>want to invite {props.username} ?</h3>
                <button className="invite" onClick={onInviteClicked}>Invite</button>
                <button className="cancel" onClick={onClickedCancelButton}>Cancel</button>
            </div>
        </div>
    )
}

export default InVitation;