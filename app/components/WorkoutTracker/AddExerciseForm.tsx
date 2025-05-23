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
    const [form, setForm] = useState<NewExercise>({
        name: '',
        sets: 3,
        reps: 10,
        weight: '',
        rest: 60,
        instructions: '',
        videoUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium mb-3">Add New Exercise</h3>
            <div className="grid md:grid-cols-2 gap-4">
                <input name="name" placeholder="Exercise Name" className="border p-2 rounded" onChange={handleChange} />
                <input name="sets" type="number" placeholder="Sets" className="border p-2 rounded" onChange={handleChange} />
                <input name="reps" type="number" placeholder="Reps" className="border p-2 rounded" onChange={handleChange} />
                <input name="weight" placeholder="Weight (e.g. 20kg, bodyweight)" className="border p-2 rounded" onChange={handleChange} />
                <input name="rest" type="number" placeholder="Rest (seconds)" className="border p-2 rounded" onChange={handleChange} />
                <input name="videoUrl" placeholder="Video URL (MP4 or local)" className="border p-2 rounded" onChange={handleChange} />
                <textarea name="instructions" placeholder="Instructions" className="border p-2 rounded md:col-span-2" rows={2} onChange={handleChange} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                <button onClick={() => onAdd(form)} className="px-4 py-2 bg-blue-600 text-white rounded-md">Add</button>
            </div>
        </div>
    );
}
