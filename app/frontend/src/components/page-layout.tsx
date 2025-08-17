import React from "react";
import { NavBar } from "./navigation/desktop/nav-bar";
import { MobileNavBar } from "./navigation/mobile/mobile-nav-bar";
import { Outlet } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "../auth0-provider-with-navigate";
import { PageFooter } from "./page-footer";

export const PageLayout: React.FC = () => {
    return (
        <Auth0ProviderWithNavigate>
            <div className="page-layout">
                <NavBar />
                <MobileNavBar />
                <div className="page-layout__content">
                    <Outlet />
                </div>
                <PageFooter />
            </div>
        </Auth0ProviderWithNavigate>
    );
};
