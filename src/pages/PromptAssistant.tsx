import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Wand2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { getAssistants } from '@/lib/assistants';
import { useQuery } from '@tanstack/react-query';

export default function PromptAssistant() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const { data: allAssistants = [], isLoading } = useQuery({
    queryKey: ['assistants'],
    queryFn: getAssistants,
  });

  const [selectedAssistant, setSelectedAssistant] = useState<any | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // Use 'all' as the language-agnostic key for "All"
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'trending'>('newest');

  // Set initial selected assistant once data is loaded
  useEffect(() => {
    if (allAssistants.length > 0 && !selectedAssistant) {
      setSelectedAssistant(allAssistants[0]);
    }
  }, [allAssistants, selectedAssistant]);

  // Effect to reset selectedCategory when language changes, if the current category key is no longer valid
  useEffect(() => {
    if (allAssistants.length > 0) {
      const allCategoryKeys = ['all', ...Array.from(new Set(allAssistants.map(a => a.category.key)))];
      if (!allCategoryKeys.includes(selectedCategory)) {
        setSelectedCategory('all'); // Reset to 'all' if the current key is not found in the new language's categories
      }
    }
  }, [lang, selectedCategory, allAssistants]);


  const filteredAssistants = allAssistants.filter(assistant => {
    const matchesSearch = assistant.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.description[lang].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || assistant.category.key === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedAssistants = [...filteredAssistants].sort((a, b) => {
    if (sortOrder === 'trending') {
      return b.trending_score - a.trending_score; // Sort descending by trending_score
    } else if (sortOrder === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); // Sort descending by created_at
    } else if (sortOrder === 'oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime(); // Sort ascending by created_at
    }
    return 0;
  });

  const categories = ['all', ...Array.from(new Set(allAssistants.map(a => a.category.key)))];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Top Navigation: Search, Categories, Sort/Toggle */}
        <div className="sticky top-0 z-10 bg-background pb-4">
          {/* Search Bar */}
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('common.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-input focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide">
            {categories.map(categoryKey => (
              <Button
                key={categoryKey}
                variant={selectedCategory === categoryKey ? "default" : "outline"}
                onClick={() => setSelectedCategory(categoryKey)}
                className="flex-shrink-0"
              >
                {categoryKey === 'all' ? t('common.all') : allAssistants.find(a => a.category.key === categoryKey)?.category[lang]}
              </Button>
            ))}
          </div>

          {/* Sort and Toggle (Placeholder) */}
          <div className="flex justify-end items-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground">{t('common.sortBy')}:</span>
            <select
              className="p-2 rounded-lg border border-border bg-background text-foreground text-sm"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest' | 'trending')}
            >
              <option value="trending">{t('common.trending')}</option>
              <option value="newest">{t('common.newest')}</option>
              <option value="oldest">{t('common.oldest')}</option>
            </select>
            {/* Grid/List Toggle Placeholder */}
            <Button variant="outline" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" /><rect width="7" height="7" x="14" y="3" /><rect width="7" height="7" x="14" y="14" /><rect width="7" height="7" x="3" y="14" /></svg>
            </Button>
          </div>
        </div>

        {/* Assistant Cards Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">{t('common.loading') || 'Loading assistants...'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {sortedAssistants.map((assistant) => (
              <Card
                key={assistant.id}
                className={cn(
                  "card-gradient p-4 flex flex-col justify-between h-full",
                  selectedAssistant?.id === assistant.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <h3 className="font-bold text-lg mb-3">{assistant.name[lang]}</h3>
                {assistant.imageSrc ? (
                  <div className="relative w-full pb-[100%] overflow-hidden rounded-lg mb-3 border-4 border-yellow-400 bg-muted/20"> {/* 1:1 ratio, fills top, rounded corners */}
                    <img
                      src={assistant.imageSrc}
                      alt={assistant.name[lang]}
                      className="absolute inset-0 w-full h-full object-cover" // object-fit: cover
                      loading="lazy" // Lazy loading
                    />
                  </div>
                ) : (
                  <div className="relative w-full pb-[100%] bg-primary/20 rounded-lg mb-3 flex items-center justify-center border-4 border-yellow-400"> {/* Placeholder with similar styling */}
                    <Wand2 className="h-1/2 w-1/2 text-primary" /> {/* Adjust icon size for larger placeholder */}
                  </div>
                )}
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {assistant.description[lang]}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-accent/20 dark:bg-accent text-accent-foreground px-2 py-1 rounded inline-block">
                    {assistant.category[lang]}
                  </span>
                </div>
                <Button
                  onClick={() => {
                    setSelectedAssistant(assistant);
                    navigate(`/prompt-assistant/${assistant.id}`);
                  }}
                  className="w-full mt-auto"
                  variant="accent"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  {t('assistant.generatePrompt')}
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}