"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Session } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

/**
 * クライアントコンポーネント用認証ボタン
 * @param session
 * @returns JSX
 */
const AuthClientButton = ({
    session
}: {
    session: Session | null
}) => {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            // ここはSupabaseで設定したprovider
            provider: "github",
            options: {
                redirectTo: `${location.origin}/api/auth/callback`,
            }
        });
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

    return (
        <>
            {  session ? (
                <Button onClick={handleSignOut}>サインアウト</Button>
            ) : (
                <Button onClick={handleSignIn}>サインイン</Button>
            )}
        </>
    );
}

export default AuthClientButton;