import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface ForgotPasswordProps {
    status?: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    const { errors } = usePage().props;

    useEffect(() => {
        if (errors.api_debug) {
            try {
                const apiDebug = JSON.parse(errors.api_debug as string);
                console.error('🔴 API Password Reset Error:', apiDebug);
            } catch (e) {
                // Ignore parsing errors
            }
        }
    }, [errors]);

    return (
        <AuthLayout
            title="Forgot your password?"
            description="Enter your username and we'll send you a temporary password"
        >
            <Head title="Forgot Password" />

            {status && (
                <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
                    {status}
                </div>
            )}

            <Form method="post" className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                required
                                autoFocus
                                placeholder="username"
                            />
                            <InputError message={errors.username} />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            {processing && <Spinner />}
                            Send Temporary Password
                        </Button>

                        <div className="text-center text-sm">
                            <Link
                                href="/login"
                                className="text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            >
                                Back to login
                            </Link>
                        </div>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
