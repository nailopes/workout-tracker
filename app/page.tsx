'use client';

import WorkoutTracker from './components/WorkoutTracker/WorkoutTracker';

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-8">
      <WorkoutTracker />
    </main>
  );
}