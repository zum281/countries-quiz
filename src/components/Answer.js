import "../sass/Answer.scss";
import { useState, useEffect } from "react";
const Answer = ({ index, text, checkCorrect, classes, correct, canAnswer }) => {
    const [myClasses, setMyClasses] = useState(classes);
    useEffect(() => {
        setMyClasses(["answer-container", "default"]);
    }, [text, correct]);

    const changeColor = (correct) => {
        if (correct) {
            classes = ["answer-container", "default"];
            classes.push("correct");
        } else {
            classes = ["answer-container", "default"];
            classes.push("incorrect");
        }
    };

    const handleClick = (e, correct) => {
        if (canAnswer) {
            changeColor(correct);
            setMyClasses(classes);
            checkCorrect(e, correct);
        }
    };
    return (
        <div
            className={myClasses.join(" ")}
            onClick={(e) => handleClick(e, correct)}
        >
            <span className="answer-index">{index}</span>
            <span className="answer-text">{text}</span>
        </div>
    );
};
Answer.defaultProps = {
    classes: ["answer-container", "default"],
};
export default Answer;
