import { Auth0Provider } from "@auth0/auth0-react";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Auth0ProviderWithNavigateProps {
    children: ReactNode;
}

export const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({ children }) => {
    const navigate = useNavigate();

    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const onRedirectCallback = (appState: { returnTo?: string } | undefined) => {
        navigate(appState?.returnTo || window.location.pathname, { replace: true });
    };

    if (!(domain && clientId && redirectUri)) {
        return null;
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={redirectUri}
            onRedirectCallback={onRedirectCallback}
            authorizationParams={{
                redirect_uri: redirectUri,
                ui_locales: "es"
            }}
        >
            {children}
        </Auth0Provider>
    );
};
