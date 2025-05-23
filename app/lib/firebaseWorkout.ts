import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const loadWorkout = async (uid: string): Promise<any | null> => {
    try {
        const docRef = doc(db, 'workouts', uid);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error('Erro ao carregar workout do Firebase:', error);
        return null;
    }
};

export const saveWorkout = async (uid: string, data: any): Promise<void> => {
    try {
        const docRef = doc(db, 'workouts', uid);
        await setDoc(docRef, data);
    } catch (error) {
        console.error('Erro ao salvar workout no Firebase:', error);
    }
};
