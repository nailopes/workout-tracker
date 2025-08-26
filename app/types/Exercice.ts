// Representa um exercício individual
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

// Versão usada no formulário antes de gerar o ID
export type NewExercise = Omit<Exercise, 'id'>;

// Lista de dias válidos por treino
export type WorkoutDay = 'Day 1' | 'Day 2' | 'Day 3' | 'Day 4';

// Nome dos treinos (chaves do objeto WorkoutData)
export type WorkoutName = 'Workout 1' | 'Workout 2';

// Representa a estrutura de um treino com nome, imagem e os dias com exercícios
export interface Workout {
    name: WorkoutName;
    imageUrl: string;
    days: Record<WorkoutDay, Exercise[]>;
}

// Estrutura completa de todos os treinos do usuário
export type WorkoutData = Record<WorkoutName, Workout>;
