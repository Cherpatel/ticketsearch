import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/CartHook";

import "./Cart.css";

import Film from "../../components/Film/Film";

export default function Cart() {
    const navigate = useNavigate();

    const {
        items,

        itemsCount
    } = useCart();

    useEffect(() => {
        if (!itemsCount) navigate("/");
    }, [itemsCount]);

    return (
        <section className="cart">
            <div className="w-films">
                {items?.map((film, i) => {
                    return (
                        <Film
                            key={film.id || i}
                            item={film}
                            remove
                        />
                    );
                })}
            </div>

            <div className="summary">
                <span className="text">Итого билетов:</span>

                <span className="text">{itemsCount}</span>
            </div>
        </section>
    );
}