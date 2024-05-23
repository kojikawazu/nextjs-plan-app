import React from 'react';
import { supabaseServer } from '@/app/lib/supabaseServer';
import AuthClientButton from '@/app/components/auth/AuthClientButton';

/**
 * サーバーコンポーネント用認証ボタン
 * @returns JSX
 */
const AuthServerButton = async () => {
    const supabase = supabaseServer();
    const { data: user } = await supabase.auth.getSession();
    const session = user.session;

    return (
        <AuthClientButton session={session} />
    );
}

export default AuthServerButton;