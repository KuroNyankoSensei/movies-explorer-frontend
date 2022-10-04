import React from "react";
import './MenuButton.css';

function MenuButton({ onMenuButton }) {
    return (
        <button
            className="menu-btn"
            onClick={onMenuButton}
        />
    )
}

export default MenuButton;