import React from "react";
import './SearchForm.css';
import icon from '../../images/find.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState, useEffect } from "react";

function SearchForm({ isShort, filterMovies, searchError, setShort, page }) {

    const [request, setRequest] = useState('');

    const [error, setError] = useState('');

    const allMovies = JSON.parse(localStorage.getItem('movies'));

    const defaultRequest = page === 'savedMovies' ? '' : localStorage.getItem('request');

    function handleSubmit(e) {
        e.preventDefault();
        if (request) {
            if (page === 'movies') {
                localStorage.setItem('request', request);
            }
            filterMovies(request, isShort, allMovies);
            return setError('');
        }
        return setError('Нужно ввести ключевое слово');
    }

    function handleChange(e) {
        setRequest(e.target.value);
    }

    useEffect(() => {
        setRequest(request);
    }, [request])

    return (
        <section className="search">
            <form className="search__form" onSubmit={handleSubmit} noValidate>
                <div className="search__field">
                    <input
                        className="search__input"
                        placeholder="Фильм"
                        onChange={handleChange}
                        defaultValue={defaultRequest}
                        required
                    />
                    <button className="search__button" type="submit"><img src={icon} alt='Поиск' /></button>
                    <FilterCheckbox
                        setShort={setShort}
                        isShort={isShort}
                    />
                </div>
                <span className="search__error">{error}</span>
                <span className="search__error">{searchError}</span>
            </form>
        </section>
    )
}

export default SearchForm;