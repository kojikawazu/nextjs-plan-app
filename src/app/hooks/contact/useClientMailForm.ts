import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { contactFormSchema } from "@/app/lib/schema/contactFormSchema";
import { supabase } from "@/lib/supabase/supabaseClient";

/**
 * メールフォームのカスタムhooks
 * 
 * クライアントサイドでメールフォームのバリデーションと送信を扱うためのカスタムフック
 * @returns カスタムhooks
 */
export const useClientMailForm = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // フォームのバリデーションを扱っている。
    // zodスキーマをバリデーションのために使用する。
    // defaultValuesでフォームの初期値を設定する。
    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema), 
        defaultValues: {
            username: "",
            subject: "",
            email: "",
            content: "",
            file: undefined,
        },
    });

    // コンポーネントのマウント時にユーザー情報を取得する。
    // /api/auth/sessionエンドポイントにリクエストを送信し、
    // レスポンスからユーザー情報を取得してuserステートに設定します。
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch('/api/auth/user');
                if (!response.ok) {
                    throw new Error('Failed to fetch session');
                }
                const userData = await response.json();
                setUser(userData.user);
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                setLoading(false);
            }
        };

        getUserInfo();
    }, []);

    // Submit関数
    // 再レンダリングがかかっても関数を更新しない
    const onSubmit = useCallback(async (values: z.infer<typeof contactFormSchema>) => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        const {
            username,
            email, 
            subject, 
            content,
            // 画像データ[]
            file,
        } = values;

        // フォームのデータをインスタンス化
        // ここにデータを詰めて、APIに送信している。
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email",    email);
        formData.append("subject",  subject);
        formData.append("content",  content);
        formData.append("file",     file[0]);

        try {
            const session = await supabase.auth.getSession();
            if (!session) {
                console.error('Not session');
                return;
            }
            const accessToken = session.data?.session?.access_token;

            // APIへ送信
            // フォームデータを添付している。
            // 認証されたセッションデータを取得し、フォームデータとともに送信します。
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contact/send`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: formData,
            });
        } catch (err) {
            console.error(err);
        }
    }, [user]);

    return {
        form,
        onSubmit,
        user,
        loading,
    };
};