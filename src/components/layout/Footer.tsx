import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Twitter, Instagram } from 'lucide-react';
import { FaTiktok, FaFacebookF } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">MP</span>
              </div>
              <span className="font-bold text-xl text-hero-gradient">MudahPrompt</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              {t('footer.description')}
            </p>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@mudahprompt.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>
                  {t('lang') === 'ms'
                    ? 'Kuala Lumpur, Malaysia'
                    : 'Kuala Lumpur, Malaysia'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">
              {t('lang') === 'ms' ? 'Pautan Pantas' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/prompt-assistant" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.promptAssistant')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">
              {t('lang') === 'ms' ? 'Undang-undang' : 'Legal'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 MudahPrompt. {t('lang') === 'ms' ? 'Hak cipta terpelihara AA AUTOMATE  202503088018 (LA0077548-K).' : 'All rights reserved. AA AUTOMATE  202503088018 (LA0077548-K)'}
          </div>
          
          <div className="flex space-x-4">
            <a href="https://x.com/MudahPrompt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://www.threads.com/@mudahprompt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://www.tiktok.com/@mudah.prompt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <FaTiktok className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/mudahprompt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <FaFacebookF className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}