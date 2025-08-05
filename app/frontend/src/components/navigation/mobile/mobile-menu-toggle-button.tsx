import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

interface MobileMenuToggleButtonProps {
    icon: string;
    handleClick: () => void;
}

export const MobileMenuToggleButton: React.FC<MobileMenuToggleButtonProps> = ({ icon, handleClick }) => {
    const { isAuthenticated, user } = useAuth0();
    return (
        <span className="mobile-nav-bar__toggle material-icons" id="mobile-menu-toggle-button" onClick={handleClick}>
            {isAuthenticated && user && user.picture && <img src={user.picture} alt="Profile" className="nav-bar__avatar" />}
        </span>
    );
};
