import React from "react";
import { NavLink } from "react-router-dom";
import appLogo from "../../../assets/applogo.svg";

export const NavBarBrand: React.FC = () => {
    return (
        <div className="nav-bar__brand">
            <NavLink to="/">
                <img className="nav-bar__logo" src={appLogo} alt="App logo" />
            </NavLink>
        </div>
    );
};
