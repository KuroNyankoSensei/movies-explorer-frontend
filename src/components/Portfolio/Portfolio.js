import React from "react";
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__links">
                <li className="portfolio__link"><a href='https://github.com/KuroNyankoSensei/how-to-learn' target="_blank" rel="noopener noreferrer" className="portfolio__link-text">Статичный сайт<span>↗</span></a></li>
                <li className="portfolio__link"><a href='https://github.com/KuroNyankoSensei/russian-travel' target="_blank" rel="noopener noreferrer" className="portfolio__link-text">Адаптивный сайт<span>↗</span></a></li>
                <li className="portfolio__link"><a href='https://github.com/KuroNyankoSensei/react-mesto-auth' target="_blank" rel="noopener noreferrer" className="portfolio__link-text">Одностраничное приложение<span>↗</span></a></li>
            </ul>
        </section>
    )
}

export default Portfolio;