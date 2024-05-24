import React from "react";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/app/components/template/email-template";

// Resendサービスのインスタンス化
const resend = new Resend(process.env.RESEND_API_KEY);
// Resendサービスの値
const RESEND_MAIL_ADDRESS = process.env.RESEND_MAIL_ADDRESS as string;
const RESEND_NAME = process.env.RESEND_NAME as string;

/**
 * Resendへメール送信API
 * @param request フォームデータ
 * @returns 送信結果
 */
export async function POST(request: Request) {
    // 詰め込んだフォームデータを受け取る
    const formData = await request.formData();

    // それぞれデータを取り出す
    const username = formData.get("username") as string;
    const email    = formData.get("email") as string;
    const subject  = formData.get("subject") as string;
    const content  = formData.get("content") as string;
    const file     = formData.get("file") as File;

    // 画像データだけはテキストで送られている。
    // その為、バイナリファイルに変換する必要がある。
    const buffer = await Buffer.from(await file.arrayBuffer());
    const resendName = RESEND_NAME.toLowerCase();
    
    try {
        // Resendサービスへ送信
        const {data, error} = await resend.emails.send({
            from: `${RESEND_NAME} <${resendName}@resend.dev>`,
            to: [RESEND_MAIL_ADDRESS],
            subject: subject,
            react: EmailTemplate({
                username, 
                email, 
                content,
            }) as React.ReactElement,
            attachments: [{
                filename: file.name, 
                content: buffer, 
            }]
        });

        if (error) {
            return NextResponse.json({ error });
        }

        return NextResponse.json({data});
    } catch (error) {
        return NextResponse.json({ error });
    }
}