'use client';

interface Props {
    id: number;
    name: string;
    sets: number;
    reps: number;
    weight: string;
    rest: number;
    instructions: string;
    videoUrl?: string;
    onDelete?: (id: number) => void;
}

export default function ExerciseCard({
    id,
    name,
    sets,
    reps,
    weight,
    rest,
    instructions,
    videoUrl,
    onDelete,
}: Props) {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-blue-700">{name}</h3>
                {onDelete && (
                    <button onClick={() => onDelete(id)} className="text-red-500 text-sm hover:underline">
                        Delete
                    </button>
                )}
            </div>
            <p className="text-gray-700 text-sm">{sets} sets × {reps} reps</p>
            <p className="text-gray-700 text-sm">Weight: {weight}</p>
            <p className="text-gray-700 text-sm">Rest: {rest}s</p>
            <p className="text-gray-600 italic text-sm">{instructions}</p>
            {videoUrl && (
                <video src={videoUrl} controls className="w-full mt-2 rounded" />
            )}
        </div>
    );
}
