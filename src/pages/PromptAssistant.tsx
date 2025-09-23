import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Copy, Edit3, Save, Wand2, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { assistants } from '@/lib/assistants';

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
  
  const [selectedAssistant, setSelectedAssistant] = useState<any | null>(assistants.length > 0 ? assistants[0] : null);
  const [selectedAssistantForModal, setSelectedAssistantForModal] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [editedPrompt, setEditedPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
          
          setGeneratedPrompt(prompt);
          setEditedPrompt(prompt);
          setIsEditing(false);
          
          // Save to history (fire-and-forget)
          savePromptHistory(prompt);
        });
      } catch (error) {
        console.error('Error generating prompt:', error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const savePromptHistory = async (prompt: string) => {
    if (!selectedAssistantForModal) return;
    try {
      // Fire-and-forget POST request
      fetch('/api/save-prompt-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistantId: selectedAssistantForModal.id,
          prompt
        })
      }).catch(err => console.error('History save failed:', err));
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


  const filteredAssistants = assistants.filter(assistant => {
    const matchesSearch = assistant.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assistant.description[lang].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || assistant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(assistants.map(a => a.category)))];

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
            {categories.map(category => (
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
            <select className="p-2 rounded-lg border border-border bg-background text-foreground text-sm">
              <option value="popular">Popular</option>
              <option value="new">New</option>
              <option value="allTime">All Time</option>
            </select>
            {/* Grid/List Toggle Placeholder */}
            <Button variant="outline" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3"/><rect width="7" height="7" x="14" y="3"/><rect width="7" height="7" x="14" y="14"/><rect width="7" height="7" x="3" y="14"/></svg>
            </Button>
          </div>
        </div>

        {/* Assistant Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredAssistants.map((assistant) => (
            <Card
              key={assistant.id}
              className={cn(
                "card-gradient p-4 flex flex-col justify-between h-full",
                selectedAssistant?.id === assistant.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-primary/5"
              )}
            >
              <div className="flex items-center mb-3">
                {/* Placeholder for icon/thumbnail */}
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <Wand2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg">{assistant.name[lang]}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                {assistant.description[lang]}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded inline-block">
                  {assistant.category}
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
                className="absolute top-4 right-4"
                onClick={() => setIsModalOpen(false)}
              >
                X
              </Button>
              <h2 className="text-2xl font-bold mb-4">{selectedAssistantForModal.name[lang]}</h2>
              <p className="text-muted-foreground mb-6">
                {selectedAssistantForModal.description[lang]}
              </p>

              {/* Fields Container */}
              <div ref={fieldsContainerRef} className="mb-6">
                <div className="grid gap-4">
                  {selectedAssistantForModal.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-2">
                        {field.label[lang]}
                      </label>
                      <Input
                        placeholder={field.placeholder[lang]}
                        value={fieldValues[field.name] || ''}
                        onChange={(e) => setFieldValues(prev => ({
                          ...prev,
                          [field.name]: e.target.value
                        }))}
                      />
                    </div>
                  ))}
                </div>

                <Button
                  onClick={generatePrompt}
                  disabled={!selectedAssistantForModal || Object.keys(fieldValues).length === 0 || isGenerating}
                  className="w-full mt-6"
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
              </div>

              {/* Generated Prompt */}
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
                      className="mb-4"
                    />
                  ) : (
                    <div className="p-4 bg-muted/30 rounded-lg mb-4 whitespace-pre-wrap">
                      {generatedPrompt}
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}