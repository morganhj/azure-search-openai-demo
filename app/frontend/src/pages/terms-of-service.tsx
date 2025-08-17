import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";

const TermsOfService: React.FC = () => {
    const { i18n } = useTranslation();
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        // Determine the language and load the appropriate markdown file
        let lang = i18n.language || "es";
        // Only Spanish supported for now
        let file = `/legal/${lang}/terms-of-service.md`;
        fetch(file)
            .then(res => res.text())
            .then(text => {
                setMarkdown(text);
            });
    }, [i18n.language]);

    return (
        <div className="legal-page">
            <Markdown>{markdown}</Markdown>
        </div>
    );
};

export default TermsOfService;
