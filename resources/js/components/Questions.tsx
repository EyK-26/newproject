import axios from "axios";
import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from "react";
import UserContext from "../myApp/context/UserContext";
interface Answer {
    id: number;
    question_id: number;
    is_correct: number | boolean;
    text: string;
}
interface Question {
    created_at: string;
    updated_at: string;
    text: string;
    quizanswers: Array<Answer>;
}
const Questions: FunctionComponent = () => {
    const { state, dispatch } = useContext(UserContext);
    const user_id =
        state.user !== null && typeof state.user !== "boolean" && state.user.id;
    const [question, setQuestion] = useState<Question | null>(null);
    const userLoggedInLanguage =
        state.user !== null &&
        typeof state.user !== "boolean" &&
        state.user.language;

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const response = await axios.get("/api/question-show", {
                    params: {
                        user_id,
                    },
                });
                if (
                    Number(response.status) >= 200 &&
                    Number(response.status) <= 299
                ) {
                    setQuestion(response.data);
                }
            } catch (error: any) {
                dispatch({
                    type: "spanMessage/set",
                    payload: error,
                });
            }
        })();
    }, [userLoggedInLanguage]);

    const renderedAnswers = question?.quizanswers.map((el, idx) => (
        <li key={el.id}>
            {idx + 1}) {el.text}
        </li>
    ));

    return (
        <div>
            {question && (
                <div>
                    <span>{question.text}</span>
                    <ul>{renderedAnswers}</ul>
                </div>
            )}
        </div>
    );
};

export default Questions;
