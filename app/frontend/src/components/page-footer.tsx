import React from "react";
import { PageFooterHyperlink } from "./page-footer-hyperlink";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const PageFooter: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="page-footer">
            <div className="page-footer-grid">
                <div className="page-footer-grid__info">
                    <div className="page-footer-links">
                        <NavLink to="/privacy-policy" className="page-footer__hyperlink">
                            {t("footer.privacyPolicy")}
                        </NavLink>
                        <span style={{ margin: "0 8px" }}>&middot;</span>
                        <NavLink to="/terms-of-service" className="page-footer__hyperlink">
                            {t("footer.termsOfService")}
                        </NavLink>
                    </div>
                    <div className="page-footer-copyright">{t("footer.copyright", { year: new Date().getFullYear() })}</div>
                </div>
            </div>
        </footer>
    );
};
