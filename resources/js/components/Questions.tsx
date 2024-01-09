import axios from "axios";
import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from "react";
import UserContext from "../myApp/context/UserContext";

type Props = {};

const Questions: FunctionComponent = (props: Props) => {
    const { state, dispatch } = useContext(UserContext);
    const user_id =
        state.user !== null && typeof state.user !== "boolean" && state.user.id;
    const [question, setQuestion] = useState<string>("");

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
    }, []);

    console.log(question);

    return <div>Questions</div>;
};

export default Questions;
