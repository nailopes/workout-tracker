'use client';

import ExerciseCard from './ExerciseCard';

interface Exercise {
    id: number;
    name: string;
    sets: number;
    reps: number;
    weight: string;
    rest: number;
    instructions: string;
    videoUrl?: string;
}

interface ExerciseListProps {
    exercises: Exercise[];
    onDelete?: (id: number) => void;
}

export default function ExerciseList({ exercises, onDelete }: ExerciseListProps) {
    return (
        <div className="space-y-4">
            {exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} {...exercise} onDelete={onDelete} />
            ))}
        </div>
    );
}
