import { Link } from 'react-router-dom';
import { ArrowRight, Languages, Zap, Smartphone, Users, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import heroImage from '@/assets/hero-bg.jpg';

export default function Landing() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Languages,
      title: t('features.bilingual.title'),
      description: t('features.bilingual.desc'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: t('features.ai.title'),
      description: t('features.ai.desc'),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Smartphone,
      title: t('features.mobile.title'),
      description: t('features.mobile.desc'),
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const assistantPreviews = [
    {
      name: 'Content Writer',
      description: 'Pembantu untuk menulis kandungan kreatif',
      category: 'Writing',
      users: '2.5k'
    },
    {
      name: 'Email Marketing',
      description: 'Cipta email pemasaran yang berkesan',
      category: 'Marketing',
      users: '1.8k'
    },
    {
      name: 'Social Media',
      description: 'Pos media sosial yang menarik',
      category: 'Social',
      users: '3.2k'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="absolute inset-0 hero-gradient opacity-85 z-10"></div>
        <div className="absolute inset-0 bg-black/30 z-20"></div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32 z-30">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
                {t('hero.subtitle')}
              </p>
            </div>
            
            <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/prompt-assistant">
                <Button variant="glass" size="xl" className="group">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                {t('hero.learnMore')}
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">10k+</div>
                <div className="text-sm text-white/80">Prompts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5k+</div>
                <div className="text-sm text-white/80">Pengguna</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-white/80">Kepuasan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('features.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Platform yang direka khas untuk keperluan pengguna awam dengan teknologi AI terkini
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-gradient p-8 text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assistant Previews */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pembantu Popular</h2>
            <p className="text-muted-foreground text-lg">
              Pilih daripada pelbagai pembantu AI yang telah disediakan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {assistantPreviews.map((assistant, index) => (
              <Card key={index} className="card-gradient p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{assistant.name}</h3>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {assistant.category}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {assistant.users}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{assistant.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>4.8</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Lihat Detail
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/prompt-assistant">
              <Button variant="accent" size="lg">
                Lihat Semua Pembantu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Mulakan Perjalanan AI Anda Hari Ini
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Tingkatkan produktiviti anda dengan MudahPrompt
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/prompt-assistant">
                <Button variant="glass" size="xl">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-8 text-white/80">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Percuma untuk bermula
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Tanpa kad kredit
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Sokongan 24/7
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}