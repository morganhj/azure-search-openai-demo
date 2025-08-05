import React, { useState, useEffect, useRef, RefObject } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Layout.module.css";

import { useLogin } from "../../authConfig";

import { LoginButton } from "../../components/LoginButton";
import { IconButton, Panel, PanelType } from "@fluentui/react";

const Layout = () => {
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false); // Declare the isPanelOpen state
    const menuRef: RefObject<HTMLDivElement> = useRef(null);
    // Function to open the Panel (Sidebar)
    const openPanel = () => setIsPanelOpen(true);

    // Function to close the Panel (Sidebar)
    const closePanel = () => setIsPanelOpen(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer} ref={menuRef}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <h3 className={styles.headerTitle}>{t("headerTitle")}</h3>
                    </Link>

                    <div onClick={openPanel} className={styles.instructionsButton}>
                        <p className={styles.instructionsButtonText}>Instrucciones</p>
                    </div>
                    {/* Add navigation links here */}
                    {/* <nav>
                        <ul className={styles.navList}>
                            <li>
                                <NavLink
                                    to="/"  // Link to Chat
                                    className={({ isActive }) => (isActive ? styles.activeLink : "")}
                                >
                                    Chat
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/ask"  // Link to Ask
                                    className={({ isActive }) => (isActive ? styles.activeLink : "")}
                                >
                                    Ask
                                </NavLink>
                            </li>
                        </ul>
                    </nav> */}

                    {/* <nav>
                        <ul className={`${styles.headerNavList} ${menuOpen ? styles.show : ""}`}>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {t("chat")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/qa"
                                    className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {t("qa")}
                                </NavLink>
                            </li>
                        </ul>
                    </nav> */}
                    {/* <div className={styles.loginMenuContainer}>
                        {useLogin && <LoginButton />}
                        <IconButton
                            iconProps={{ iconName: "GlobalNavButton" }}
                            className={styles.menuToggle}
                            onClick={toggleMenu}
                            ariaLabel={t("labels.toggleMenu")}
                        />
                    </div> */}
                </div>
            </header>

            <Outlet />
            {/* Sidebar (Panel) with the information */}
            <Panel isOpen={isPanelOpen} onDismiss={closePanel} type={PanelType.medium} headerText="Información importante">
                <div>
                    <p>
                        <strong>El Soldado Digital está diseñado para responder según los reglamentos del NIB.</strong> Cuanto más precisa sea tu consulta, mejores respuestas recibirás.
                    </p>
                    <p>Recordá que el chat se borra periódicamente. Si tenés conversaciones importantes, asegurate de exportar el texto y guardarlo localmente.</p>
                    <p>
                        <strong>Soldado Digital es un producto en desarrollo.</strong> Si querés que se incorporen nuevos documentos a la base de datos, por favor, enviálos a <a href="mailto:copiascampodemayo@gmail.com">copiascampodemayo@gmail.com</a>.
                    </p>
                    <p>
                        Si necesitás una <strong>alocución</strong> o <strong>trabajo de gabinete</strong>, podés acceder a una versión del Soldado Digital especialmente entrenado para ello escribiendo al WhatsApp <strong>1544179151</strong>. Este <a href="https://api.whatsapp.com/send?phone=5491144179151">link</a> te lleva directamente.
                    </p>
                    <p>
                        Si hacés clic en la <strong>Fuente</strong>, se abrirá el PDF relevante. Este proceso puede tardar hasta un minuto; estamos trabajando para hacerlo más rápido.
                    </p>
                    <p>
                        <strong>El Soldado Digital tiene más funcionalidades en la computadora que en el celular.</strong>
                    </p>
                    <p>
                        <strong>Tu opinión es importante para nosotros.</strong> Si tenés sugerencias o encontrás errores, por favor, envianos un correo a <a href="mailto:copiascampodemayo@gmail.com">copiascampodemayo@gmail.com</a>.
                    </p>
                 </div>
            </Panel>
        </div>
    );
};

export default Layout;
