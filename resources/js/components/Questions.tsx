import axios from "axios";
import React, { useContext } from "react";
import UserContext from "../myApp/context/UserContext";

type Props = {};

const Questions = (props: Props) => {
    const { state, dispatch } = useContext(UserContext);
    const userId =
        state.user !== null && typeof state.user !== "boolean" && state.user.id;
    return <div>Questions</div>;

    const fetchQuestion = async () => {
        try {
            const response = await axios.get("api/question", {
                params: {
                    user_id: userId || 0,
                },
            });
        } catch (error: any) {
            dispatch({
                type: "spanMessage/set",
                payload: error,
            });
        }
    };
};

export default Questions;
