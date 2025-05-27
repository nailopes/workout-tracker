'use client';

import { useState } from 'react';
import { loginUser } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Log In</button>
            {message && <p className="text-sm text-red-600">{message}</p>}

            {/* ✅ Link para signup */}
            <p className="text-sm text-gray-600">
                Don’t have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
            </p>
        </form>
    );
}
