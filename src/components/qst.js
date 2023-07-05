import React from "react";

export default function Qst(props) {
    const [selectedAnswer, holdSelectedAnswer] = React.useState("");

    const selectAnswer = (answer) => {
        holdSelectedAnswer(answer);
        props.onAnswerSelected(answer, props.questionNumber)
    };

    return (
        <div className="questions">
            <p className="font-bold">{props.question}</p>
            <div className="spans">
                {props.allAnswers && props.allAnswers.map((answer) => (
                    <span
                        className={`quest p-1 m-1 rounded-lg ${selectedAnswer === answer.answer ? "selected" : ""
                            }`}
                        onClick={() => selectAnswer(answer.answer, props.questionNumber)}
                        key={answer.answer}
                    >
                        {answer.answer}
                    </span>
                ))}
            </div>
            <hr style={{ height: "2px", background: "#DBDEF0" }} />
        </div>
    );
}


