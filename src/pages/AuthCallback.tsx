import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthCallback() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  useEffect(() => {
    // Wait for auth state to be determined
    if (user) {
      const nextUrl = searchParams.get('next') || '/prompt-assistant';
      navigate(nextUrl);
    }
  }, [user, navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">
          {t('lang') === 'ms' ? 'Memproses...' : 'Processing...'}
        </h2>
        <p className="text-muted-foreground">
          {t('lang') === 'ms' 
            ? 'Kami sedang melengkapkan log masuk anda'
            : 'We are completing your sign in'
          }
        </p>
      </div>
    </div>
  );
}