import React from 'react';
import MailForm from '@/app/components/contact/MailForm';

/**
 * お問い合わせページ
 * @returns JSX
 */
const ContactPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
        <h2 className="font-semibold text-2xl mb-4">
            お問い合わせフォーム
        </h2>
        <MailForm />
    </div>
  );
}

export default ContactPage;