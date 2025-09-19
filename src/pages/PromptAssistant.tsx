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
  
  const [selectedAssistant, setSelectedAssistant] = useState(assistants[0]);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [editedPrompt, setEditedPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customInstructions, setCustomInstructions] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isGettingAnswer, setIsGettingAnswer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoadingInstruction, setIsLoadingInstruction] = useState(false);
  const [isEditingInstruction, setIsEditingInstruction] = useState(false);
  const [instructionSaved, setInstructionSaved] = useState(false);

  // Load custom instructions when assistant changes
  useEffect(() => {
    loadCustomInstructions();
  }, [selectedAssistant.id]);

  // Auto-scroll when assistant is selected
  useEffect(() => {
    if (fieldsContainerRef.current) {
      const timeout = setTimeout(() => {
        const navbarHeight = 80; // Approximate navbar height
        const elementPosition = fieldsContainerRef.current!.offsetTop - navbarHeight - 20; // 20px extra padding
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }, 150); // Slightly longer delay to ensure DOM is updated
      
      return () => clearTimeout(timeout);
    }
  }, [selectedAssistant.id]);

  const loadCustomInstructions = async () => {
    try {
      setIsLoadingInstruction(true);
      setInstructionSaved(false);
      
      // Mock API call - replace with actual implementation
      const defaultInstruction = lang === 'ms' 
        ? 'Anda adalah pembantu AI yang membantu pengguna menjana prompt berkualiti tinggi. Berikan respons yang tepat dan berguna.'
        : 'You are an AI assistant that helps users generate high-quality prompts. Provide accurate and helpful responses.';
      
      setCustomInstructions(defaultInstruction);
    } catch (error) {
      console.error('Failed to load custom instructions:', error);
    } finally {
      setIsLoadingInstruction(false);
    }
  };

  const saveCustomInstructions = async () => {
    if (!selectedAssistant) return;
    setIsLoadingInstruction(true);
    try {
      await requestQueue.add(async () => {
        // Mock API call - replace with actual implementation
        console.log('Saving custom instructions:', {
          assistantId: selectedAssistant.id,
          instructions: customInstructions
        });
      });
      
      setIsEditingInstruction(false);
      setInstructionSaved(true);
      toast({
        title: t('common.save'),
        description: 'Custom instructions saved successfully',
      });
    } catch (error) {
      console.error('Failed to save custom instructions:', error);
    } finally {
      setIsLoadingInstruction(false);
    }
  };

  const handleEditInstruction = () => {
    setIsEditingInstruction(true);
    setInstructionSaved(false);
  };

  const generatePrompt = async () => {
    if (selectedAssistant && Object.keys(fieldValues).length > 0) {
      setIsGenerating(true);
      
      try {
        await requestQueue.add(async () => {
          let prompt = selectedAssistant.template[lang];
          
          // Create field mappings using the improved logic from the other project
          const fieldMappings: Record<string, string> = {};
          selectedAssistant.fields.forEach((field: any) => {
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
    try {
      // Fire-and-forget POST request
      fetch('/api/save-prompt-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistantId: selectedAssistant.id,
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

  const getAiAnswer = async () => {
    if (!generatedPrompt) return;
    
    setIsGettingAnswer(true);
    
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 45000); // 45 seconds timeout

    try {
      await requestQueue.add(async () => {
        const response = await fetch('/api/gemini-assist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            promptText: generatedPrompt,
            assistantId: selectedAssistant.id,
            systemInstruction: customInstructions
          }),
          signal: abortController.signal, // Attach the abort signal
        });
        clearTimeout(timeoutId); // Clear timeout if fetch completes

        const raw = await response.text();
        let data: any = {};
        try {
          data = raw ? JSON.parse(raw) : {};
        } catch (e) {
          throw new Error(raw || 'Invalid JSON from /api/gemini-assist');
        }
        if (!response.ok) {
          const message = data?.error || `HTTP ${response.status}`;
          throw new Error(message);
        }
        setAiAnswer(data.answer || data.revisedPrompt || 'No answer received');
      });
    } catch (error) {
      clearTimeout(timeoutId); // Ensure timeout is cleared on error too
      console.error('Error getting AI answer:', error);
      let errorMessage = String((error as Error)?.message || error);
      if (error instanceof DOMException && error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again.';
      }
      setAiAnswer(errorMessage || 'Error getting AI response. Please try again.');
    } finally {
      setIsGettingAnswer(false);
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('assistant.title')}</h1>
          <p className="text-muted-foreground">
            {lang === 'ms' 
              ? 'Pilih pembantu AI dan isi maklumat yang diperlukan untuk menjana prompt yang sempurna'
              : 'Select an AI assistant and fill in the required information to generate the perfect prompt'
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Assistant Selection Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-gradient p-6 sticky top-24">
              <div className="mb-6">
                <h2 className="font-semibold mb-4">{t('assistant.selectAssistant')}</h2>
                
                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t('common.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Assistant List - Scrollable Container */}
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2 space-y-3">
                {filteredAssistants.map((assistant) => (
                  <button
                    key={assistant.id}
                    onClick={() => {
                      setSelectedAssistant(assistant);
                      setFieldValues({});
                      setGeneratedPrompt("");
                      setAiAnswer("");
                    }}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border transition-all duration-200",
                      selectedAssistant.id === assistant.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    )}
                  >
                    <div className="font-medium mb-1">{assistant.name[lang]}</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {assistant.description[lang]}
                    </div>
                    <div className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded inline-block">
                      {assistant.category}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fields Container */}
            <div ref={fieldsContainerRef}>
              <Card className="card-gradient p-6">
                <h3 className="font-semibold mb-4">{selectedAssistant.name[lang]}</h3>
                <p className="text-muted-foreground mb-6">
                  {selectedAssistant.description[lang]}
                </p>

                <div className="grid gap-4">
                  {selectedAssistant.fields.map((field) => (
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
                  disabled={!selectedAssistant || Object.keys(fieldValues).length === 0 || isGenerating}
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
              </Card>
            </div>

            {/* Generated Prompt */}
            {generatedPrompt && (
              <Card className="card-gradient p-6">
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

                <Button
                  onClick={getAiAnswer}
                  disabled={isGettingAnswer}
                  variant="default"
                >
                  {isGettingAnswer ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      Getting Answer...
                    </>
                  ) : (
                    'Get AI Answer'
                  )}
                </Button>
              </Card>
            )}

            {/* AI Answer */}
            {aiAnswer && (
              <Card className="card-gradient p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{t('assistant.aiAnswer')}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(aiAnswer)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {t('common.copy')}
                  </Button>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg whitespace-pre-wrap">
                  {aiAnswer}
                </div>
              </Card>
            )}

            {/* Custom Instructions */}
            <Card className="card-gradient p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  {t('assistant.customInstructions')}
                </h3>
                <div className="flex gap-2">
                  {!isEditingInstruction ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEditInstruction}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Arahan
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={saveCustomInstructions}
                      disabled={isLoadingInstruction}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Arahan
                    </Button>
                  )}
                  {instructionSaved && <span className="text-green-600 text-sm">Disimpan!</span>}
                </div>
              </div>
              {isLoadingInstruction ? (
                <p>Memuatkan arahan...</p>
              ) : (
                <Textarea
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  readOnly={!isEditingInstruction}
                  rows={4}
                  placeholder={lang === 'ms' 
                    ? 'Masukkan arahan khas untuk pembantu AI...'
                    : 'Enter custom instructions for the AI assistant...'
                  }
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}