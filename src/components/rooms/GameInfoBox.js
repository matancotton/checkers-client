import React, { useContext } from 'react';
import { sendMessageSocket } from '../../sockets/socket';
import { GameBoardContext } from '../context/GameBoardContext';
import { LoginContext } from '../context/LoginContext';

const GameInfoBox = (props)=>{

    const {userState} = useContext(LoginContext)
    const {gameBoardState} = useContext(GameBoardContext)

    const whitePieceClicked = ()=>{
        props.setIsWhite(true)
        const message = {
            content: 'white',
            name: userState.user.username,
            type:'COLOR'
        }
        sendMessageSocket(props.opponent.socketId, message)
    }
    
    const blackPieceClicked = ()=>{
        props.setIsWhite(false)
        const message = {
            content: 'black',
            name: userState.user.username,
            type:'COLOR'
        }
        sendMessageSocket(props.opponent.socketId, message)
    }

    return (
        <div className="game-info">
            {
            props.isWhite==null?
            <div className="piece-choice">
                {
                props.isWhite===null && props.opponent.color ===undefined?
                <div className="pieces-container">
                    <h2>please select side...</h2>
                    <div className="pieces">
                        <div className="piece"><div className="white-piece" onClick={whitePieceClicked}></div></div>
                        <div className="piece"><div className="black-piece" onClick={blackPieceClicked}></div></div>
                    </div>
                </div>
                :
                <div>
                    {props.isWhite===undefined && <h2>waiting for {props.opponent.name} to choose a color...</h2>}
                </div>
                }
            </div>
            :
            <div className="main-info">
                <div className="main-info__title">
                    <h2>You are playing as</h2>
                    <div className="piece-holder">
                        <div className={props.isWhite?'white-piece':'black-piece'}></div>
                    </div>
                </div>
                {
                    props.isWinner===null ?
                    <div>
                        <div className="main-info__message">
                        {gameBoardState.isWhite===props.isWhite?<span>It's your turn</span>:<span>It is {props.opponent.name}'s turn</span>}
                        </div>
                        {props.mustEatList.length > 0 && <div className="main-info__second-message">you must eat a piece...</div>}
                    </div> 
                    :
                    <div className={props.isWinner?'game-winner':'game-looser'}>
                        You have {props.isWinner?<span>Won</span>:<span>Lost</span>} the game
                    </div>
                }

            </div>   
            }
            
        </div>
    )
}

export default GameInfoBox;