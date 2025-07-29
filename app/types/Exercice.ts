export interface Exercise {
    id: string;
    name: string;
    sets: string;
    reps: string;
    weight: string;
    rest: string;
    instructions: string;
    videoUrl?: string;
}

export type NewExercise = Omit<Exercise, 'id'>;
export type WorkoutData = Record<string, Record<string, Exercise[]>>;
