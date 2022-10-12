import React, { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import Preloader from "../Preloader/Preloader";
import { useEffect } from "react";
import { filterMovies } from "../../utils/constants";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function Movies({ handleSaveMovie, handleInfoToolTip }) {

    const [isShort, setShort] = useState(JSON.parse(localStorage.getItem('toggle')));

    function handleChangeToggle() {
        if (isShort) {
            setShort(false);
            localStorage.setItem('toggle', JSON.stringify(false));
            return handleFilterMovies(localStorage.getItem('request'), false);
        } else {
            setShort(true);
            localStorage.setItem('toggle', JSON.stringify(true));
            return handleFilterMovies(localStorage.getItem('request'), true);
        }
    }

    function handleDeleteMovie(id) {
        mainApi.deleteMovie(id)
            .then((res) => {
                mainApi.getSavedMovies()
                    .then((res) => {
                        localStorage.setItem('savedMovies', JSON.stringify(res));
                    })
                    .catch((err) => {
                        handleInfoToolTip(`Ошибка ${err.message}`, false);
                    })
            }
            )
            .catch((err) => {
                handleInfoToolTip(`Ошибка ${err.message}`, false);
            })
    }

    const [error, setError] = useState('');

    const [isLoading, setLoading] = useState(false);

    const [cards, setCards] = useState(JSON.parse(localStorage.getItem('filteredMovies')));

    const page = 'Movies';

    function handleFilterMovies(request, isShort) {

        const allMovies = JSON.parse(localStorage.getItem('movies'));

        if (allMovies) {
            filterMovies(request, isShort, allMovies, setLoading, setError, page);
            setCards(JSON.parse(localStorage.getItem('filteredMovies')));
            return localStorage.setItem('toggle', isShort);
        }
        moviesApi.getCards()
            .then((res) => {
                localStorage.setItem('movies', JSON.stringify(res));
                filterMovies(request, isShort, res, setLoading, setError, page);
                setCards(JSON.parse(localStorage.getItem('filteredMovies')));
                return localStorage.setItem('toggle', isShort);

            })
            .catch((err) => {
                handleInfoToolTip(`Ошибка ${err.message}`, false);
            })
    }

    useEffect(() => {
        setCards(cards);
        localStorage.setItem('toggle', JSON.stringify(isShort));
    }, [cards, isShort]);

    return (
        <main className="movies-page">
            <SearchForm
                setShort={handleChangeToggle}
                filterMovies={handleFilterMovies}
                isShort={isShort}
                searchError={error}
                page='movies'
            />
            <Preloader
                isOn={isLoading}
            />
            <MoviesCardList
                cards={cards}
                isButtonVisible={true}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
                handleInfoToolTip={handleInfoToolTip}
                page={'movies'}
            />
        </main>
    )
}

export default Movies;