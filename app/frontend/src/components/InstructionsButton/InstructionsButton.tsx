import { Info24Regular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";

import styles from "./InstructionsButton.module.css";

interface Props {
    className?: string;
    onClick: () => void;
    disabled?: boolean;
}

export const InstructionsButton = ({ className, disabled, onClick }: Props) => {
    const { t } = useTranslation();
    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Button icon={<Info24Regular />} disabled={disabled} onClick={onClick}>
                {t("instructions")}
            </Button>
        </div>
    );
};
