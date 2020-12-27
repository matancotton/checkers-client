import React from 'react';
import Scoreboard from './Scoreboard';

const ScoreField = (props)=>{


    return (
        <div className={props.isMyName?"my-score score-field":"score-field"}>
            <div>{props.username}</div>
            <div>{props.score}</div>
        </div>
    )
}

export default ScoreField;