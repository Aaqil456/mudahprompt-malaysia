import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Copy, Edit3, Save, Wand2, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { learn } from '@/lib/learn';

export default function Learn() {
  const { lang, t } = useLanguage();
  const { toast } = useToast();
  
  const [selectedEbook, setSelectedEbook] = useState<any | null>(learn.length > 0 ? learn[0] : null);
  const [selectedEbookForModal, setSelectedEbookForModal] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t('common.all'));
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedEbookForModal(null);
    }
  }, [isModalOpen]);

  const filteredEbooks = learn.filter(ebook => {
    const matchesSearch = ebook.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ebook.description[lang].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === t('common.all') || ebook.category[lang] === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedEbooks = [...filteredEbooks].sort((a, b) => {
    const indexA = learn.findIndex(ebook => ebook.id === a.id);
    const indexB = learn.findIndex(ebook => ebook.id === b.id);

    if (sortOrder === 'newest') {
      return indexB - indexA; // Sort descending by index (newest first)
    } else {
      return indexA - indexB; // Sort ascending by index (oldest first)
    }
  });

  const ebookCategories = [t('common.all'), ...Array.from(new Set(learn.map(e => e.category[lang])))];

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
            {ebookCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="flex-shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Sort and Toggle (Placeholder) */}
          <div className="flex justify-end items-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground">{t('common.sortBy')}:</span>
            <select
              className="p-2 rounded-lg border border-border bg-background text-foreground text-sm"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            {/* Grid/List Toggle Placeholder */}
            <Button variant="outline" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3"/><rect width="7" height="7" x="14" y="3"/><rect width="7" height="7" x="14" y="14"/><rect width="7" height="7" x="3" y="14"/></svg>
            </Button>
          </div>
        </div>

        {/* Ebook Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {sortedEbooks.map((ebook) => (
            <Card
              key={ebook.id}
              className={cn(
                "card-gradient p-4 flex flex-col justify-between h-full",
                selectedEbook?.id === ebook.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              <h3 className="font-bold text-lg mb-3">{ebook.name[lang]}</h3>
              {ebook.imageSrc ? (
                <div className="relative w-full pb-[100%] overflow-hidden rounded-lg mb-3"> {/* 1:1 ratio, fills top, rounded corners */}
                  <img
                    src={ebook.imageSrc}
                    alt={ebook.name[lang]}
                    className="absolute inset-0 w-full h-full object-cover" // object-fit: cover
                    loading="lazy" // Lazy loading
                  />
                </div>
              ) : (
                <div className="relative w-full pb-[100%] bg-primary/20 rounded-lg mb-3 flex items-center justify-center"> {/* Placeholder with similar styling */}
                  <Wand2 className="h-1/2 w-1/2 text-primary" /> {/* Adjust icon size for larger placeholder */}
                </div>
              )}
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                {ebook.description[lang]}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded inline-block">
                  {ebook.category[lang]}
                </span>
                <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded inline-block">
                  {ebook.price}
                </span>
              </div>
              <Button
                onClick={() => {
                  setSelectedEbook(ebook);
                  setSelectedEbookForModal(ebook);
                  setIsModalOpen(true); // Open modal
                }}
                className="w-full mt-auto"
                variant="accent"
              >
                View Details
              </Button>
            </Card>
          ))}
        </div>

        {/* Modal/Drawer for Ebook Details */}
        {isModalOpen && selectedEbookForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="card-gradient p-6 w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 bg-yellow-400 hover:bg-yellow-500 text-black"
                onClick={() => setIsModalOpen(false)}
              >
                X
              </Button>

              {/* Large banner image at the top */}
              {selectedEbookForModal.imageSrc ? (
                <div className="relative w-full mt-16 pb-[56.25%] overflow-hidden rounded-lg mb-4"> {/* 16:9 ratio, full width, with top margin */}
                  <img
                    src={selectedEbookForModal.imageSrc}
                    alt={selectedEbookForModal.name[lang]}
                    className="absolute inset-0 w-full h-full object-cover" // object-fit: cover
                    loading="lazy" // Lazy loading
                  />
                </div>
              ) : (
                <div className="relative w-full mt-16 pb-[56.25%] bg-primary/20 rounded-lg mb-4 flex items-center justify-center"> {/* Placeholder with similar styling */}
                  <Wand2 className="h-1/2 w-1/2 text-primary" /> {/* Adjust icon size for larger placeholder */}
                </div>
              )}

              {/* Title and subtitle directly under the image */}
              <h2 className="text-2xl font-bold mb-2">{selectedEbookForModal.name[lang]}</h2>
              <p className="text-muted-foreground text-sm mb-4">
                {selectedEbookForModal.description[lang]}
              </p>

              {/* Category and Price */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded inline-block">
                  {selectedEbookForModal.category[lang]}
                </span>
                <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded inline-block">
                  {selectedEbookForModal.price}
                </span>
              </div>

              {/* Purchase Button fixed at the bottom */}
              <div className="bg-background pt-4 pb-2 -mx-6 px-6 border-t border-border">
                <a href={selectedEbookForModal.purchaseLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    className="w-full mb-2"
                    variant="accent"
                  >
                    Purchase Ebook
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
