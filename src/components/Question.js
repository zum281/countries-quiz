import { useState, useEffect } from "react";
import Answer from "./Answer.js";
import { getRandomSubarray, shuffle } from "../utils.js";
import "../sass/Question.scss";

const Question = ({
    countries,
    questionIndex,
    endGame,
    answerCorrect,
    qType,
}) => {
    const [question, setQuestion] = useState(countries[questionIndex]);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [canAnswer, setCanAnswer] = useState(true);
    const [showCorrect, setShowCorrect] = useState(false);
    const [questionType, setQuestionType] = useState(qType);

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
                setIsCorrectAnswer(true);
                endGame(false);
            } else {
                setIsCorrectAnswer(false);
                setShowCorrect(true);
            }

            setCanAnswer(false);
        }
    };
    const goToResults = () => {
        setIsCorrectAnswer(null);
        endGame(true);
    };
    const handleNext = () => {
        setCanAnswer(true);
        setShowCorrect(false);
        setIsCorrectAnswer(false);
        setQuestionType(Math.floor(Math.random() * 2));
        setQuestion(countries[Math.floor(Math.random() * countries.length)]);
    };

    return (
        <div className="question">
            <h4
                className="question-title"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: showCorrect ? "center" : "flex-start",
                    textAlign: showCorrect ? "center" : "left",
                    marginTop: showCorrect ? "-20px" : "-60px",
                }}
            >
                {questionType ? (
                    question.capital
                ) : (
                    <img className="flag" src={question.flag} alt="flag" />
                )}
                {questionType ? " is the capital of" : " is the flag of"}
            </h4>
            {showCorrect && (
                <div className="answers you-lost">
                    <p>The correct answer was</p>
                    <h4 className="correct-answer">{question.name}</h4>
                </div>
            )}
            {!showCorrect && (
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
            )}

            {isCorrectAnswer && (
                <div className="btn-container">
                    <button className="next-btn" onClick={handleNext}>
                        Next
                    </button>
                </div>
            )}

            {!isCorrectAnswer && (
                <div
                    className="btn-container"
                    style={{
                        justifyContent: showCorrect ? "center" : "flex-end",
                    }}
                >
                    <button className="next-btn" onClick={goToResults}>
                        {isCorrectAnswer == null ? "Restart" : "Results"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Question;
