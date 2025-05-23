'use client';
import ExerciseCard from './ExerciseCard';

interface Props {
    exercises: Array<{
        id: number;
        name: string;
        sets: number;
        reps: number;
        weight: string;
        rest: number;
        instructions: string;
        videoUrl: string;
    }>;
    onDelete: (id: number) => void;
}

export default function ExerciseList({ exercises, onDelete }: Props) {
    return (
        <div className="space-y-4">
            {exercises.map((ex) => (
                <ExerciseCard key={ex.id} {...ex} onDelete={onDelete} />
            ))}
        </div>
    );
}
