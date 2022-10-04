import React from "react";
import "./Main.css";
import Intro from "../Intro/Intro";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

function Main() {
    return (
        <main className="main">
            <Intro />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
        </main>
    );
}

export default Main;