import { useState } from "react";
import useFetch from "./useFetch.js";
import Illustration1 from "./assets/illustration1.svg";
import Question from "./components/Question.js";
import Results from "./components/Results.js";

function App() {
    const url = "https://restcountries.eu/rest/v2/all?fields=name;capital;flag";
    const { error, isPending, data: countries } = useFetch(url);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const resetScore = () => {
        setScore(0);
    };
    const answerCorrect = () => {
        setScore(score + 1);
    };

    const endGame = (value) => {
        setGameOver(value);
    };

    return (
        <div className="App">
            <main>
                <h2 className="title">country quiz</h2>
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}

                {countries && !gameOver && (
                    <div className="main-container">
                        <img
                            className="illustration"
                            src={Illustration1}
                            alt="question illustration"
                        />
                        <Question
                            countries={countries}
                            questionIndex={Math.floor(
                                Math.random() * countries.length
                            )}
                            endGame={endGame}
                            answerCorrect={answerCorrect}
                            qType={Math.floor(Math.random() * 2)}
                        />
                    </div>
                )}

                {countries && gameOver && (
                    <div className="main-container">
                        <Results
                            endGame={endGame}
                            score={score}
                            resetScore={resetScore}
                        />
                    </div>
                )}
            </main>
            <footer>
                <p className="footer-text">
                    created by{" "}
                    <a
                        className="user-link"
                        href="https://devchallenges.io/portfolio/zum281"
                    >
                        zum281
                    </a>{" "}
                    -{" "}
                    <a className="footer-link" href="https://devchallenges.io">
                        devChallenges.io
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default App;
