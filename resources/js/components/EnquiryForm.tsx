import React, {
    ChangeEvent,
    FormEvent,
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from "react";
import UserContext from "../myApp/context/UserContext";
import axios from "axios";

interface FormData {
    name: string;
    email: string;
    message?: string;
}

interface EnquiryFormProps {
    id: number;
    setFormOpen(arg: boolean): void;
    fetchUserStatus(): void;
}

const EnquiryForm: FunctionComponent<EnquiryFormProps> = ({
    id,
    setFormOpen,
    fetchUserStatus,
}) => {
    const { state, dispatch } = useContext(UserContext);
    if (state.user === null || typeof state.user === "boolean") {
        return;
    }
    const [formData, setFormData] = useState<FormData>({
        name: state.user.name,
        email: state.user.email,
        message: "",
    });

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/enquiry", {
                user_id:
                    state.user !== null &&
                    typeof state.user !== "boolean" &&
                    state.user.id,
                offer_id: id,
                message: formData.message,
            });
            if (Math.floor(response.status / 100) === 2) {
                dispatch({
                    type: "spanMessage/set",
                    payload: response.data.message,
                });
                setFormData((prev) => ({
                    ...prev,
                    message: "",
                }));
                setFormOpen(false);
                fetchUserStatus();
            }
        } catch (error: any) {
            dispatch({
                type: "spanMessage/set",
                payload: error.response.data.message.includes("SQLSTATE[23000]")
                    ? "You have already sent an enquiry about this property"
                    : "An error occured, please try again.",
            });
            setFormOpen(false);
        }
    };

    useEffect(() => {
        if (state.spanMessage) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [state.spanMessage]);

    return (
        <div className="enquiry-form__container">
            <h3>Contact Form</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={formData.name}
                        disabled
                    />
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={formData.email}
                        disabled
                    />
                    <small>
                        *your name and email address cannot be changed
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message: </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        cols={45}
                        placeholder="I am interested in this property..."
                        required
                    ></textarea>
                </div>
                <input type="submit" value="send" />
            </form>
        </div>
    );
};

export default EnquiryForm;
