"use client"
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await fetch('/api/validateToken');
        const result = await response.json();

        if (!result.valid) {
          throw new Error(`Invalid token. ${result.error}`);
        }

        // Token is valid, you can proceed with setting user state or additional logic
        setUser(/* Set user data if needed */);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);

        // Redirect to the login page on error
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    // Call the function immediately
    checkTokenValidity();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <main>{children}</main>
    </div>
  );
}
