import React, { ReactNode } from "react";

interface PageFooterHyperlinkProps {
    children: ReactNode;
    path: string;
}

export const PageFooterHyperlink: React.FC<PageFooterHyperlinkProps> = ({ children, path }) => {
    return (
        <a className="page-footer__hyperlink" href={path} rel="noopener noreferrer">
            {children}
        </a>
    );
};
