import { useState, useEffect } from "react";
import Answer from "./Answer.js";
import { getRandomSubarray, shuffle } from "../utils.js";
import "../sass/Question.scss";

const Question = ({ countries, questionIndex, endGame, answerCorrect }) => {
    const [question, setQuestion] = useState(countries[questionIndex]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [canAnswer, setCanAnswer] = useState(true);
    useEffect(() => {
        let x = getRandomSubarray(countries, 3);
        let y = x.map((country) => country.name);

        y.push(question.name);
        shuffle(y);

        let z = y.map((elem, index) => ({
            id: index,
            country: elem,
            correct: elem === question.name ? true : false,
        }));

        setAnswers(z);
    }, [countries, question]);

    const checkCorrect = (e, correct) => {
        if (canAnswer) {
            if (correct) {
                answerCorrect();
                setCorrectAnswer(true);
                endGame(false);
            } else {
                // evidenzia la risposta corretta
                // sapere qual è la risposta giusta
                // let correct_answer = answers.filter((answer) => answer.correct)[0];
                // console.log(correct_answer);
                // fai finta di aver cliccato sulla risp corretta, ma solo per il component answer
                let siblings = e.target.parentNode.childNodes;
                console.log(siblings);

                //correct_answer.trigger("click");
                setCorrectAnswer(false);
            }
            setCanAnswer(false);
        }

        //NON PUOI SELEZIONARE UN'ALTRA RISPOSTA
    };
    const goToResults = () => {
        setCorrectAnswer(null);
        endGame(true);
    };
    const handleNext = () => {
        setCorrectAnswer(false);
        setQuestion(countries[Math.floor(Math.random() * countries.length)]);
    };

    return (
        <div className="question">
            {/* <div style={{ position: "absolute", top: 150, color: "#fff" }}>
                <p>{question.name}</p>
                <p>{question.capital}</p>
            </div> */}
            <h4 className="question-title">
                {question.capital} is the capital of
            </h4>
            <div className="answers">
                {answers.map((answer, index) => {
                    return (
                        <Answer
                            key={answer.id}
                            index={String.fromCharCode(65 + index)}
                            text={answer.country}
                            correct={answer.correct}
                            classes={["answer-container", "default"]}
                            checkCorrect={(e, correct) =>
                                checkCorrect(e, answer.correct)
                            }
                            canAnswer={canAnswer}
                        />
                    );
                })}
            </div>

            {correctAnswer && (
                <div className="btn-container">
                    <button className="next-btn" onClick={handleNext}>
                        Next
                    </button>
                </div>
            )}

            {!correctAnswer && (
                <div className="btn-container">
                    <button className="next-btn" onClick={goToResults}>
                        {correctAnswer == null ? "Restart" : "Results"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Question;
