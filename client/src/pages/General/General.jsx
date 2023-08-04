import { useState, useEffect } from "react";
import axios from "axios";

import "./General.css";

import Film from "../../components/Film/Film";

import { cinemasToSelectForm } from "../../functions.js";

import InputText from "../../interface/InputText/InputText";
import Select from "../../interface/Select/Select";

import { genreValues } from "../../consts";

function Filters({ films, setFilms, cinemas }) {
    const [filmName, setFilmName] = useState(null);
    const [genre, setGenre] = useState(null);
    const [cinema, setCinema] = useState(null);

    useEffect(() => {
        if (films === null) return;

        setFilms([{}, {}, {}]);

        async function filmsFilter() {
            let newFilms = [...films];

            if (filmName !== null)
                newFilms = newFilms.filter(film => film.title.toLowerCase().includes(filmName.toLowerCase()));
            if (genre !== null)
                newFilms = newFilms.filter(film => film.genre === genre);
            if (cinema !== null) {
                const { data: filmInCinema } = await axios.get(`/movies?cinemaId=${cinema}`);
                newFilms = newFilms.filter(film => {
                    const filmsIds = filmInCinema.map(film => film.id);
                    return filmsIds.includes(film.id);
                });
            }

            setFilms(newFilms);
        }

        filmsFilter();
    }, [filmName, genre, cinema]);

    return (
        <div className="b-filters">
            <div className="filter">
                <span className="title">Название</span>

                <InputText
                    value={filmName}
                    setValue={setFilmName}
                    placeholder={"Введите название"}
                />
            </div>

            <div className="filter">
                <span className="title">Жанр</span>

                <Select
                    value={genre}
                    setValue={setGenre}
                    placeholder={"Выберите жанр"}
                    items={genreValues}
                />
            </div>

            <div className="filter">
                <span className="title">Кинотеатр</span>

                <Select
                    value={cinema}
                    setValue={setCinema}
                    placeholder={"Выберите кинотеатр"}
                    items={cinemasToSelectForm(cinemas)}
                />
            </div>
        </div>
    );
}

export default function General() {
    const [films, setFilms] = useState(null);
    const [cinemas, setCinemas] = useState(null);

    const [filmsToShow, setFilmsToShow] = useState([{}, {}, {}])

    useEffect(() => {
        axios.get("/movies").then(({ data }) => {
            setFilms(data);
            setFilmsToShow(data);
        });
        axios.get("/cinemas").then(({ data }) => setCinemas(data));
    }, []);

    return (
        <section className="general">
            <div className="w-filters">
                <h2>Фильтр поиска</h2>

                <Filters
                    films={films}
                    setFilms={setFilmsToShow}
                    cinemas={cinemas}
                />
            </div>

            <div className="w-films">
                {filmsToShow?.map((film, i) => {
                    return (
                        <Film
                            key={film.id || i}
                            item={film}
                        />
                    );
                })}
            </div>
        </section>
    );
}