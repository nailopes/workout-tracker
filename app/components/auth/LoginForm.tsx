'use client';

import { useState } from 'react';
import { loginUser, sendPasswordReset } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            router.push('/');
        } catch (err: any) {
            setMessage(err.message);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setMessage("Please enter your email to reset your password.");
            return;
        }

        try {
            await sendPasswordReset(email);
            setMessage("Password reset email sent.");
        } catch (err: any) {
            setMessage(err.message);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-xl font-semibold">Log In</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full rounded"
            />

            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full rounded pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                >
                    {showPassword ? '🙈' : '👁️'}
                </button>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                Log In
            </button>

            {message && <p className="text-sm text-red-600">{message}</p>}

            <div className="flex justify-between text-sm text-gray-600">
                <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
                <button type="button" onClick={handleResetPassword} className="text-blue-600 hover:underline">
                    Forgot password?
                </button>
            </div>
        </form>
    );
}
