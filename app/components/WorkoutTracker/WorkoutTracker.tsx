'use client';

import { useState, useEffect } from 'react';
import AddExerciseForm from './AddExerciseForm';
import type { NewExercise } from './AddExerciseForm';
import ExerciseList from './ExerciseList';
import { loadWorkout, saveWorkout } from '@/app/lib/firebaseWorkout';

interface Exercise {
    id: number;
    name: string;
    sets: number;
    reps: number;
    weight: string;
    rest: number;
    instructions: string;
    videoUrl: string;
}

type WorkoutData = Record<string, Record<string, Exercise[]>>;

const initialWorkout: WorkoutData = {
    'Workout 1': {
        'Day 1': [],
        'Day 2': [],
        'Day 3': [],
        'Day 4': [],
    },
    'Workout 2': {
        'Day 1': [],
        'Day 2': [],
        'Day 3': [],
        'Day 4': [],
    },
};

export default function WorkoutTracker() {
    const [workouts, setWorkouts] = useState<WorkoutData>(initialWorkout);
    const [selectedWorkout, setSelectedWorkout] = useState('Workout 1');
    const [selectedDay, setSelectedDay] = useState('Day 1');
    const [showForm, setShowForm] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const saved = await loadWorkout('naiara@example.com');
                if (saved) setWorkouts(saved);
            } catch (err) {
                console.error('Erro ao carregar workout:', err);
            } finally {
                setHydrated(true);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (hydrated) {
            saveWorkout('naiara@example.com', workouts);
            setSaveMessage('Workout saved!');
            const timeout = setTimeout(() => setSaveMessage(''), 3000);
            return () => clearTimeout(timeout);
        }
    }, [workouts]);

    if (!hydrated) return null;

    const handleAddExercise = (newExercise: NewExercise) => {
        const updated = { ...workouts };
        const nextId = Math.max(
            ...Object.values(workouts)
                .flatMap((days) => Object.values(days).flatMap((exs) => exs.map((e) => e.id))),
            0
        ) + 1;

        const withId = { ...newExercise, id: nextId };
        updated[selectedWorkout][selectedDay].push(withId);
        setWorkouts(updated);
        setShowForm(false);
    };

    const handleDeleteExercise = (exerciseId: number) => {
        const updated = { ...workouts };
        updated[selectedWorkout][selectedDay] = updated[selectedWorkout][selectedDay].filter(
            (ex) => ex.id !== exerciseId
        );
        setWorkouts(updated);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700">🏋️ Workout Tracker</h1>
                {saveMessage && <span className="text-green-600 text-sm">{saveMessage}</span>}
            </header>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <select
                    value={selectedWorkout}
                    onChange={(e) => setSelectedWorkout(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    {Object.keys(workouts).map((w) => (
                        <option key={w}>{w}</option>
                    ))}
                </select>
                <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    {Object.keys(workouts[selectedWorkout]).map((d) => (
                        <option key={d}>{d}</option>
                    ))}
                </select>
            </div>

            {showForm ? (
                <AddExerciseForm onAdd={handleAddExercise} onCancel={() => setShowForm(false)} />
            ) : (
                <button
                    onClick={() => setShowForm(true)}
                    className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    + Add Exercise
                </button>
            )}

            <ExerciseList
                exercises={workouts[selectedWorkout][selectedDay]}
                onDelete={handleDeleteExercise}
            />
        </div>
    );
}
