import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getScoresFromDB } from '../../server/db';
import { LoginContext } from '../context/LoginContext';
import Loader from '../loaders/Loader';
import ScoreField from './ScoreField';

const Scoreboard = ()=>{
    const {userState} = useContext(LoginContext)
    const [scoreBoard, setScoreBoard] = useState([])
    const history = useHistory()
    const fetchScores = ()=>{
        getScoresFromDB(userState.token).then((scores)=>{
            scores.sort((player1,player2)=>player2.score-player1.score)
            setScoreBoard(scores)
        }).catch((err)=>{
            history.push("/home")
        })
    }

    useEffect(()=>{
       fetchScores() 
    },[])


    return (
        <div className="score-board-container">
            <h1>Players Score-Board:</h1>
            {scoreBoard.length>0?
            <div className="score-board__table">
                {
                    scoreBoard.map((player)=>(
                        <ScoreField key={player.id} username={player.username} score={player.score} isMyName={player.id===userState.user._id}/>
                    ))
                }
            </div>:
            <Loader />
            }
        </div>
    )
}

export default Scoreboard;