import { NextRequest, NextResponse } from "next/server";
import { supabaseRouteHandlerClient } from "@/lib/supabase/supabaseRouteHandleClient";

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

    return NextResponse.redirect(requestURL.origin);
}