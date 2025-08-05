import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import { initializeIcons } from "@fluentui/react";

import "./index.css";
import "./styles/styles.css";

import Chat from "./pages/chat/Chat";
import LayoutWrapper from "./layoutWrapper";
import i18next from "./i18n/config";
import { AuthenticationGuard } from "./components/authentication-guard";
import { PageLayout } from "./components/page-layout";
import { PublicPage } from "./pages/public-page";

import MercadoPagoCallback from "./pages/mercadopago-callback";

initializeIcons();

const router = createHashRouter([
    {
        path: "/",
        element: <LayoutWrapper />,
        children: [
            {
                index: true,
                element: <PublicPage />
            },
            {
                path: "callback",
                element: <AuthenticationGuard component={Chat} />
            },
            {
                path: "chat",
                element: <AuthenticationGuard component={Chat} />
            },
            {
                path: "mercadopago/callback",
                element: <AuthenticationGuard component={MercadoPagoCallback} />
            },
            {
                path: "*",
                lazy: () => import("./pages/NoPage")
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <HelmetProvider>
                <RouterProvider router={router} />
            </HelmetProvider>
        </I18nextProvider>
    </React.StrictMode>
);
