import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

/**
 * サーバーコンポーネント用Supabase
 * @returns supabase
 */
export const supabaseServer = () => {
    cookies().getAll();
    return createServerComponentClient<Database>({ cookies });
};