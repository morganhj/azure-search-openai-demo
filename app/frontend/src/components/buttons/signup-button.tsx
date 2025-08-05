import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

interface SignupButtonProps {
    customClasses?: string;
    customLabel?: string;
}

export const SignupButton: React.FC<SignupButtonProps> = ({ customClasses, customLabel }) => {
    const { loginWithRedirect } = useAuth0();

    const handleSignUp = async () => {
        await loginWithRedirect({
            prompt: "login",
            screen_hint: "signup",
            appState: {
                returnTo: "/chat"
            }
        });
    };

    return (
        <button className={customClasses ? customClasses : "button__sign-up"} onClick={handleSignUp}>
            {customLabel ? customLabel : "Registrarse"}
        </button>
    );
};
