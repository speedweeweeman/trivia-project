import { useState } from 'react'
import { useEffect } from 'react'
import Confetti from 'react-confetti'
import { decode } from 'html-entities'

export default function Game({startGame}) {

    // states
    const [questionData, setQuestionData] = useState([])

    // derived variables
    const gameOver = questionData.length > 0 && questionData.every(question => 
            Object.hasOwn(question, 'correct')
    )
    const amountCorrect = questionData.length > 0 ? 
        questionData.reduce((acc, cur) =>
            (cur.correct === "yes" ? acc + 1 : acc)
        , 0) :
        null
    

    // functions
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(response => response.json())
            .then(data => {setQuestionData(createFullQuestions(data.results))})
            .catch(error => console.log(error))
    }, [])

    function createFullQuestions(allQuestions) {

        const fullQuestions = allQuestions.map(question => {
            const correctAnswerPosition = 
                Math.floor(Math.random()*(question.incorrect_answers.length + 1))
            const allAnswersHolder = question.incorrect_answers
            allAnswersHolder.splice(correctAnswerPosition, 0, question.correct_answer)

            return {
                ...question,
                allAnswers: allAnswersHolder
            }
        })
        
        return fullQuestions
    }

    function buttonClick(questionid, answerid) {
        setQuestionData(prev => prev.map((question, index) =>
                index === questionid ? {...question, selected: answerid} : question
            )
        )
    }

    function checkAnswers() {
        setQuestionData(prev => prev.map(question => 
            question.selected === question.allAnswers.indexOf(question.correct_answer) ?
                {...question, correct: "yes"} :
                {...question, correct: "no"}
        ))
    }

    function buttonClass(question, butid) {
        if (question.correct === "yes" && question.selected === butid) {
            return "correct"
        } else if (question.correct === "no" && question.selected === butid) {
            return "incorrect"
        }

        if (question.selected === butid) {
            return "selected"
        }
    }

    // elements

    const questionElements = questionData.map((question, index) => {

        const allAnswersElements = question.allAnswers.map((eachAns, butid) => {
            return (
                <button 
                    key={eachAns}
                    onClick={() => buttonClick(index, butid)}
                    className={buttonClass(question, butid)}
                >
                    {decode(eachAns)}
                </button>
            )
        })

        return (
            <div key={question.question}>
                <h2>{decode(question.question)}</h2>
                <p>{allAnswersElements}</p>
            </div>
        )
    })

    return (
        <div className="game">
            {gameOver && <Confetti />}

            {questionElements}

            {gameOver ? 
                <div className="game-end">
                    <span>You got {amountCorrect}/5 right!</span> 
                    <button
                        className="check"
                        onClick={startGame}
                    >
                        Play Again
                    </button> 
                </div> :
                <button 
                    className="check" 
                    onClick={checkAnswers}
                >
                    Check Answers
                </button>
            }   

        </div>
    )
}