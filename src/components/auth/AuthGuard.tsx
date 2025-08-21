import { useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock authentication check - replace with real auth logic
  const isAuthenticated = false; // This would come from your auth context/hook

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login with the current path as 'next'
      const nextUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?next=${nextUrl}`);
    }
  }, [isAuthenticated, navigate, location]);

  // If not authenticated, don't render children (redirect is happening)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}