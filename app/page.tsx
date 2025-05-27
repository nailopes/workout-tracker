'use client';

import useAuth from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import WorkoutTracker from '@/app/components/WorkoutTracker/WorkoutTracker';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redireciona se não estiver logada
    }
  }, [user, loading, router]);

  if (loading || !user) return <p className="p-6 text-center">Loading...</p>;

  return <WorkoutTracker />;
}
