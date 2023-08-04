import "./ConfirmWindow.css";

import { ButtonConfirm, ButtonReject } from "../Buttons/Buttons";

export default function ConfirmWindow({ confirmClick, rejectClick }) {
    return (
        <div className="win-confirm">
            <div className="desc">
                <h3 className="title">Удаление билета</h3>

                <span className="text">Вы уверены, что хотите удалить билет?</span>
            </div>

            <div className="btns">
                <ButtonConfirm click={confirmClick} />

                <ButtonReject click={rejectClick} />
            </div>
        </div>
    );
}