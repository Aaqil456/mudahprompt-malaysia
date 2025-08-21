import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function Header({ isAuthenticated = false, user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentPath = (path: string) => location.pathname === path;

  const handleSignOut = () => {
    // TODO: Implement actual sign out logic
    console.log('Sign out clicked');
  };

  const handleSignIn = () => {
    navigate(`/login?next=${encodeURIComponent(location.pathname)}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass-effect">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-bold text-xl text-gradient hover:scale-105 transition-transform"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">MP</span>
          </div>
          <span>MudahPrompt</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/">
            <Button 
              variant={isCurrentPath('/') ? 'secondary' : 'ghost'} 
              size="sm"
            >
              {t('nav.home')}
            </Button>
          </Link>
          <Link to="/prompt-assistant">
            <Button 
              variant={isCurrentPath('/prompt-assistant') ? 'secondary' : 'ghost'} 
              size="sm"
            >
              {t('nav.promptAssistant')}
            </Button>
          </Link>
          <Link to="/contact">
            <Button 
              variant={isCurrentPath('/contact') ? 'secondary' : 'ghost'} 
              size="sm"
            >
              {t('nav.contact')}
            </Button>
          </Link>
        </nav>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === 'ms' ? 'en' : 'ms')}
            className="space-x-1"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-medium">
              {lang === 'ms' ? 'BM' : 'EN'}
            </span>
          </Button>

          {/* Auth Button */}
          <div className="hidden md:block">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                >
                  {t('nav.signOut')}
                </Button>
              </div>
            ) : (
              <Button
                variant="accent"
                size="sm"
                onClick={handleSignIn}
              >
                {t('nav.signIn')}
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 glass-effect">
          <nav className="container py-4 space-y-2">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="block"
            >
              <Button 
                variant={isCurrentPath('/') ? 'secondary' : 'ghost'} 
                size="sm"
                className="w-full justify-start"
              >
                {t('nav.home')}
              </Button>
            </Link>
            <Link 
              to="/prompt-assistant" 
              onClick={() => setIsMenuOpen(false)}
              className="block"
            >
              <Button 
                variant={isCurrentPath('/prompt-assistant') ? 'secondary' : 'ghost'} 
                size="sm"
                className="w-full justify-start"
              >
                {t('nav.promptAssistant')}
              </Button>
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              className="block"
            >
              <Button 
                variant={isCurrentPath('/contact') ? 'secondary' : 'ghost'} 
                size="sm"
                className="w-full justify-start"
              >
                {t('nav.contact')}
              </Button>
            </Link>
            
            <div className="pt-4 border-t border-border/40">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="w-full justify-start"
                  >
                    {t('nav.signOut')}
                  </Button>
                </div>
              ) : (
                <Button
                  variant="accent"
                  size="sm"
                  onClick={handleSignIn}
                  className="w-full"
                >
                  {t('nav.signIn')}
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}