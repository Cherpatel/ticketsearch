import { Link } from "react-router-dom";

import "./Footer.css";

export default function Footer() {
    return (
        <footer>
            <Link to="/faq">{"Вопросы-ответы"}</Link>

            <Link to="/about-us">{"О нас"}</Link>
        </footer>
    );
}