import React, { createContext, useEffect, useReducer } from 'react';
import { setMessagesAction } from '../../actions/messagesAction';
import messagesReducer, { initialMessagesState } from '../../reducers/messagesReducer';


export const MessagesContext = createContext();

const MessagesContextProvider = (props)=>{

    const [messagesState, messagesDispatch] = useReducer(messagesReducer, initialMessagesState)

    useEffect(()=>{



        return ()=>{
            messagesDispatch(setMessagesAction([]));
        }
    },[])

    return (
        <MessagesContext.Provider value={{messagesState, messagesDispatch}}>
            {props.children}
        </MessagesContext.Provider>
    )

}

export default MessagesContextProvider;