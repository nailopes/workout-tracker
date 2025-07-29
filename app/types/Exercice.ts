export interface Exercise {
    id: number;
    name: string;
    sets: string;
    reps: string;
    weight: string;
    rest: string;
    instructions: string;
    videoUrl?: string;
}

export type NewExercise = Omit<Exercise, 'id'>;
