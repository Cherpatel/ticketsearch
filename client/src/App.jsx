import { CartProvider } from "./hooks/CartHook";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import General from "./pages/General/General";
import Film from "./pages/Film/Film";
import Cart from "./pages/Cart/Cart";
import Faq from "./pages/Faq/Faq";
import AboutUs from "./pages/AboutUs/AboutUs";

export default function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path="/" element={<Main />}>
                        <Route path="" element={<General />} />
                        <Route path="faq" element={<Faq />} />
                        <Route path="about-us" element={<AboutUs />} />
                        <Route path="film/:id" element={<Film />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="*" element={ <Navigate to="/" replace /> } />
                    </Route>
                </Routes>

                <Footer />
            </BrowserRouter>
        </CartProvider>
    );
}