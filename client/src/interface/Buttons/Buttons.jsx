import "./Buttons.css";

import Add from "../../resources/icons/Add";
import Decrease from "../../resources/icons/Decrease";
import Confirm from "../../resources/icons/Confirm"
import Reject from "../../resources/icons/Reject"

export function ButtonAdd({ click, disabled }) {
    return (
        <div
            className={`button add${disabled ? " disabled" : ""}`}
            onClick={click}
        >
            <Add />
        </div>
    );
}

export function ButtonDecrease({ click, disabled }) {
    return (
        <div
            className={`button remove${disabled ? " disabled" : ""}`}
            onClick={click}
        >
            <Decrease />
        </div>
    );
}

export function ButtonConfirm({ click, disabled }) {
    return (
        <div
            className={`button confirm${disabled ? " disabled" : ""}`}
            onClick={click}
        >
            <Confirm />
        </div>
    );
}

export function ButtonReject({ click, disabled }) {
    return (
        <div
            className={`button reject${disabled ? " disabled" : ""}`}
            onClick={click}
        >
            <Reject />
        </div>
    );
}