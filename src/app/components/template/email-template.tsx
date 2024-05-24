import React from "react";

interface EmailTemplateProps {
    username: string;
    email: string;
    content: string;
};

/**
 * Eメールテンプレート
 * @param username
 * @param email
 * @param content 
 * @returns JSX
 */
export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    username,
    email,
    content
}) => {
    return (
        <div>
            <h1>こんにちは、{username}です。</h1>
            <p>{email}から届きました。</p>
            <p>{content}</p>
        </div>
    );
};