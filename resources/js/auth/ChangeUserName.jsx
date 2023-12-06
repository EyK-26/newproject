import axios from "axios";
import React, { useState } from "react";

const ChangeUserName = () => {
    const [name, setName] = useState("");

    const handleSubmit = async () => {
        // const response = await axios.put
    };

    return (
        <div className="name_change">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">New Username</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setName(e);
                    }}
                />
            </form>
        </div>
    );
};

export default ChangeUserName;
