import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-gradient mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">
            {t('lang') === 'ms' ? 'Halaman Tidak Ditemui' : 'Page Not Found'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t('lang') === 'ms' 
              ? 'Maaf, halaman yang anda cari tidak wujud atau telah dialihkan.'
              : 'Sorry, the page you are looking for does not exist or has been moved.'
            }
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="accent" size="lg">
              {t('nav.home')}
            </Button>
          </Link>
          <Link to="/prompt-assistant">
            <Button variant="outline" size="lg">
              {t('nav.promptAssistant')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
