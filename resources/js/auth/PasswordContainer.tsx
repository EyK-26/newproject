import React, {
    MouseEvent,
    FunctionComponent,
    useState,
    ChangeEvent,
} from "react";
import { BiSolidShow } from "react-icons/bi";
import { Values } from "./Register";
import { ManualResetValues } from "./password-reset/ManualReset";

interface Password {
    show_password: boolean;
    show_password_confirmation: boolean;
}

interface PasswordContainerProps {
    values: Values | ManualResetValues;
    handleChange(e: ChangeEvent<HTMLInputElement>): void;
}

const PasswordContainer: FunctionComponent<PasswordContainerProps> = ({
    values,
    handleChange,
}) => {
    const [togglePassword, setTogglePassword] = useState<Password>({
        show_password: false,
        show_password_confirmation: false,
    });

    const handleToggle = (e: MouseEvent<HTMLElement>): void => {
        if (e.currentTarget.id === "show_password") {
            setTogglePassword((prev) => ({
                ...prev,
                show_password: !prev.show_password,
            }));
        } else if (e.currentTarget.id === "show_password_confirmation") {
            setTogglePassword((prev) => ({
                ...prev,
                show_password_confirmation: !prev.show_password_confirmation,
            }));
        } else {
            return;
        }
    };

    return (
        <>
            <label htmlFor="password">Password</label>
            <div className="password__container">
                <input
                    type={togglePassword.show_password ? "text" : "password"}
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                />
                <div
                    id="show_password"
                    onClick={(e) => {
                        handleToggle(e);
                    }}
                >
                    <BiSolidShow />
                </div>
            </div>
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <div className="password_confirmation__container">
                <input
                    type={
                        togglePassword.show_password_confirmation
                            ? "text"
                            : "password"
                    }
                    name="password_confirmation"
                    id="password_confirmation"
                    value={values.password_confirmation}
                    onChange={handleChange}
                />
                <div
                    id="show_password_confirmation"
                    onClick={(e) => {
                        handleToggle(e);
                    }}
                >
                    <BiSolidShow />
                </div>
            </div>
        </>
    );
};

export default PasswordContainer;
