import { useState } from 'react'

export default function Game() {

/*     fetch("https://opentdb.com/api.php?amount=5")
        .then(response => console.log(response))
        .catch(error => console.log(error)) */

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
    const [questionList, setQuestionList] = useState(() => createFullQuestions(hardQuestions))

    // functions
    function createFullQuestions(allQuestions) {

        const fullQuestions = allQuestions.map(question => {
            const correctAnswerPosition = Math.floor(Math.random()*4)
            const allAnswersHolder = question.wrongAnswers
            allAnswersHolder.splice(correctAnswerPosition, 0, question.correctAnswer)

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
            question.selected === question.allAnswers.indexOf(question.correctAnswer) ?
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

    const questionElements = questionList.map((question, index) => {

        const allAnswersElements = question.allAnswers.map((eachAns, butid) => {
            return (
                <button 
                    key={butid} 
                    onClick={() => buttonClick(index, butid)}
                    className={buttonClass(question, butid)}
                >
                    {eachAns}
                </button>
            )
        })

        return (
            <>
                <h2 key={question.question}>{question.question}</h2>
                <div key={question.correctAnswer}>{allAnswersElements}</div>
            </>
        )
    })

    return (
        <div className="game">
            {questionElements}
            <button onClick={checkAnswers}>Check Answers</button>
        </div>
    )
}