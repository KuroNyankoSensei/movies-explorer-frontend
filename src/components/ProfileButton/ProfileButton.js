import React from "react";
import { NavLink } from "react-router-dom";
import './ProfileButton.css';

function ProfileButton() {
    return (
        <NavLink to="/profile" className="profile-btn">
            Аккаунт
        </NavLink>
    )
}

export default ProfileButton;