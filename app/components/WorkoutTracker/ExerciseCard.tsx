'use client';

import { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import { MoreVertical } from 'lucide-react';
import { Exercise } from '@/app/types/Exercice';


interface ExerciseCardProps {
    id: number;
    name: string;
    sets: number;
    reps: string;
    weight: string;
    rest: number;
    instructions: string;
    videoUrl?: string;
    onDelete?: (id: number) => void;
    onEdit?: (exercise: Exercise) => void;
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
    onEdit,
}: ExerciseCardProps) {

    const [showMenu, setShowMenu] = useState(false);

    const confirmDelete = () => {
        const confirmed = window.confirm('Are you sure you want to delete this exercise?');
        if (confirmed && onDelete) onDelete(id);
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 space-y-2 relative">
            {/* Botão de menu de três pontos */}
            <div className="absolute top-2 right-2">
                <button onClick={() => setShowMenu(!showMenu)}>
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>

                {showMenu && (
                    <div className="absolute right-0 mt-2 bg-white border shadow rounded text-sm z-10">
                        <button
                            onClick={() =>
                                onEdit?.({
                                    id,
                                    name,
                                    sets,
                                    reps,
                                    weight,
                                    rest,
                                    instructions,
                                    videoUrl: videoUrl || '',
                                })
                            }
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-gray-700"
                        >
                            Edit
                        </button>


                        <button
                            onClick={confirmDelete}
                            className="block px-4 py-2 hover:bg-red-100 w-full text-left text-red-600"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <h3 className="text-xl font-semibold text-blue-700">{name}</h3>
            <p className="text-gray-700 text-sm">{sets} sets × {reps} reps</p>
            <p className="text-gray-700 text-sm">Weight: {weight}</p>
            <p className="text-gray-700 text-sm">Rest: {rest}s</p>
            <p className="text-gray-600 italic text-sm">{instructions}</p>
            {videoUrl && <VideoPlayer src={videoUrl} title={name} />}
        </div>
    );
}
