'use client';

import useAuth from '@/app/hooks/useAuth';
import LogoutButton from '@/app/components/auth/LogoutButton';
import Link from 'next/link';

export default function Header() {
    const { user } = useAuth();

    return (
        <header className="bg-black text-white p-4 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    🏋️ Workout Tracker
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="text-sm">Welcome, {user.email}</span>
                            <LogoutButton />
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="hover:underline text-sm">Log In</Link>
                            <Link href="/signup" className="hover:underline text-sm">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
