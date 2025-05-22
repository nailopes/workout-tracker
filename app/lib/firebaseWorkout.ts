import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const saveWorkout = async (uid: string, data: any) => {
    try {
        await setDoc(doc(db, 'workouts', uid), data);
    } catch (err) {
        console.error('Erro ao salvar no Firebase:', err);
    }
};

export const loadWorkout = async (uid: string): Promise<any | null> => {
    try {
        const docSnap = await getDoc(doc(db, 'workouts', uid));
        return docSnap.exists() ? docSnap.data() : null;
    } catch (err) {
        console.error('Erro ao carregar do Firebase:', err);
        return null;
    }
};
