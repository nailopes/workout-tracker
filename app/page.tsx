'use client';

import WorkoutTracker from './components/WorkoutTracker/WorkoutTracker';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <WorkoutTracker />
    </main>
  );
}
