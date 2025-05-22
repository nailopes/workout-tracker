'use client';

interface VideoPlayerProps {
    src: string;
    title: string;
}

export default function VideoPlayer({ src, title }: VideoPlayerProps) {
    return (
        <video controls className="w-full rounded-lg">
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}