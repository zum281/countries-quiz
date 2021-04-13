import "../sass/Results.scss";
import Illustration2 from "../assets/illustration2.svg";
const Results = ({ endGame, score, resetScore }) => {
    const handleClick = () => {
        endGame(false);
        resetScore();
    };

    return (
        <div className="results">
            <img
                className="results-image"
                src={Illustration2}
                alt="result illustration"
            />
            <h4 className="results-title">Results</h4>
            <p className="results-text">
                You got <span className="score">{score}</span> correct answers
            </p>
            <button onClick={handleClick}>Try again</button>
        </div>
    );
};

export default Results;
