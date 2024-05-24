import { NextRequest, NextResponse } from "next/server";
import { supabaseRouteHandlerClient } from "@/lib/supabase/supabaseRouteHandleClient";

// CORS許可アドレス
const CORS_ADDRESS = process.env.CORS_ADDRESS as string;

/**
 * OAuth認証用Api
 * @param request リクエスト
 * @returns response リダイレクト
 */
export async function GET(
    request: NextRequest,
) {
    const requestURL = new URL(request.url);
    const code = requestURL.searchParams.get("code");

    if (code) {
        const supabase = supabaseRouteHandlerClient();
        await supabase.auth.exchangeCodeForSession(code);
    }

    // SupabaseのDatabaseのFunctionが発火される
    // プロフィールの追加

    // CORSヘッダーを追加
    const response = NextResponse.redirect(requestURL.origin);
    response.headers.set('Access-Control-Allow-Origin', CORS_ADDRESS);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return NextResponse.redirect(requestURL.origin);
}