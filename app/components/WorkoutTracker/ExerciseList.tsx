'use client';
import ExerciseCard from './ExerciseCard';
import { Exercise } from '@/app/types/Exercice';

interface ExerciseListProps {
    exercises: Exercise[];
    onDelete: (id: number) => void;
    onEdit: (exercise: Exercise) => void;
}


export default function ExerciseList({ exercises, onDelete, onEdit }: ExerciseListProps) {
    return (
        <div className="space-y-4">
            {exercises.map((exercise) => (
                <ExerciseCard
                    key={exercise.id}
                    {...exercise}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}
