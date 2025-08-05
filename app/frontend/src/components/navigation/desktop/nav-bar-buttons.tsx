import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LoginButton } from "../../buttons/login-button";
import { LogoutButton } from "../../buttons/logout-button";
import { SignupButton } from "../../buttons/signup-button";

export const NavBarButtons: React.FC = () => {
    const { isAuthenticated, user, isLoading } = useAuth0();

    return (
        <div className="nav-bar__buttons">
            {!isLoading && (
                <>
                    {!isAuthenticated && (
                        <>
                            <SignupButton />
                            <LoginButton />
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <LogoutButton />
                            {user && user.picture && <img src={user.picture} alt="Profile" className="nav-bar__avatar" />}
                        </>
                    )}
                </>
            )}
        </div>
    );
};
