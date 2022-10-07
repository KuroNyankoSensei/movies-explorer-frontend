import React from "react";
import './SearchForm.css';
import icon from '../../images/find.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <div className="search__field">
                    <input
                        className="search__input"
                        placeholder="Фильм"
                        required
                    />
                    <button className="search__button" type="submit"><img src={icon} alt='Иконка' /></button>
                    <FilterCheckbox />
                </div>
            </form>
        </section>
    )
}

export default SearchForm;