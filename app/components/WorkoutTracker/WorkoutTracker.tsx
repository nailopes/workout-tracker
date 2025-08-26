'use client';

import { useState, useEffect } from 'react';
import AddExerciseForm from './AddExerciseForm';
import ExerciseList from './ExerciseList';
import { loadWorkout, saveWorkout } from '@/app/lib/firebaseWorkout';
import { Exercise, NewExercise, WorkoutData, WorkoutDay, WorkoutName } from '@/app/types/Exercice';
import useAuth from '@/app/hooks/useAuth';

const initialWorkout: WorkoutData = {
    'Workout 1': {
        name: 'Workout 1',
        imageUrl: '/images/workout1.jpg',
        days: {
            'Day 1': [],
            'Day 2': [],
            'Day 3': [],
            'Day 4': [],
        },
    },
    'Workout 2': {
        name: 'Workout 2',
        imageUrl: '/images/workout2.jpg',
        days: {
            'Day 1': [],
            'Day 2': [],
            'Day 3': [],
            'Day 4': [],
        },
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
                if (!user?.email) return;
                const saved = await loadWorkout(user.uid);
                setWorkouts(saved ?? initialWorkout);
            } catch (err) {
                console.error('Erro ao carregar workout:', err);
            } finally {
                setHydrated(true);
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        if (hydrated && user?.email) {
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

        updated[selectedWorkout].days[selectedDay].push(withId);
        setWorkouts(updated);
        setShowForm(false);
    };

    const handleDeleteExercise = (exerciseId: string) => {
        const updated = { ...workouts };
        updated[selectedWorkout].days[selectedDay] = updated[selectedWorkout].days[selectedDay].filter(
            (ex) => ex.id !== exerciseId
        );
        setWorkouts(updated);
    };

    const handleEditExercise = (updatedExercise: Exercise | NewExercise) => {
        const updated = { ...workouts };
        const list = updated[selectedWorkout].days[selectedDay];
        updated[selectedWorkout].days[selectedDay] = list.map((ex) =>
            ex.id === (updatedExercise as Exercise).id ? (updatedExercise as Exercise) : ex
        );
        setWorkouts(updated);
        setEditingExercise(null);
        setShowForm(false);
    };

    const onAdd = editingExercise
        ? handleEditExercise
        : (handleAddExercise as (e: Exercise | NewExercise) => void);

    return (
        <div className="max-w-5xl mx-auto px-4 pt-24 pb-12 space-y-6">
            {/* Dropdowns de treino e dia */}
            <div className="grid md:grid-cols-2 gap-4">
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
                    {Object.keys(workouts[selectedWorkout].days).map((d) => (
                        <option key={d}>{d}</option>
                    ))}
                </select>
            </div>

            {/* Formulário de adicionar/exercício */}
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

            {/* Botão de adicionar */}
            <div className="flex justify-end">
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

            {/* Lista de exercícios */}
            <ExerciseList
                exercises={workouts[selectedWorkout].days[selectedDay]}
                onDelete={handleDeleteExercise}
                onEdit={(exercise) => {
                    setEditingExercise(exercise);
                    setShowForm(true);
                }}
            />

            {/* Mensagem de salvamento */}
            {saveMessage && (
                <div className="text-green-600 text-center text-sm">{saveMessage}</div>
            )}
        </div>
    );
}
