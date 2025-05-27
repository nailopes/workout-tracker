import SignupForm from '@/app/components/auth/SignupForm';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 shadow-md rounded bg-white">
                <SignupForm />
            </div>
        </div>
    );
}
