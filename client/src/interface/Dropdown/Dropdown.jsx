import { useState } from "react";

import "./Dropdown.css";

// import Arrow from "../../resources/icons/Arrow";
import AnimatedArrow from "../AnimatedArrow/AnimatedArrow";

export default function Dropdown({ title, text }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`dropdown${!isOpen ? " hidden" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="b-question">
                <h1>{title}</h1>

                <div className="w-arrow">
                    <AnimatedArrow isActive={isOpen} />
                </div>
            </div>

            <div
                className="b-answer"
                onClick={(e) => e.stopPropagation()}
            >
                <p>{text}</p>
            </div>
        </div>
    );
}