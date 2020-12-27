import React, { useContext, useEffect, useState } from 'react';
import { addScoreToDB } from '../../server/db';
import { addMessage, connectSocket, disconnectSocket, setOnlinePlayers } from '../../sockets/socket';
import GameBoard from '../checkersGame/GameBoard';
import GameBoardContextProvider from '../context/GameBoardContext';
import { LoginContext } from '../context/LoginContext';
import { MessagesContext } from '../context/MessagesContext';
import { PlayersContext } from '../context/PlayersContext';
import Inbox from '../messages/Inbox';
import GameInfoBox from './GameInfoBox';
import Players from './Players';

const GameRoom = ()=>{
    const {userState} = useContext(LoginContext)
    const {playersDispatch} = useContext(PlayersContext)
    const {messagesState, messagesDispatch} = useContext(MessagesContext)
    const [isInboxVisible, setIsInboxVisible] = useState(messagesState.length>0)
    const [isDisplayedBoard, setIsDisplayedBoard] = useState(false)
    const [isFirstLoad,setIsFirstLoad] = useState(true)
    const [isWhite, setIsWhite] = useState(undefined)
    const [opponent, setOpponent] = useState({name:'',color:''})
    const [mustEatPieces, setMustEatPieces] = useState([])
    const [isWinner, setIsWinner] = useState(null)
    
    useEffect(()=>{

        if (isFirstLoad) {
            connectSocket(userState.user.username)
            setIsFirstLoad(false)

        }

        if (!!isWinner) {
            addScoreToDB(userState.token,100).then(()=>{
                console.log('socre was added succesfuly')
            })
            .catch((err)=>{
                console.log(err)
            })
        } else if (isWinner === false) {
            addScoreToDB(userState.token,-50).then(()=>{
                console.log('socre was added succesfuly')
            })
            .catch((err)=>{
                console.log(err)
            })
        }

        setOnlinePlayers(playersDispatch,userState.user.username)
        addMessage(messagesDispatch,setIsInboxVisible,setIsDisplayedBoard,setOpponent,setIsWhite)

        return ()=>{
            disconnectSocket()
        }
        
    },[userState,isWinner])
    return (
        <div className="waiting-room">
            <Players />
            {isDisplayedBoard?
                <GameBoardContextProvider>
                    <GameBoard 
                    isMyColorWhite={isWhite} 
                    opponent={opponent}
                    setMustEatPieces={setMustEatPieces}
                    mustEatPieces={mustEatPieces}
                    setIsWinner = {setIsWinner}/>
                    <GameInfoBox 
                        isWhite={isWhite} 
                        setIsWhite={setIsWhite}
                        opponent={opponent}
                        isWhite={isWhite} 
                        mustEatList = {mustEatPieces}
                        isWinner = {isWinner} />
                </GameBoardContextProvider>
            :
                <h1>Invite a player to play with</h1>}


            {!!isInboxVisible &&  <Inbox isDisplayedBoard={isDisplayedBoard} 
                                    setIsInboxVisible={setIsInboxVisible} 
                                    setIsDisplayedBoard={setIsDisplayedBoard}
                                    setOpponent={setOpponent}/>}
        </div>
    )
}

export default GameRoom;