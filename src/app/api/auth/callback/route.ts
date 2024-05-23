import { NextRequest, NextResponse } from "next/server";
import { supabaseRouteHandlerClient } from "@/app/lib/supabaseRouteHandleClient";

/**
 * OAuth認証用Api
 * @param request 
 * @returns response
 */
export async function GET(
    request: NextRequest,
) {
    const requestURL = new URL(request.url);
    const code = requestURL.searchParams.get("code");
    console.log(code);

    if (code) {
        const supabase = supabaseRouteHandlerClient();
        await supabase.auth.exchangeCodeForSession(code);
    }

    // SupabaseのDatabaseのFunctionが発火される
    // プロフィールの追加

    return NextResponse.redirect(requestURL.origin);
}