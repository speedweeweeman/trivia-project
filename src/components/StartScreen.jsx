export default function StartScreen({startGame}) {
    return (
        <section>
            <h1>The Best Quiz Game Ever</h1>
            <p>Be prepared for something crazy</p>
            <button className="start" onClick={startGame}>Start Quiz</button>
        </section>
    )
}