import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
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
              {t('lang') === 'ms'
                ? 'Platform AI terkemuka Malaysia untuk menjana prompt berkualiti tinggi. Tingkatkan produktiviti anda dengan teknologi AI terdepan.'
                : 'Malaysia\'s leading AI platform for generating high-quality prompts. Boost your productivity with cutting-edge AI technology.'
              }
            </p>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@mudahprompt.my</span>
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
            © 2024 MudahPrompt. {t('lang') === 'ms' ? 'Hak cipta terpelihara.' : 'All rights reserved.'}
          </div>
          
          <div className="text-sm text-muted-foreground">
            {t('legal.governingLaw')} • {t('legal.pdpaCompliance')}
          </div>
        </div>
      </div>
    </footer>
  );
}