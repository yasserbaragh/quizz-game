import React from "react";

export default function Sidebar(props) {
    const [see,toggleSee] = React.useState(false)
    const changeSee = () => {
        toggleSee(prev => !prev)
    }

    const scoreArraySorted = props.scoreArray.sort().reverse()

    const allScores = scoreArraySorted.map((score,index) => (
       <div key={index}>
         <p>{score}</p>
       </div>
        
    ))
    return (
        <div className="sidebar">
            <div className="p">your high score is {props.scoreArray && Math.max(...props.scoreArray)}</div>
            <button onClick={changeSee}>{see? "hide": "see" } scores</button>
            {see ?
                <div>
                    {allScores}
                </div>
                : ""}
        </div>
    )
}