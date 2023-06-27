import { useState } from "react";

import "./InputText.css";

export default function InputText({ value, setValue, placeholder }) {
    const [currentValue, setCurrentValue] = useState(value || "");

    return (
        <label className="input-text">
            <input
                type="text"
                placeholder={placeholder}
                value={currentValue}
                onChange={({ target }) => setCurrentValue(target.value)}
                onBlur={({target}) => setValue(target.value !== "" ? target.value : null)}
            />
        </label>
    );
}