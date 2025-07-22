import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export const registerUser = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
    return await signOut(auth);
};

export const sendPasswordReset = async (email: string) => {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
};
