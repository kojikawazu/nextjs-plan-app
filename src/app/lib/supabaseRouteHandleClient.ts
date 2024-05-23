import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";

/**
 * SupabaseのRoute用
 * @returns createRouteHandlerClient
 */
export const supabaseRouteHandlerClient = () => {
    cookies().getAll();
    return createRouteHandlerClient<Database>({ cookies });
};