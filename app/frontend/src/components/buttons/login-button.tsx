import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

interface LoginButtonProps {
    customClasses?: string;
    customLabel?: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ customClasses, customLabel }) => {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            prompt: "login",
            appState: {
                returnTo: "/chat"
            }
        });
    };

    return (
        <button className={customClasses ? customClasses : "button__login"} onClick={handleLogin}>
            {customLabel ? customLabel : "Iniciar sesión"}
        </button>
    );
};
