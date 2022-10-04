import React from "react";
import './Header.css';
import NavigationMain from "../NavigationMain/NavigationMain";
import Logo from "../Logo/Logo";

function Header({ page }) {

    if (page) {
        return (
            <header className="header header_main">
                <div className="header__container">
                    <Logo />
                    <NavigationMain />
                </div>
            </header>
        );
    }
}

export default Header;