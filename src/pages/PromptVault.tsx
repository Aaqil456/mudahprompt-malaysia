import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ChevronRight, Copy, Check, Filter, Database, Sparkles, FolderTree } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getVaultCategories, getVaultCollections, VaultCategory, VaultCollection } from '@/lib/vault';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function PromptVault() {
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch Categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['vault-categories'],
    queryFn: getVaultCategories,
  });

  // Fetch Collections
  const { data: collections = [], isLoading: collectionsLoading } = useQuery({
    queryKey: ['vault-collections', selectedCategoryId],
    queryFn: () => getVaultCollections(selectedCategoryId || undefined),
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success(lang === 'ms' ? 'Prompt disalin!' : 'Prompt copied!', {
      description: lang === 'ms' ? 'Sedia untuk ditampal ke AI anda.' : 'Ready to paste into your AI.',
      duration: 2000,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCollections = collections.filter((c) => {
    const title = c.title[lang].toLowerCase();
    const desc = c.description[lang].toLowerCase();
    const query = searchQuery.toLowerCase();
    return title.includes(query) || desc.includes(query);
  });

  // Find category path for breadcrumbs/nested look
  const findCategoryPath = (cats: VaultCategory[], targetId: string, path: VaultCategory[] = []): VaultCategory[] | null => {
    for (const cat of cats) {
      if (cat.id === targetId) return [...path, cat];
      if (cat.children && cat.children.length > 0) {
        const found = findCategoryPath(cat.children, targetId, [...path, cat]);
        if (found) return found;
      }
    }
    return null;
  };

  const activePath = selectedCategoryId ? findCategoryPath(categories, selectedCategoryId) : [];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-[100px]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/20 bg-primary/5 text-primary animate-fade-in">
            <Database className="w-3 h-3 mr-2" />
            {t('nav.promptVault')}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient animate-slide-up">
            {lang === 'ms' ? 'Gedung Prompt AI' : 'AI Prompt Vault'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up delay-100">
            {lang === 'ms' 
              ? 'Koleksi prompt curated untuk pelbagai keperluan AI anda. Hanya salin dan mula jana hasil yang menakjubkan.' 
              : 'A curated collection of high-quality prompts for your AI needs. Just copy and start generating amazing results.'}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar - Categories */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="p-4 rounded-2xl border border-border/40 glass-effect">
              <div className="flex items-center mb-6 text-primary font-bold">
                <FolderTree className="w-5 h-5 mr-2" />
                {lang === 'ms' ? 'Kategori' : 'Categories'}
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setSelectedCategoryId(null)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-xl transition-all duration-200 text-sm font-medium",
                    !selectedCategoryId 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t('common.all')}
                </button>
                
                {categoriesLoading ? (
                  <div className="pt-4 space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-8 bg-muted animate-pulse rounded-lg"></div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4">
                    <CategoryList 
                      categories={categories} 
                      selectedId={selectedCategoryId} 
                      onSelect={setSelectedCategoryId}
                      level={0}
                    />
                  </div>
                )}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-8">
            {/* Search & Breadcrumbs */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
                <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => setSelectedCategoryId(null)}>
                  Vault
                </span>
                {activePath?.map((cat) => (
                  <div key={cat.id} className="flex items-center space-x-2">
                    <ChevronRight className="w-4 h-4" />
                    <span 
                      className="cursor-pointer hover:text-primary transition-colors font-medium text-foreground"
                      onClick={() => setSelectedCategoryId(cat.id)}
                    >
                      {cat.name[lang]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder={lang === 'ms' ? 'Cari prompt...' : 'Search prompts...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 rounded-xl border-border/40 focus:ring-primary shadow-sm"
                />
              </div>
            </div>

            {/* Results Grid */}
            {collectionsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-64 rounded-2xl border border-border/40 bg-muted/20 animate-pulse"></div>
                ))}
              </div>
            ) : filteredCollections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCollections.map((collection) => (
                  <Card key={collection.id} className="group overflow-hidden border-border/40 card-gradient hover:shadow-xl transition-all duration-300 flex flex-col h-full rounded-2xl">
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                          <Sparkles className="w-5 h-5 font-bold" />
                        </div>
                        {collection.is_featured && (
                          <Badge className="bg-accent text-accent-foreground border-none">
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {collection.title[lang]}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 font-medium italic">
                         {collection.aesthetic[lang]}
                      </p>
                      
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                        {collection.description[lang]}
                      </p>

                      <div className="mt-auto pt-4 border-t border-border/40">
                        <Accordion type="single" collapsible className="w-full border-none">
                          <AccordionItem value="prompts" className="border-none">
                            <AccordionTrigger className="hover:no-underline py-2 text-sm font-bold text-primary">
                              {lang === 'ms' ? `Lihat ${collection.prompts.length} Prompt` : `View ${collection.prompts.length} Prompts`}
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 space-y-4">
                              {collection.prompts.map((p, idx) => (
                                <div key={idx} className="relative group/prompt">
                                  <div className="p-4 rounded-xl bg-muted/30 border border-border/20 text-sm leading-relaxed pr-12 group-hover/prompt:bg-muted/50 transition-colors">
                                    {p.prompt}
                                  </div>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
                                    onClick={() => handleCopy(p.prompt, `${collection.id}-${idx}`)}
                                  >
                                    {copiedId === `${collection.id}-${idx}` ? (
                                      <Check className="h-4 w-4 text-success" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border/60">
                <Search className="w-12 h-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-medium text-muted-foreground">
                  {lang === 'ms' ? 'Tiada prompt ditemui' : 'No prompts found'}
                </h3>
                <p className="text-muted-foreground mb-6">
                   {lang === 'ms' ? 'Cuba cari kata kunci lain atau tukar kategori.' : 'Try another search term or change category.'}
                </p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategoryId(null); }}>
                  {lang === 'ms' ? 'Set Semula' : 'Reset Filters'}
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

interface CategoryListProps {
  categories: VaultCategory[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  level: number;
}

function CategoryList({ categories, selectedId, onSelect, level }: CategoryListProps) {
  const { lang} = useLanguage();
  return (
    <div className={cn("space-y-1", level > 0 && "ml-4 mt-1 border-l border-border/40 pl-2")}>
      {categories.map((cat) => (
        <div key={cat.id} className="space-y-1">
          <button
            onClick={() => onSelect(cat.id)}
            className={cn(
              "w-full text-left px-3 py-1.5 rounded-lg transition-all duration-200 text-sm flex items-center justify-between group",
              selectedId === cat.id 
                ? "bg-primary/10 text-primary font-bold" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <span>{cat.name[lang]}</span>
            {cat.children && cat.children.length > 0 && (
               <ChevronRight className={cn("w-3 h-3 transition-transform", selectedId === cat.id && "rotate-90")} />
            )}
          </button>
          
          {cat.children && cat.children.length > 0 && (
            <CategoryList 
              categories={cat.children} 
              selectedId={selectedId} 
              onSelect={onSelect}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
}
