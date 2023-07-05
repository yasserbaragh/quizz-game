import React from "react";

export default function Answer(props) {
    return (
        <div className="questions">
            <p className="font-bold">{props.question}</p>
            <div className="spans">
                {props.allAnswers && props.allAnswers.map((answer) => (
                    <span
                        className={`quest p-1 m-1 rounded-lg ${props.selectedAnswer === answer.answer ? "selected" : ""
                            } ${answer.correct ? "correct" : ""} 
                            ${props.selectedAnswer === answer.answer && 
                                !answer.correct ? "wrong" : ""}`}
                        key={answer.answer}
                    >
                        {answer.answer}
                    </span>
                ))}
            </div>
            <hr style={{ height: "2px", background: "#DBDEF0" }} />
        </div>
    )
}