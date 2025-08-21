import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AuthCallback() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // TODO: Handle actual Supabase auth callback
        console.log('Processing auth callback...');
        
        // Mock successful authentication
        const nextUrl = searchParams.get('next') || '/prompt-assistant';
        
        // Simulate authentication processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Redirect to intended destination
        navigate(nextUrl);
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/login?error=auth_failed');
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

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