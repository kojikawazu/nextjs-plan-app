import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from '@/lib/supabase/supabaseServer';

/**
 * 認証ユーザーの取得API
 * @param request リクエスト
 * @returns response 認証ユーザー
 */
export async function GET(
    request: NextRequest,
) {
    const supabase = supabaseServer();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        return NextResponse.json({ status: 401, error: 'Unauthorized' });
    }

    return NextResponse.json({ user });
}
