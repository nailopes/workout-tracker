'use client';

import LoginForm from '@/app/components/auth/LoginForm';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 shadow-md rounded bg-white">
                <LoginForm />
            </div>
        </div>
    );
}
