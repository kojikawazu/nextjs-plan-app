"use client";

import React, { useEffect } from 'react';
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useClientMailForm } from '@/app/hooks/contact/useClientMailForm';

import 'react-toastify/dist/ReactToastify.css';

/**
 * メールフォームコンポーネント
 * @returns JSX
 */
const MailForm = () => {
    // formのカスタムhooks
    const {
        form,
        onSubmit,
        loading,
        user,
    } = useClientMailForm();
    const router = useRouter();

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            toast.success("メール送信に成功しました！");
        }
    }, [form.formState.isSubmitSuccessful]);

    if (loading) {
        return <ClipLoader />;
    }

    if (!user) {
        router.push("/");
    }

    return (
        <Form {...form}>
            <ToastContainer />
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="container flex flex-col gap-3">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ユーザー名</FormLabel>
                            <FormControl>
                                <Input placeholder="ユーザー名" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>メールアドレス</FormLabel>
                            <FormControl>
                                <Input placeholder="メールアドレス" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>主題</FormLabel>
                            <FormControl>
                                <Input placeholder="主題" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>本文</FormLabel>
                            <FormControl>
                                <Textarea placeholder="本文" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field: {value, onChange, ...fieldProps} }) => (
                        <FormItem>
                            <FormLabel>添付画像</FormLabel>
                            <FormControl>
                                <Input 
                                    accept="image/*" 
                                    type="file" 
                                    placeholder="画像"
                                    // ファイルの変更があったことを検知
                                    onChange={(event) => {
                                        // ファイルオブジェクトにアクセス
                                        onChange(event.target.files);
                                    }}
                                    {...fieldProps} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? <ClipLoader/> : "送信"}
                </Button>
            </form>
        </Form>
    );
}

export default MailForm;