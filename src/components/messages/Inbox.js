import React, { useContext, useEffect} from 'react';
import { MessagesContext } from '../context/MessagesContext';
import ResciveMessage from './RescivedMessage';


const Inbox = (props)=>{
    const {messagesState} = useContext(MessagesContext)
    const onCloseClicked = ()=>{
        props.setIsInboxVisible(false)
    }

    return (
        <div className="inbox-container">
            <span className="close-inbox" onClick={onCloseClicked}>X</span>
            <h3 className="title">Messages</h3>
            <div className="messages">
                {
                    messagesState.map((message,index)=>(
                        <ResciveMessage key={message.id} message={message.content} index={index} 
                        setIsDisplayedBoard={props.setIsDisplayedBoard} socketId={message.socketId}
                        setIsInboxVisible={props.setIsInboxVisible}
                        name={message.name}
                        setOpponent={props.setOpponent}/>
                    ))
                }
            </div>

        </div>
    )
}

export default Inbox;