import "./AnimatedArrow.css";

import Arrow from "../../resources/icons/Arrow";

export default function AnimatedArrow({ isActive }) {
    return (
        <div className={`arrow${isActive ? " active" : ""}`}>
            <Arrow />
            <div className="pointer">
                <Arrow />
            </div>
        </div>
    );
}