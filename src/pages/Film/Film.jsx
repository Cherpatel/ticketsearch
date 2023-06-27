import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../hooks/CartHook";
import axios from "axios";

import "./Film.css";

import { ButtonAdd, ButtonDecrease } from "../../interface/Buttons/Buttons";

import { getGenreTitleByValue, isSkeleton } from "../../functions";

function Review({ avatar, name, text, rating }) {
    return (
        <div className="w-review">
            <div className={`avatar${isSkeleton(name)}`}>
                <img src={avatar || ""} loading="lazy" />
            </div>

            <div className="desc">
                <div className="top-side">
                    <div className={`name${isSkeleton(name)}`}>
                        {name || "Роман"}
                    </div>

                    <div className={`rate${isSkeleton(rating)}`}>
                        <h3>Оценка:</h3>

                        <span>{rating}</span>
                    </div>
                </div>

                <div className="bottom-side">
                    <div className={`comment${isSkeleton(text)}`}>
                        <span>
                            {text || "По счастью мне довелось посмотреть фильм раньше, чем прочесть книгу. Это было около четырех лет назад, но тот момент я вспоминаю и по сей день. До него я не был фанатом Джона Толкина, как впрочем, и всего фентези в целом, однако стоило мне посмотреть первые десять минут фильма и оставшиеся пролетели на одном дыхании. Я словно погрузился в необычайный мир, где добро борется со злом, где зеленые рощи перемежаются с поросшими мхом статуями и древними развалинами, в мир, где пробираясь лесною тропой можно встретить остроухих неувядающих эльфов или мерзких орков – кому как повезет..."}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Film() {
    const [filmData, setFilmData] = useState({});
    const [reviews, setReviews] = useState([{}]);

    const {
        addItem,
        decreaseItem,
        getItemQuantity
    } = useCart();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`/movie?movieId=${id}`).then(({ data }) => setFilmData(data));
        axios.get(`/reviews?movieId=${id}`).then(({ data }) => setReviews(data));
    }, []);

    const {
        posterUrl,
        title,
        genre,
        releaseYear,
        rating,
        director,
        description
    } = filmData;

    const quantity = getItemQuantity(filmData);

    return (
        <section className="film">
            <div className="movie">
                <div className={`poster${isSkeleton(posterUrl)}`}>
                    <img src={posterUrl} loading="lazy" />
                </div>

                <div className="info">
                    <div className={`title${isSkeleton(title)}`}>
                        <h1>{title || "Властелин колец: Братство кольца"}</h1>
                    </div>

                    <div className="about">
                        <div className={`item${isSkeleton(genre)}`}>
                            <h3>Жанр:</h3>

                            <span>{getGenreTitleByValue(genre) || "Фэнтези"}</span>
                        </div>

                        <div className={`item${isSkeleton(releaseYear)}`}>
                            <h3>Год выпуска:</h3>

                            <span>{releaseYear || "2023"}</span>
                        </div>

                        <div className={`item${isSkeleton(rating)}`}>
                            <h3>Рейтинг:</h3>

                            <span>{rating || "0"}</span>
                        </div>

                        <div className={`item${isSkeleton(director)}`}>
                            <h3>Режиссёр:</h3>

                            <span>{director || "Питер Джексон"}</span>
                        </div>
                    </div>

                    <div className="desc">
                        <h3 className={`${isSkeleton(description)}`}>Описание</h3>

                        <span className={`${isSkeleton(description)}`}>
                            {description || "Сказания о Средиземье — это хроника Великой войны за Кольцо, длившейся не одну тысячу лет. Тот, кто владел Кольцом, получал неограниченную власть, но был обязан служить злу. Тихая деревня, где живут хоббиты. Придя на 111-й день рождения к своему старому другу Бильбо Бэггинсу, волшебник Гэндальф начинает вести разговор о кольце, которое Бильбо нашел много лет назад. Это кольцо принадлежало когда-то темному властителю Средиземья Саурону, и оно дает большую власть своему обладателю. Теперь Саурон хочет вернуть себе власть над Средиземьем. Бильбо отдает Кольцо племяннику Фродо, чтобы тот отнёс его к Роковой Горе и уничтожил."}
                        </span>
                    </div>
                </div>

                <div className={`order${isSkeleton(posterUrl)}`}>
                    <div className="btn remove">
                        <ButtonDecrease
                            disabled={quantity === 0}
                            click={() => decreaseItem(filmData, 1)}
                        />
                    </div>

                    <div className="quantity">{quantity}</div>

                    <div className="btn add">
                        <ButtonAdd
                            disabled={quantity === 30}
                            click={() => addItem(filmData, 1)}
                        />
                    </div>
                </div>
            </div>

            <div className="reviews">
                {reviews.map((review, i) => {
                    return (
                        <Review
                            key={review.id || i}
                            {...review}
                        />
                    );
                })}
            </div>
        </section>
    );
}