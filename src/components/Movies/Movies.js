import React, { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css';
import Preloader from "../Preloader/Preloader";

function Movies() {

    const [isLoading, setLoading] = useState(false);

    return (
        <main className="movies-page">
            <SearchForm />
            <Preloader
                isOn={isLoading}
            />
            <MoviesCardList />
        </main>
    )
}

export default Movies;