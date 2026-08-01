export default function Game() {

/*     fetch("https://opentdb.com/api.php?amount=5")
        .this()
        .this() */

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

    function buttonClick(questionid, answerid) {
        console.log(`question: ${questionid} answer:${answerid}`)
    }

    const questionElements = hardQuestions.map((question, index) => {

        const correctAnswerPosition = Math.floor(Math.random()*4)
        const allAnswers = question.wrongAnswers
        allAnswers.splice(correctAnswerPosition, 0, "yello")
        const allAnswersElements = allAnswers.map((eachAns, butid) => 
            <button 
                key={butid} 
                onClick={() => buttonClick(index, butid)}
            >
                {eachAns}
            </button>
        )

        return (
            <>
                <h2 key={index}>{question.question}</h2>
                <div key={index}>{allAnswersElements}</div>
            </>
        )
    })

    return (
        <div className="game">
            {questionElements}
        </div>
    )
}