import { createPortal } from "react-dom";

import "./Modal.css";

import Cross from "../../resources/icons/Cross";

const modalRoot = document.getElementById("modal");

export default function Modal({ isOpen, onClose, children }) {
    return isOpen ? createPortal(
        <div
            className="w-modal"
            onClick={onClose}
        >
            <div
                className="modal"
                onClick={e => e.stopPropagation()}
            >
                { children }
                <div
                    className="close"
                    onClick={onClose}
                >
                    <Cross />
                </div>
            </div>
        </div>
    , modalRoot) : undefined;
}