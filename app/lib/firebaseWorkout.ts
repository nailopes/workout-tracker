import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { WorkoutData } from '@/app/types/Exercice'; // Adjust path if needed

/**
 * Load a user's workout data from Firestore
 * @param uid Firebase Auth UID
 * @returns WorkoutData object or null if not found
 */
export const loadWorkout = async (uid: string): Promise<WorkoutData | null> => {
    try {
        const docRef = doc(db, 'workouts', uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return null;

        const data = docSnap.data();
        return data as WorkoutData;
    } catch (error) {
        console.error('Erro ao carregar workout do Firebase:', error);
        return null;
    }
};

/**
 * Save a user's workout data to Firestore
 * @param uid Firebase Auth UID
 * @param data WorkoutData object to save
 */
export const saveWorkout = async (uid: string, data: WorkoutData): Promise<void> => {
    try {
        const docRef = doc(db, 'workouts', uid);
        await setDoc(docRef, data);
    } catch (error) {
        console.error('Erro ao salvar workout no Firebase:', error);
    }
};
