import React from "react";
import './Header.css';
import Navigation from "../Navigation/Navigation";
import NavigationMain from "../NavigationMain/NavigationMain";
import Logo from "../Logo/Logo";
import MenuButton from "../MenuButton/MenuButton";


function Header({ onMenuButton, page, loggedIn }) {

    if (!loggedIn) {
        return (
            <header className="header header_main">
                <div className="header__container">
                    <Logo />
                    <NavigationMain />
                </div>
            </header>
        );
    }

    return (
        <header className={`header ${page === "main" && 'header_main'}`}>
            <div className="header__container">
                <Logo />
                <Navigation />
                <MenuButton
                    onMenuButton={onMenuButton}
                />
            </div>
        </header>
    );
}

export default Header;