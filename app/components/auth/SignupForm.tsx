'use client';

import { useState } from 'react';
import { registerUser } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
            router.push('/'); // ✅ redireciona para a home
        } catch (err: any) {
            setMessage(err.message);
        }
    };

    return (
        <form onSubmit={handleSignup} className="space-y-4">
            <h2 className="text-xl font-semibold">Sign Up</h2>
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
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Account</button>
            {message && <p className="text-sm text-red-600">{message}</p>}
        </form>
    );
}
