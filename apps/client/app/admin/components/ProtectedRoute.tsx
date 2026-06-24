'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setTimeout(() => setIsAuthenticated(true), 0);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div className="p-10">Loading...</div>;
  }

  return <>{children}</>;
}
