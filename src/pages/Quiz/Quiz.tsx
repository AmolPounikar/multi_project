import "./Quiz.scss";
import { useState } from "react";

const questions = [
    {
        title: "React - it is ... ?",
        variants: ["Library", "Farmework", "App"],
        correct: 0,
    },
    {
        title: "What is component ...",
        variants: [
            "App",
            "part of an application or page",
            "I don't know what it is",
        ],
        correct: 1,
    },
    {
        title: "What is JSX?",
        variants: [
            "This is plain HTML",
            "This is a function",
            "This is the same HTML, but with the ability to execute JS code",
        ],
        correct: 2,
    },
    {
        title: "What are the two ways to handle data in React ?",
        variants: ["State & Props", "Services & Components", "State & Services"],
        correct: 0,
    },
];

interface Resultprops {
    correct: number;
}

function Result({ correct }: Resultprops) {
    const allCorrect = correct === questions.length;

    return (
        <div className="result">
            <img
                src={
                    allCorrect
                        ? "https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
                        : "https://img.icons8.com/?size=100&id=Hvtl7NsomZML&format=png"
                }
                alt="png"
            />
            <h2>
                You Passed {correct} Answer From {questions.length}
            </h2>
            <a href="/quiz">
                <button> Try again</button>
            </a>
        </div>
    );
}

interface Props {
    question: {
        title: string;
        variants: string[];
        correct: number;
    };
    onClickVariant: (index: any) => void;
    step: number;
}

function QuizCard({ step, question, onClickVariant }: Props) {
    const percentage = Math.round((step / questions.length) * 100) + 100;
    return (
        <div>
            <div className="progress">
                <div style={{ width: percentage }} className="progress__inner"></div>
            </div>
            <h1>{question.title}</h1>
            <ul>
                {question.variants.map((text, index) => (
                    <li key={index} onClick={() => onClickVariant(index)}>
                        {text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const Quiz = () => {
    const [step, setStep] = useState(0);
    const [correct, setCorrect] = useState(0);
    const question = questions[step];

    const onClickVariant = (index: any) => {
        setStep(step + 1);

        if (index === question.correct) {
            setCorrect(correct + 1);
        }
    };

    return (
        <div className="quiz-card">
            <div className="Quiz">
                {step !== questions.length ? (
                    <QuizCard
                        step={step}
                        question={question}
                        onClickVariant={onClickVariant}
                    />
                ) : (
                    <Result correct={correct} />
                )}
            </div>
        </div>
    );
};

export default Quiz;
