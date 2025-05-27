export interface Exercise {
    id: number;
    name: string;
    sets: number;
    reps: string;
    weight: string;
    rest: number;
    instructions: string;
    videoUrl?: string;
}

export type NewExercise = Omit<Exercise, 'id'>;
