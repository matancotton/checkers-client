import React, { useContext } from 'react';
import { setMessagesAction } from '../../actions/messagesAction';
import {  sendMessageSocket } from '../../sockets/socket';
import { LoginContext } from '../context/LoginContext';
import { MessagesContext } from '../context/MessagesContext';

const ResciveMessage = (props)=>{

    const {messagesState, messagesDispatch} = useContext(MessagesContext)
    const {userState} = useContext(LoginContext)

    const onAcceptClicked = ()=>{
        props.setIsDisplayedBoard(true)
        deleteMessageClicked()
        props.setIsInboxVisible(false)
        const message = {
            content:'',
            type:'ACCEPTION',
            name: userState.user.username
        }
        props.setOpponent({socketId:props.socketId,name:props.name, color: undefined})
        sendMessageSocket(props.socketId,message)
    }

    const deleteMessageClicked = ()=>{
        const newMessages = [...messagesState]
        newMessages.splice(props.index,1)
        messagesDispatch(setMessagesAction(newMessages))
    }

    return (
        <div className="rescived-message-container">
            <div className="message">{props.message}</div>
            <div className="buttons">
                <button onClick={onAcceptClicked}>Accept</button>
                <button onClick={deleteMessageClicked}>Deny</button>
            </div>
            
        </div>
    )
}

export default ResciveMessage;