export const initialMessagesState = []

const messagesReducer = (messagesState, action)=>{
    switch(action.type) {
        case "SET_MESSAGES":
            return action.messages;
        case "ADD_MESSAGE":
            const messages = [...messagesState]
            messages.push(action.message)
            return messages;
        default:
            return [...messagesState]
    }
}

export default messagesReducer;