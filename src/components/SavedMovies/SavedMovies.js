import React, { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import './SavedMovies.css';
import { filterMovies } from "../../utils/constants";
import mainApi from "../../utils/MainApi";

function SavedMovies({ savedMovies }) {

    const [isShort, setShort] = useState(JSON.parse(localStorage.getItem('shortToggle')));

    const allMovies = JSON.parse(localStorage.getItem('savedMovies'));

    const page = 'SavedMovies';

    function handleChangeToggle() {
        if (isShort) {
            setShort(false);
            localStorage.setItem('shortToggle', JSON.stringify(false));
            return handleFilterMovies(localStorage.getItem('requestShort'), JSON.parse(localStorage.getItem('shortToggle')));
        } else {
            setShort(true);
            localStorage.setItem('shortToggle', JSON.stringify(true));
            return handleFilterMovies(localStorage.getItem('requestShort'), JSON.parse(localStorage.getItem('shortToggle')));
        }
    }

    const [error, setError] = useState('');

    const [isLoading, setLoading] = useState(false);

    const [cards, setCards] = useState(JSON.parse(localStorage.getItem('savedMovies')));

    function handleDeleteMovie(id) {
        mainApi.deleteMovie(id)
            .then((res) => {
                let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
                let newSavedMovies = savedMovies.filter(function (movie) {
                    return movie._id !== res._id;
                });
                setCards(newSavedMovies);
                localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleFilterMovies(request, isShort) {
        filterMovies(request, isShort, allMovies, setLoading, setError, page);
        setCards(JSON.parse(localStorage.getItem('filteredSavedMovies')));
        return
    }

    return (
        <section className="saved-movies">
            <SearchForm
                setShort={handleChangeToggle}
                filterMovies={handleFilterMovies}
                isShort={isShort}
                searchError={error}
                page={'savedMovies'}
            />
            <Preloader
                isOn={isLoading}
            />
            <MoviesCardList
                isButtonVisible={false}
                cards={cards}
                page={'savedMovies'}
                handleDeleteMovie={handleDeleteMovie}
            />
            <div className="saved-movies__devider"></div>
        </section>
    )
}

export default SavedMovies;