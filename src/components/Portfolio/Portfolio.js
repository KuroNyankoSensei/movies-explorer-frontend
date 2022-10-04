import React from "react";
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__links">
                <li href='https://github.com/KuroNyankoSensei/how-to-learn' className="portfolio__link" target="_blank" rel="noopener noreferrer">Статичный сайт<span>↗</span></li>
                <li href='https://github.com/KuroNyankoSensei/russian-travel' className="portfolio__link" target="_blank" rel="noopener noreferrer">Адаптивный сайт<span>↗</span></li>
                <li href='https://github.com/KuroNyankoSensei/react-mesto-auth' className="portfolio__link" target="_blank" rel="noopener noreferrer">Одностраничное приложение<span>↗</span></li>
            </ul>
        </section>
    )
}

export default Portfolio;