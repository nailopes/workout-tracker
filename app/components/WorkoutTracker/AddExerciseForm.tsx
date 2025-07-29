'use client';
import { useState } from 'react';
import { Exercise, NewExercise } from '@/app/types/Exercice';

interface AddExerciseFormProps {
    onAdd: (exercise: NewExercise | Exercise) => void;
    onCancel: () => void;
    initialData?: Exercise;
}


export default function AddExerciseForm({ onAdd, onCancel, initialData }: AddExerciseFormProps) {
    const [formData, setFormData] = useState<Omit<NewExercise, 'id'>>(
        initialData
            ? {
                name: initialData.name,
                sets: initialData.sets,
                reps: initialData.reps,
                weight: initialData.weight,
                rest: initialData.rest,
                instructions: initialData.instructions,
                videoUrl: initialData.videoUrl || '',
            }
            : {
                name: '',
                sets: '',
                reps: '',
                weight: '',
                rest: '',
                instructions: '',
                videoUrl: '',
            }
    );


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === 'sets' || name === 'rest' ? parseInt(value) || 0 : value,
        }));
    };

    return (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium mb-3">
                {initialData ? 'Edit Exercise' : 'Add New Exercise'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
                <input name="name" placeholder="Exercise Name" className="border p-2 rounded" value={formData.name} onChange={handleChange} />
                <input name="sets" type="number" placeholder="Sets" className="border p-2 rounded" value={formData.sets} onChange={handleChange} />
                <input name="reps" type="text" placeholder="Reps (e.g. 12 or 12–15)" className="border p-2 rounded" value={formData.reps} onChange={handleChange} />
                <input name="weight" placeholder="Weight (e.g. 20kg, bodyweight)" className="border p-2 rounded" value={formData.weight} onChange={handleChange} />
                <input name="rest" type="number" placeholder="Rest (seconds)" className="border p-2 rounded" value={formData.rest} onChange={handleChange} />
                <input name="videoUrl" placeholder="Video URL (optional)" className="border p-2 rounded" value={formData.videoUrl} onChange={handleChange} />
                <textarea name="instructions" placeholder="Instructions" className="border p-2 rounded md:col-span-2" rows={2} value={formData.instructions} onChange={handleChange} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
                <button onClick={() => onAdd(formData)} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    {initialData ? 'Update' : 'Add'}
                </button>
            </div>
        </div>
    );
}
