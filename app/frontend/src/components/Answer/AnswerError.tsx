import { Stack, PrimaryButton } from "@fluentui/react";
import { ErrorCircle24Regular } from "@fluentui/react-icons";

import styles from "./Answer.module.css";

interface Props {
    error: string;
    onRetry: () => void;
}

export const AnswerError = ({ error, onRetry }: Props) => {
    // Regular expression to match [text](link) markdown
    console.log("Error message:", error);
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

    // Replace markdown links with <a> tags
    const errorWithLinks: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;
    while ((match = markdownLinkRegex.exec(error)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
            errorWithLinks.push(error.substring(lastIndex, match.index));
        }
        // Add the link
        errorWithLinks.push(
            <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer">
                {match[1]}
            </a>
        );
        lastIndex = markdownLinkRegex.lastIndex;
    }
    // Add any remaining text after the last match
    if (lastIndex < error.length) {
        errorWithLinks.push(error.substring(lastIndex));
    }

    return (
        <Stack className={styles.answerContainer} verticalAlign="space-between">
            <ErrorCircle24Regular aria-hidden="true" aria-label="Error icon" primaryFill="red" />

            <Stack.Item grow>
                <p className={styles.answerText}>{errorWithLinks}</p>
            </Stack.Item>

            <PrimaryButton className={styles.retryButton} onClick={onRetry} text="Reintentar" />
        </Stack>
    );
};
