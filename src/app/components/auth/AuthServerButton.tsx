import React from 'react';
import { supabaseServer } from '@/lib/supabase/supabaseServer';
import AuthClientButton from '@/app/components/auth/AuthClientButton';

/**
 * サーバーコンポーネント用認証ボタン
 * @returns クライアントコンポーネント用認証ボタン
 */
const AuthServerButton = async () => {
    // サーバーサイドでSupabaseを使って認証情報を取得し、それをクライアントサイドのコンポーネントに渡す役割を持ちます。

    const supabase = supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    // ユーザー情報が存在する場合、それを session プロパティとして AuthClientButton コンポーネントに渡します。
    // もし user が存在しない場合は、session プロパティに null を渡します。
    // AuthClientButton はこのセッション情報を使って、ユーザーのサインイン・サインアウト状態を管理します。
    return (
        <AuthClientButton session={user ? { user } : null} />
    );
}

export default AuthServerButton;