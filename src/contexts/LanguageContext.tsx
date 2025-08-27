import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ms' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Malaysian-English translations
const translations = {
  ms: {
    // Common
    'common.loading': 'Memuatkan...',
    'common.save': 'Simpan',
    'common.cancel': 'Batal',
    'common.edit': 'Edit',
    'common.copy': 'Salin',
    'common.generate': 'Jana',
    'common.clear': 'Kosongkan',
    'common.search': 'Cari',
    'common.filter': 'Tapis',
    'common.back': 'Kembali',
    'common.next': 'Seterusnya',
    'common.previous': 'Sebelumnya',
    
    // Navigation
    'nav.home': 'Laman Utama',
    'nav.promptAssistant': 'Pembantu Prompt',
    'nav.contact': 'Hubungi Kami',
    'nav.privacy': 'Dasar Privasi',
    'nav.terms': 'Terma & Syarat',
    'nav.signIn': 'Log Masuk',
    'nav.signOut': 'Log Keluar',
    
    // Landing Page
    'hero.title': 'Pembantu Prompt AI Malaysia',
    'hero.subtitle': 'Platform canggih untuk menjana prompt AI yang berkualiti tinggi',
    'hero.cta': 'Mulakan Sekarang',
    'hero.learnMore': 'Ketahui Lebih Lanjut',
    
    // Features
    'features.title': 'Ciri-ciri Utama',
    'features.bilingual.title': 'Dwibahasa',
    'features.bilingual.desc': 'Sokongan penuh untuk Bahasa Malaysia dan Inggeris',
    'features.ai.title': 'Kuasa AI',
    'features.ai.desc': 'Pembantu AI pintar untuk jawapan yang tepat',
    'features.mobile.title': 'Responsif',
    'features.mobile.desc': 'Pengalaman terbaik di semua peranti',
    
    // Prompt Assistant
    'assistant.title': 'Pembantu Prompt',
    'assistant.selectAssistant': 'Pilih Pembantu',
    'assistant.customInstructions': 'Arahan Khas',
    'assistant.aiAnswer': 'Jawapan AI',
    'assistant.generatePrompt': 'Jana Prompt',
    'assistant.editPrompt': 'Edit Prompt',
    'assistant.savePrompt': 'Simpan Prompt',
    'assistant.copyPrompt': 'Salin Prompt',
    
    // Contact
    'contact.title': 'Hubungi Kami',
    'contact.subtitle': 'Kami sedia membantu anda',
    'contact.placeholder': 'Taip mesej anda di sini...',
    'contact.send': 'Hantar',
    'contact.email': 'E-mel: support@mudahprompt.my',
    
    // Auth
    'auth.welcome': 'Selamat datang ke MudahPrompt',
    'auth.signInGoogle': 'Log masuk dengan Google',
    'auth.loginRequired': 'Sila log masuk untuk menggunakan Pembantu Prompt',
    
    // Legal
    'legal.privacy.title': 'Dasar Privasi',
    'legal.terms.title': 'Terma & Syarat',
    'legal.effectiveDate': 'Berkuatkuasa: {date}',
    'legal.governingLaw': 'Tertakluk kepada undang-undang Malaysia',
    'legal.pdpaCompliance': 'Mematuhi Akta Perlindungan Data Peribadi (PDPA) 2010',
  },
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.copy': 'Copy',
    'common.generate': 'Generate',
    'common.clear': 'Clear',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    
    // Navigation
    'nav.home': 'Home',
    'nav.promptAssistant': 'Prompt Assistant',
    'nav.contact': 'Contact',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms & Conditions',
    'nav.signIn': 'Sign In',
    'nav.signOut': 'Sign Out',
    
    // Landing Page
    'hero.title': 'Malaysian AI Prompt Assistant',
    'hero.subtitle': 'Advanced platform for generating high-quality AI prompts',
    'hero.cta': 'Get Started',
    'hero.learnMore': 'Learn More',
    
    // Features
    'features.title': 'Key Features',
    'features.bilingual.title': 'Bilingual',
    'features.bilingual.desc': 'Full support for Bahasa Malaysia and English',
    'features.ai.title': 'AI Powered',
    'features.ai.desc': 'Smart AI assistant for accurate answers',
    'features.mobile.title': 'Responsive',
    'features.mobile.desc': 'Best experience on all devices',
    
    // Prompt Assistant
    'assistant.title': 'Prompt Assistant',
    'assistant.selectAssistant': 'Select Assistant',
    'assistant.customInstructions': 'Custom Instructions',
    'assistant.aiAnswer': 'AI Answer',
    'assistant.generatePrompt': 'Generate Prompt',
    'assistant.editPrompt': 'Edit Prompt',
    'assistant.savePrompt': 'Save Prompt',
    'assistant.copyPrompt': 'Copy Prompt',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We\'re here to help',
    'contact.placeholder': 'Type your message here...',
    'contact.send': 'Send',
    'contact.email': 'Email: support@mudahprompt.my',
    
    // Auth
    'auth.welcome': 'Welcome to MudahPrompt',
    'auth.signInGoogle': 'Sign in with Google',
    'auth.loginRequired': 'Please sign in to use the Prompt Assistant',
    
    // Legal
    'legal.privacy.title': 'Privacy Policy',
    'legal.terms.title': 'Terms & Conditions',
    'legal.effectiveDate': 'Effective Date: {date}',
    'legal.governingLaw': 'Governed by Malaysian Law',
    'legal.pdpaCompliance': 'Compliant with Personal Data Protection Act (PDPA) 2010',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Language>(() => {
    // Get from localStorage or default to 'ms' for Malaysia
    const saved = localStorage.getItem('mudahprompt-language');
    return (saved === 'ms' || saved === 'en') ? saved : 'ms';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('mudahprompt-language', newLang);
  };

  const t = (key: string, params?: Record<string, string>): string => {
    let text = translations[lang][key] || translations.en[key] || key;
    
    // Replace parameters in text
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}