import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from '@/lib/supabase/supabaseServer';

// CORS許可アドレス
const CORS_ADDRESS = process.env.CORS_ADDRESS as string;

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
        const response = NextResponse.json({ status: 401, error: 'Unauthorized' });
        response.headers.set('Access-Control-Allow-Origin', CORS_ADDRESS);
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return response;
    }

    const response = NextResponse.json({ user });
    response.headers.set('Access-Control-Allow-Origin', CORS_ADDRESS);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
}
