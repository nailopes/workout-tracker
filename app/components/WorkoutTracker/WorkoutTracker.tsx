'use client';

import { useState, useEffect } from 'react';
import AddExerciseForm from './AddExerciseForm';
import ExerciseList from './ExerciseList';
import { loadWorkout, saveWorkout } from '@/app/lib/firebaseWorkout';
import { Exercise, NewExercise, WorkoutData } from '@/app/types/Exercice';
import useAuth from '@/app/hooks/useAuth';

// 💡 Strict union types for full type safety
type WorkoutName = 'Workout 1' | 'Workout 2';
type WorkoutDay = 'Day 1' | 'Day 2' | 'Day 3' | 'Day 4';

const initialWorkout: WorkoutData = {
    'Workout 1': {
        'Day 1': [] as Exercise[],
        'Day 2': [] as Exercise[],
        'Day 3': [] as Exercise[],
        'Day 4': [] as Exercise[],
    },
    'Workout 2': {
        'Day 1': [] as Exercise[],
        'Day 2': [] as Exercise[],
        'Day 3': [] as Exercise[],
        'Day 4': [] as Exercise[],
    },
};

export default function WorkoutTracker() {
    const [workouts, setWorkouts] = useState<WorkoutData>(initialWorkout);
    const [selectedWorkout, setSelectedWorkout] = useState<WorkoutName>('Workout 1');
    const [selectedDay, setSelectedDay] = useState<WorkoutDay>('Day 1');
    const [showForm, setShowForm] = useState(false);
    const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
    const [saveMessage, setSaveMessage] = useState('');
    const [hydrated, setHydrated] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user?.uid) return;
                const saved = await loadWorkout(user.uid);
                if (saved) {
                    setWorkouts(saved);
                } else {
                    setWorkouts(initialWorkout);
                }
            } catch (err) {
                console.error('Erro ao carregar workout:', err);
            } finally {
                setHydrated(true);
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        if (hydrated && user?.uid) {
            saveWorkout(user.uid, workouts);
            setSaveMessage('Workout saved!');
            const timeout = setTimeout(() => setSaveMessage(''), 3000);
            return () => clearTimeout(timeout);
        }
    }, [workouts, hydrated, user]);

    if (!hydrated) return null;

    const handleAddExercise = (newExercise: NewExercise) => {
        const withId: Exercise = { ...newExercise, id: crypto.randomUUID() };
        const updated = { ...workouts };
        updated[selectedWorkout][selectedDay].push(withId);
        setWorkouts(updated);
        setShowForm(false);
    };

    const handleDeleteExercise = (exerciseId: string) => {
        const updated = { ...workouts };
        updated[selectedWorkout][selectedDay] = updated[selectedWorkout][selectedDay].filter(
            (ex) => ex.id !== exerciseId
        );
        setWorkouts(updated);
    };

    const handleEditExercise = (updatedExercise: NewExercise | Exercise) => {
        const updated = { ...workouts };
        const list = updated[selectedWorkout][selectedDay];
        updated[selectedWorkout][selectedDay] = list.map((ex) =>
            ex.id === (updatedExercise as Exercise).id ? updatedExercise : ex
        );
        setWorkouts(updated);
        setEditingExercise(null);
        setShowForm(false);
    };

    const onAdd = editingExercise
        ? handleEditExercise
        : (handleAddExercise as (e: NewExercise | Exercise) => void);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700">🏋️ Workout Tracker</h1>
                {saveMessage && <span className="text-green-600 text-sm">{saveMessage}</span>}
            </header>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <select
                    value={selectedWorkout}
                    onChange={(e) => setSelectedWorkout(e.target.value as WorkoutName)}
                    className="p-2 border rounded-md"
                >
                    {Object.keys(workouts).map((w) => (
                        <option key={w}>{w}</option>
                    ))}
                </select>

                <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value as WorkoutDay)}
                    className="p-2 border rounded-md"
                >
                    {Object.keys(workouts[selectedWorkout]).map((d) => (
                        <option key={d}>{d}</option>
                    ))}
                </select>
            </div>

            {showForm && (
                <AddExerciseForm
                    onAdd={onAdd}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingExercise(null);
                    }}
                    initialData={editingExercise ?? undefined}
                />
            )}

            <div className="flex justify-end mb-4">
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditingExercise(null);
                    }}
                    className="px-4 py-2 bg-blue-700 text-white rounded-md"
                >
                    + Add Exercise
                </button>
            </div>

            <ExerciseList
                exercises={workouts[selectedWorkout][selectedDay]}
                onDelete={handleDeleteExercise}
                onEdit={(exercise) => {
                    setEditingExercise(exercise);
                    setShowForm(true);
                }}
            />
        </div>
    );
}
