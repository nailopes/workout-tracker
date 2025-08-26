'use client';

import React from 'react';
import Image from 'next/image';
import { Pencil } from 'lucide-react';

interface WorkoutCardProps {
    name: string;
    imageUrl?: string;
    isSelected?: boolean;
    onClick: () => void;
    onEditName?: () => void; // opcional por enquanto
}

export default function WorkoutCard({
    name,
    imageUrl,
    isSelected = false,
    onClick,
    onEditName,
}: WorkoutCardProps) {
    return (
        <div
            className={`rounded-xl overflow-hidden shadow-md cursor-pointer border-2 transition-all ${isSelected ? 'border-blue-600' : 'border-transparent'
                }`}
            onClick={onClick}
        >
            <div className="relative w-full h-32 bg-gray-200">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        No image
                    </div>
                )}
            </div>

            <div className="p-3 flex items-center justify-between bg-white">
                <span className="text-lg font-semibold text-gray-800">{name}</span>
                {onEditName && (
                    <button onClick={(e) => { e.stopPropagation(); onEditName(); }}>
                        <Pencil className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                    </button>
                )}
            </div>
        </div>
    );
}
