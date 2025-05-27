'use client';
import { logoutUser } from '@/app/lib/auth';

export default function LogoutButton() {
    return (
        <button
            onClick={() => logoutUser()}
            className="text-sm text-black bg-white px-3 py-1 rounded hover:bg-red-600"
        >
            Log Out
        </button>
    );
}
