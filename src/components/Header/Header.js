import React from "react";
import './Header.css';
import Navigation from "../Navigation/Navigation";
import NavigationMain from "../NavigationMain/NavigationMain";
import Logo from "../Logo/Logo";
import MenuButton from "../MenuButton/MenuButton";


function Header({ onMenuButton, page }) {

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

    return (
        <header className="header">
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