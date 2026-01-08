import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Copy, Edit3, Save, Wand2, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { getAssistants } from '@/lib/assistants';
import { supabase } from '@/integrations/supabase/client';

// RequestQueue class for spacing tasks
class RequestQueue {
  private queue: (() => Promise<void>)[] = [];
  private isProcessing = false;
  private readonly delay = 1000; // ~1000ms spacing

  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }

  private async process() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
        if (this.queue.length > 0) {
          await new Promise(resolve => setTimeout(resolve, this.delay));
        }
      }
    }

    this.isProcessing = false;
  }
}

const requestQueue = new RequestQueue();

export default function PromptAssistant() {
  const { lang, t } = useLanguage();
  const { toast } = useToast();
  const fieldsContainerRef = useRef<HTMLDivElement>(null);
  const generatedPromptRef = useRef<HTMLDivElement>(null);
  const promptBuilderRef = useRef<HTMLDivElement>(null);

  const [allAssistants, setAllAssistants] = useState<any[]>([]);
  const [selectedAssistant, setSelectedAssistant] = useState<any | null>(null);
  const [selectedAssistantForModal, setSelectedAssistantForModal] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [editedPrompt, setEditedPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // Use 'all' as the language-agnostic key for "All"
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'trending'>('newest');

  // Fetch assistants from Supabase on component mount
  useEffect(() => {
    const fetchAssistants = async () => {
      const fetchedAssistants = await getAssistants();
      setAllAssistants(fetchedAssistants);
      if (fetchedAssistants.length > 0) {
        setSelectedAssistant(fetchedAssistants[0]);
      }
    };
    fetchAssistants();
  }, []);

  // Load custom instructions when assistant changes
  useEffect(() => {
    if (selectedAssistant) {
      // No custom instructions to load anymore
    }
  }, [selectedAssistant?.id]);

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedAssistantForModal(null);
      setFieldValues({});
      setGeneratedPrompt("");
      setEditedPrompt("");
      setIsEditing(false);
      setIsGenerating(false);
    }
  }, [isModalOpen]);

  // Effect to reset selectedCategory when language changes, if the current category key is no longer valid
  useEffect(() => {
    if (allAssistants.length > 0) {
      const allCategoryKeys = ['all', ...Array.from(new Set(allAssistants.map(a => a.category.key)))];
      if (!allCategoryKeys.includes(selectedCategory)) {
        setSelectedCategory('all'); // Reset to 'all' if the current key is not found in the new language's categories
      }
    }
  }, [lang, selectedCategory, allAssistants]);





  const generatePrompt = async () => {
    if (selectedAssistantForModal && Object.keys(fieldValues).length > 0) {
      setIsGenerating(true);

      try {
        await requestQueue.add(async () => {
          let prompt = selectedAssistantForModal.template[lang];

          // Create field mappings using the improved logic from the other project
          const fieldMappings: Record<string, string> = {};
          selectedAssistantForModal.fields.forEach((field: any) => {
            const fieldKey = field.name.toLowerCase().replace(/\s+/g, '');
            fieldMappings[fieldKey] = fieldValues[field.name] || '';
          });

          // Replace placeholders using the field mappings
          Object.entries(fieldMappings).forEach(([key, value]) => {
            const placeholder = new RegExp(`\\[${key}\\]`, 'g');
            prompt = prompt.replace(placeholder, value);
          });

          console.log('Generated Prompt (JSON.stringify):', JSON.stringify(prompt)); // <--- ADDED FOR DEBUGGING

          setGeneratedPrompt(prompt);
          setEditedPrompt(prompt);
          setIsEditing(false);

          // Save prompt to history
          savePromptHistory(prompt);

          // Increment trending score (fire-and-forget)
          incrementTrendingScore(selectedAssistantForModal.id);
        });
      } catch (error) {
        console.error('Error generating prompt:', error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const incrementTrendingScore = async (assistantId: string) => {
    try {
      const { error } = await supabase
        .rpc('increment_trending_score', { assistant_id_param: assistantId });

      if (error) {
        console.error('Supabase trending score update error:', error);
      }
    } catch (error) {
      console.error('Failed to increment trending score:', error);
    }
  };

  const savePromptHistory = async (prompt: string) => {
    if (!selectedAssistantForModal) return;
    try {
      const { error } = await supabase
        .from('prompt_history')
        .insert([
          {
            assistant_id: selectedAssistantForModal.id,
            prompt_content: prompt,
          },
        ]);

      if (error) {
        console.error('Supabase prompt history save error:', error);
      }
    } catch (error) {
      console.error('Failed to save prompt history:', error);
    }
  };

  const savePrompt = () => {
    setGeneratedPrompt(editedPrompt);
    setIsEditing(false);
    toast({
      title: t('assistant.savePrompt'),
      description: 'Prompt saved successfully',
    });
  };

  const copyPrompt = async () => {
    const textToCopy = isEditing ? editedPrompt : generatedPrompt;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: t('assistant.copyPrompt'),
        description: 'Prompt copied to clipboard',
      });
    } catch (error) {
      console.error('Failed to copy prompt:', error);
    }
  };


  const copyAndNavigateToChatGPT = async () => {
    await copyPrompt();
    window.open('https://chat.openai.com/chat', '_blank');
  };

  const copyAndNavigateToGemini = async () => {
    await copyPrompt();
    window.open('https://gemini.google.com/chat', '_blank');
  };

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
                <div className="relative w-full pb-[100%] overflow-hidden rounded-lg mb-3"> {/* 1:1 ratio, fills top, rounded corners */}
                  <img
                    src={assistant.imageSrc}
                    alt={assistant.name[lang]}
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
                  setSelectedAssistantForModal(assistant);
                  setFieldValues({});
                  setGeneratedPrompt("");
                  setIsModalOpen(true); // Open modal
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

        {/* Modal/Drawer for Builder/Editor */}
        {isModalOpen && selectedAssistantForModal && (
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
              {selectedAssistantForModal.imageSrc ? (
                <div className="relative w-full mt-16 pb-[56.25%] overflow-hidden rounded-lg mb-4"> {/* 16:9 ratio, full width, with top margin */}
                  <img
                    src={selectedAssistantForModal.imageSrc}
                    alt={selectedAssistantForModal.name[lang]}
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
              <h2 className="text-2xl font-bold mb-2">{selectedAssistantForModal.name[lang]}</h2>
              <p className="text-muted-foreground text-sm mb-4">
                {selectedAssistantForModal.description[lang]}
              </p>

              {/* Category */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-accent/20 dark:bg-accent text-accent-foreground px-2 py-1 rounded inline-block">
                  {selectedAssistantForModal.category[lang]}
                </span>
              </div>

              {/* Fields Container (main content area) */}
              <div ref={fieldsContainerRef} className="mb-6">
                <div className="grid gap-4">
                  {selectedAssistantForModal.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-2">
                        {field.label[lang]}
                      </label>
                      {field.type === 'dropdown' ? (
                        <select
                          className="w-full p-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={fieldValues[field.name] || ''}
                          onChange={(e) => setFieldValues(prev => ({
                            ...prev,
                            [field.name]: e.target.value
                          }))}
                        >
                          <option value="">{field.placeholder[lang]}</option>
                          {field.options?.map((option: any) => (
                            <option key={option.value} value={option.value}>
                              {option.label[lang]}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          placeholder={field.placeholder[lang]}
                          value={fieldValues[field.name] || ''}
                          onChange={(e) => setFieldValues(prev => ({
                            ...prev,
                            [field.name]: e.target.value
                          }))}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Generated Prompt (if exists) */}
              {generatedPrompt && (
                <div ref={generatedPromptRef} className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Generated Prompt</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        {t('assistant.editPrompt')}
                      </Button>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={savePrompt}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {t('assistant.savePrompt')}
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyPrompt}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        {t('assistant.copyPrompt')}
                      </Button>
                    </div>
                  </div>

                  {isEditing ? (
                    <Textarea
                      value={editedPrompt}
                      onChange={(e) => setEditedPrompt(e.target.value)}
                      rows={6}
                      className="mb-4 whitespace-pre-wrap"
                    />
                  ) : (
                    <div className="p-4 bg-muted/30 rounded-lg mb-4">
                      {generatedPrompt.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Generate Prompt button fixed at the bottom */}
              <div className="bg-background pt-4 pb-2 -mx-6 px-6 border-t border-border">
                <Button
                  onClick={generatePrompt}
                  disabled={!selectedAssistantForModal || Object.keys(fieldValues).length === 0 || isGenerating}
                  className="w-full mb-2"
                  variant="accent"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      {t('common.loading')}
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      {t('assistant.generatePrompt')}
                    </>
                  )}
                </Button>
                <Button
                  onClick={copyAndNavigateToChatGPT}
                  disabled={!generatedPrompt}
                  className="w-full mb-2"
                  variant="outline"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {t('assistant.copyAndGoToChatGPT')}
                </Button>
                <Button
                  onClick={copyAndNavigateToGemini}
                  disabled={!generatedPrompt}
                  className="w-full"
                  variant="outline"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {t('assistant.copyAndGoToGemini')}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}