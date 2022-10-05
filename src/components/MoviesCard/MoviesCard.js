import React from "react";
import "./MoviesCard.css";
import image from "../../images/card-img.jpg"
import { Link } from "react-router-dom";

function MoviesCard() {
    return (
        <article className="movies-card">
            <Link to='#' className="movies-card__link">
                <img src={image} className="movies-card__image" alt="Alt изображения" />
                <div className="movies-card__info">
                    <div>
                        <h3 className="movies-card__title">33 слова о дизайне</h3>
                        <p className="movies-card__timing">1ч42м</p>
                    </div>
                    <button className="movies-card__btn" type="button"></button>
                </div>
            </Link>
        </article>
    )
};

export default MoviesCard;