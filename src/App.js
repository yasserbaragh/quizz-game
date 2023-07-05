import React from 'react';
import './App.scss';
import Qst from "./components/qst"
import Answer from './components/answer';
import Sidebar from './components/sidebar';

function App() {
  //start
  const [start, startGame] = React.useState(false)
  const toggleStart = () => {
    startGame(prev => !prev)
  }

  // see results
  const [Answered, getAnswers] = React.useState(false)
  const getAnswer = () => {
    getAnswers(prev => !prev)
  }

  //questions
  const [questions, changeQst] = React.useState([])
  React.useEffect(() => {
    if (!Answered) {
      fetch("https://opentdb.com/api.php?amount=10")
        .then(res => res.json())
        .then((data) => {
          const newData = data.results.map(result => {
            const allAnswers = [...result.incorrect_answers, result.correct_answer];
            //shuffle array
            for (let i = allAnswers.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
            }
            // correct
            return {
              ...result,
              selectedAns: "",
              allAnswers: allAnswers.map(answer => ({
                answer: answer,
                correct: answer === result.correct_answer
              })),
            }
          })
          changeQst(newData);
        })
    }
  }, [Answered])


  const handleAnswerSelected = (answer, questionNumber) => {
    changeQst(prev => {
      const updatedQuestions = [...prev];
      // selected answer for the specific answer
      updatedQuestions[questionNumber] = { ...updatedQuestions[questionNumber], selectedAns: answer, }
      return updatedQuestions;
    });
  };

  // count score
  const [score, changeScore] = React.useState(0)
  const countScore = () => {
    changeScore(() => 0)
    if (!Answered) {
      questions.map((answer) => {
        if (answer.selectedAns === answer.correct_answer) {
          changeScore((prevScore) => prevScore + 1);
        }
      })
    }
  }

  const [scoreArray, setScoreArray] = React.useState(
    () => JSON.parse(localStorage.getItem("scoreArray")) || []
  );

  React.useEffect(() => {
    if (Answered || (score === 0 && scoreArray.indexOf(0) === -1)) {
      console.log(score)
      console.log(scoreArray)
      setScoreArray(prev => [...prev, score]);
    }
  }, [score, Answered]);

  React.useEffect(() => {
    localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
  }, [scoreArray]);

  return (
    <main className="App flex">
      {start ?
        <div className='split flex'>
          <Sidebar
            scoreArray={scoreArray}/>
          <div className='qsts flex'>
            {Answered ?
              questions.map(quest => (
                <Answer
                  key={quest.question}
                  question={quest.question}
                  allAnswers={quest.allAnswers}
                  selectedAnswer={quest.selectedAns}
                />
              ))
              :
              questions.map((qst, index) => (
                <Qst
                  key={qst.question}
                  question={qst.question}
                  allAnswers={qst.allAnswers}
                  onAnswerSelected={handleAnswerSelected}
                  questionNumber={index}
                />
              ))}
            <div className='buttons'>
              {Answered ?
                <p>You scored {score}/10 correct answers</p> : ""}
              <button onClick={() => { getAnswer(); countScore() }}>
                {Answered ? "play again" : "check answers"}</button>
            </div>
          </div>

        </div>
        : <div className='homePage 
      text-center p-10'>
          <h1 className='text-4xl font-bold'>Quizzical</h1>
          <p className='text-sm'>Some description if needed</p>
          <button className='bg-blue-500
         hover:bg-blue-700 text-white
          font-bold py-2 px-4 rounded'
            onClick={toggleStart}>
            Start quiz</button>
        </div>
      }
    </main>
  );
}

export default App;
