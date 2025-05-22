'use client';

import { useState } from 'react';

export interface NewExercise {
    name: string;
    sets: number;
    reps: number;
    weight: string;
    rest: number;
    instructions: string;
    videoUrl: string;
}

interface Props {
    onAdd: (exercise: NewExercise) => void;
    onCancel: () => void;
}

export default function AddExerciseForm({ onAdd, onCancel }: Props) {
    const [newExercise, setNewExercise] = useState<NewExercise>({
        name: '',
        sets: 3,
        reps: 10,
        weight: '',
        rest: 60,
        instructions: '',
        videoUrl: '',
    });

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setNewExercise((prev) => ({ ...prev, videoUrl: url }));
        }
    };

    return (
        <div className="bg-blue-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Add New Exercise</h3>
            <div className="grid md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Exercise name"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                    className="border p-2 rounded-md w-full"
                />
                <input
                    type="text"
                    placeholder="Weight (e.g. 20kg, bodyweight)"
                    value={newExercise.weight}
                    onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                    className="border p-2 rounded-md w-full"
                />
                <input
                    type="number"
                    placeholder="Sets"
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise({ ...newExercise, sets: parseInt(e.target.value) })}
                    className="border p-2 rounded-md w-full"
                />
                <input
                    type="number"
                    placeholder="Reps"
                    value={newExercise.reps}
                    onChange={(e) => setNewExercise({ ...newExercise, reps: parseInt(e.target.value) })}
                    className="border p-2 rounded-md w-full"
                />
                <input
                    type="number"
                    placeholder="Rest (sec)"
                    value={newExercise.rest}
                    onChange={(e) => setNewExercise({ ...newExercise, rest: parseInt(e.target.value) })}
                    className="border p-2 rounded-md w-full"
                />
                <input
                    type="file"
                    accept="video/mp4"
                    onChange={handleVideoUpload}
                    className="border p-2 rounded-md w-full"
                />
                <textarea
                    placeholder="Instructions"
                    value={newExercise.instructions}
                    onChange={(e) => setNewExercise({ ...newExercise, instructions: e.target.value })}
                    className="border p-2 rounded-md w-full md:col-span-2"
                    rows={2}
                />
            </div>
            <div className="mt-4 flex gap-2 justify-end">
                <button
                    onClick={onCancel}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onAdd(newExercise)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Add Exercise
                </button>
            </div>
        </div>
    );
}