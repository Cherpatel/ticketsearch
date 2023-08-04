import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/CartHook";

import "./Film.css";

import Modal from "../../components/Modal/Modal";

import {
    getGenreTitleByValue,
    isSkeleton
} from "../../functions.js";

import { ButtonAdd, ButtonDecrease } from "../../interface/Buttons/Buttons";
import ConfirmWindow from "../../interface/ConfirmWindow/ConfirmWindow";

import Cross from "../../resources/icons/Cross";

export default function Film({ item, remove = false }) {
    const {
        addItem,
        decreaseItem,
        removeItem,

        getItemQuantity
    } = useCart();

    const [isOpenModal, setIsOpenModal] = useState(false);

    const {
        id,
        posterUrl,
        title,
        genre
    } = item;

    const quantity = getItemQuantity(item);


    const addClick = () => addItem(item, 1);
    let decreaseClick = () => decreaseItem(item, 1);

    if (remove) {
        var confirmClick = () => {
            removeItem(item);
            setIsOpenModal(false);
        }

        var rejectClick = () => {
            setIsOpenModal(false);
        }

        decreaseClick = () => {
            if (quantity === 1)
                setIsOpenModal(true);
            else
                decreaseItem(item, 1);
        }
    }

    return (
        <>
            <div className="b-film">
                <div className={`poster${isSkeleton(posterUrl)}`}>
                    <img src={posterUrl} loading="lazy" />
                </div>

                <div className="details">
                    <Link
                        to={`/film/${id}`}
                        className={`title${isSkeleton(title)}`}
                    >
                        {title || "Властелин колец: Две крепости"}
                    </Link>

                    <span className={`genre${isSkeleton(genre)}`}>{getGenreTitleByValue(genre) || "Фэнтези"}</span>
                </div>

                <div className={`order${isSkeleton(posterUrl)}`}>
                    <div className="btn decrease">
                        <ButtonDecrease
                            disabled={quantity === 0}
                            click={() => decreaseClick()}
                        />
                    </div>

                    <div className="quantity">{quantity}</div>

                    <div className="btn add">
                        <ButtonAdd
                            disabled={quantity === 30}
                            click={() => addClick()}
                        />
                    </div>
                </div>

                {remove ? (
                    <div
                        className={`remove${isSkeleton(posterUrl)}`}
                        onClick={() => setIsOpenModal(true)}
                    >
                        <Cross />
                    </div>
                ) : undefined}
            </div>

            {remove ? (
                <Modal
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                >
                    <ConfirmWindow
                        confirmClick={() => confirmClick()}
                        rejectClick={() => rejectClick()}
                    />
                </Modal>
            ) : undefined}
        </>
    );
}