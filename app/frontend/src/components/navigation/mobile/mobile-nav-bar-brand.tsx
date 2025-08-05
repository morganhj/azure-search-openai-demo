import React from "react";
import { NavLink } from "react-router-dom";
import appLogo from "../../../assets/applogo.svg";

interface MobileNavBarBrandProps {
    handleClick: () => void;
}

export const MobileNavBarBrand: React.FC<MobileNavBarBrandProps> = ({ handleClick }) => {
    return (
        <div onClick={handleClick} className="mobile-nav-bar__brand">
            <NavLink to="/">
                <img className="nav-bar__logo" src={appLogo} alt="App logo" />
            </NavLink>
        </div>
    );
};
