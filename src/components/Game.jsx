import { useState } from 'react'
import { useEffect } from 'react'

export default function Game() {

    
    const hardQuestions = [
        {
            question: "why did the chicken cross the road?",
            correctAnswer: "oui",
            wrongAnswers: [
                "non",
                "non",
                "non",
            ]
        },
        {
            question: "who is the inventor of the apple?",
            correctAnswer: "oui",
            wrongAnswers: [
                "non",
                "non",
                "non",
            ]
        },
        {
            question: "how much would could a woodchuck chuck?",
            correctAnswer: "oui",
            wrongAnswers: [
                "non",
                "non",
                "non",
            ]
        },
        {
            question: "tomato potato?",
            correctAnswer: "oui",
            wrongAnswers: [
                "non",
                "non",
                "non",
            ]
        }
    ]
    
    
    // variables
    

    
    
    // states
    const [questionData, setQuestionData] = useState([])

    // functions
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(response => response.json())
            .then(data => {setQuestionData(createFullQuestions(data.results))})
            .catch(error => console.log(error))
    }, [])

    function createFullQuestions(allQuestions) {

        const fullQuestions = allQuestions.map(question => {
            const correctAnswerPosition = Math.floor(Math.random()*4)
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
        setQuestionList(prev => prev.map((question, index) =>
                index === questionid ? {...question, selected: answerid} : question
            )
        )
    }

    function checkAnswers() {
        setQuestionList(prev => prev.map(question => 
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
                    {eachAns}
                </button>
            )
        })

        return (
            <div key={question.question}>
                <h2>{question.question}</h2>
                <p>{allAnswersElements}</p>
            </div>
        )
    })

    return (
        <div className="game">
            {questionElements}
            <button className="check" onClick={checkAnswers}>Check Answers</button>
        </div>
    )
}