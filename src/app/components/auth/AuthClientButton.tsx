"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/supabaseClient';

/**
 * クライアントコンポーネント用認証ボタン
 * @param session
 * @returns JSX
 */
const AuthClientButton = ({ 
    session 
}: { 
    session: { user: User } | null 
}) => {
    // ユーザーのセッション情報を受け取り、認証状態に基づいて適切なボタンを表示します。
    // session プロパティを受け取ります。このプロパティは、ユーザー情報を含むセッションオブジェクトです。
    // もしユーザーが認証されていない場合は null が渡されます。

    const router = useRouter();

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