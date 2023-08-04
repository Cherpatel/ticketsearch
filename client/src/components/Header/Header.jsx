import { useCart } from "../../hooks/CartHook";
import { Link } from "react-router-dom";

import "./Header.css";

import Basket from "../../resources/icons/Basket";

export default function Header() {
    const { itemsCount } = useCart();

    return (
        <header>
            <Link to="/">
                <h1>Билетопоиск</h1>
            </Link>

            <div className={`w-cart${!itemsCount ? " disabled" : ""}`}>
                <div className="value">{ itemsCount }</div>

                <Link
                    className="icon"
                    to="/cart"
                >
                    <Basket />
                </Link>
            </div>
        </header>
    );
}