import io from 'socket.io-client';
import { addMessageAction } from '../actions/messagesAction';
import { setPlayersAction } from '../actions/playersAction';
import {nanoid} from 'nanoid';
import { setBoardAction } from '../actions/gameBoardAction';
const ENDPOINT = 'https://cotton-checkers-server.herokuapp.com/';
let socket = null

export const connectSocket = (username)=>{
    socket = io(ENDPOINT,{withCredentials: true,extraHeaders: {
        username
        }})
}

export const setOnlinePlayers = (playersDispatch,username)=>{
    socket.on('online-user',(players)=>{
        players = players.filter(user=>user.username!==username)
        playersDispatch(setPlayersAction(players))
    })
}

export const addMessage = (messagesDispatch,setIsVisibleMessages,setIsDisplayedBoared,setOpponent,setIsWhite)=>{
    socket.on('rescive-messages',(msg)=>{
        switch (msg.type) {
            case 'ACCEPTION':
                setOpponent({name:msg.name, color: undefined,socketId:msg.socketId})
                setIsDisplayedBoared(true)
                setIsWhite(null)
                return
            case 'INVITATION':
                const message = {id: nanoid(), content: msg.content, socketId: msg.socketId, name: msg.name}
                messagesDispatch(addMessageAction(message))
                setIsVisibleMessages(true)
                return
            case 'COLOR':
                setOpponent({name:msg.name, color:msg.content,socketId:msg.socketId})
                setIsWhite(msg.content==='white'?false:true)
                return
            default: 
                return;
        }
        
    })
}

export const gameSockets = (gameBoardDispatch,setIsWinner)=>{
    socket.on('rescive-messages',(message)=>{
        if (message.type==='GAME_MOVE') {
            gameBoardDispatch(setBoardAction(message.content))
        }

        else if (message.type==='GAME_OVER') {
            setIsWinner(false)
        }
    })
}

export const sendMessageSocket = (socketId,message)=>{
    socket.emit('send-message', socketId,message)
}

export const disconnectSocket = ()=>{
    socket.disconnect()
}