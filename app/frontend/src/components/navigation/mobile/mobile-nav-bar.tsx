import React from "react";
import { MobileMenuToggleButton } from "./mobile-menu-toggle-button";
import { MobileNavBarBrand } from "./mobile-nav-bar-brand";
import { MobileNavBarButtons } from "./mobile-nav-bar-buttons";
import { MobileNavBarTabs } from "./mobile-nav-bar-tabs";
import { useAuth0 } from "@auth0/auth0-react";

const MobileMenuState = {
    CLOSED: "closed",
    OPEN: "open"
} as const;

type MobileMenuStateType = (typeof MobileMenuState)[keyof typeof MobileMenuState];

const MobileMenuIcon = {
    CLOSE: "close",
    MENU: "menu"
} as const;

type MobileMenuIconType = (typeof MobileMenuIcon)[keyof typeof MobileMenuIcon];

export const MobileNavBar: React.FC = () => {
    const { isAuthenticated, user } = useAuth0();
    const [mobileMenuState, setMobileMenuState] = React.useState<MobileMenuStateType>(MobileMenuState.CLOSED);
    const [mobileMenuIcon, setMobileMenuIcon] = React.useState<MobileMenuIconType>(MobileMenuIcon.MENU);

    const isMobileMenuOpen = () => {
        return mobileMenuState === MobileMenuState.OPEN;
    };

    const closeMobileMenu = () => {
        document.body.classList.remove("mobile-scroll-lock");
        setMobileMenuState(MobileMenuState.CLOSED);
        setMobileMenuIcon(MobileMenuIcon.MENU);
    };

    const openMobileMenu = () => {
        document.body.classList.add("mobile-scroll-lock");
        setMobileMenuState(MobileMenuState.OPEN);
        setMobileMenuIcon(MobileMenuIcon.CLOSE);
    };

    const toggleMobileMenu = () => {
        if (isMobileMenuOpen()) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    };

    return (
        <div className="mobile-nav-bar__container">
            <nav className="mobile-nav-bar">
                <MobileNavBarBrand handleClick={closeMobileMenu} />
                <MobileMenuToggleButton icon={mobileMenuIcon} handleClick={toggleMobileMenu} />

                {isMobileMenuOpen() && (
                    <>
                        <div className="mobile-nav-bar__menu">
                            <MobileNavBarTabs handleClick={closeMobileMenu} />
                            <MobileNavBarButtons />
                        </div>
                    </>
                )}
            </nav>
        </div>
    );
};
