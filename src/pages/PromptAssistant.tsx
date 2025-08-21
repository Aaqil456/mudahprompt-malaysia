import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Copy, Edit3, Save, Wand2, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock assistant data with bilingual templates
const assistants = [
  {
    id: 'content-writer',
    name: 'Content Writer',
    category: 'Writing',
    description: {
      ms: 'Pembantu untuk menulis kandungan kreatif dan menarik',
      en: 'Assistant for creative and engaging content writing'
    },
    fields: [
      { 
        name: 'topic',
        label: { ms: 'Topik', en: 'Topic' },
        placeholder: { ms: 'Masukkan topik...', en: 'Enter topic...' },
        type: 'text'
      },
      { 
        name: 'tone',
        label: { ms: 'Gaya Penulisan', en: 'Writing Tone' },
        placeholder: { ms: 'Contoh: formal, kasual, profesional', en: 'Example: formal, casual, professional' },
        type: 'text'
      },
      { 
        name: 'audience',
        label: { ms: 'Sasaran Pembaca', en: 'Target Audience' },
        placeholder: { ms: 'Siapa pembaca sasaran?', en: 'Who is the target audience?' },
        type: 'text'
      }
    ],
    template: {
      ms: 'Tulis artikel tentang [topic] dengan gaya [tone] yang sesuai untuk [audience]. Pastikan kandungan menarik dan informatif.',
      en: 'Write an article about [topic] with a [tone] tone suitable for [audience]. Ensure the content is engaging and informative.'
    }
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    category: 'Marketing',
    description: {
      ms: 'Cipta email pemasaran yang berkesan dan menarik',
      en: 'Create effective and engaging marketing emails'
    },
    fields: [
      { 
        name: 'product',
        label: { ms: 'Produk/Servis', en: 'Product/Service' },
        placeholder: { ms: 'Nama produk atau servis', en: 'Product or service name' },
        type: 'text'
      },
      { 
        name: 'goal',
        label: { ms: 'Objektif', en: 'Goal' },
        placeholder: { ms: 'Apa matlamat email ini?', en: 'What is the goal of this email?' },
        type: 'text'
      },
      { 
        name: 'offer',
        label: { ms: 'Tawaran Istimewa', en: 'Special Offer' },
        placeholder: { ms: 'Diskaun atau tawaran (jika ada)', en: 'Discount or offer (if any)' },
        type: 'text'
      }
    ],
    template: {
      ms: 'Cipta email pemasaran untuk [product] dengan objektif [goal]. Sertakan tawaran istimewa: [offer]. Email mestilah menarik dan mendorong tindakan.',
      en: 'Create a marketing email for [product] with the goal of [goal]. Include special offer: [offer]. The email should be engaging and drive action.'
    }
  }
];

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

  // Load custom instructions when assistant changes
  useEffect(() => {
    loadCustomInstructions();
  }, [selectedAssistant.id]);

  // Auto-scroll when assistant is selected
  useEffect(() => {
    if (fieldsContainerRef.current) {
      const timeout = setTimeout(() => {
        const headerHeight = 80; // 80px
        const padding = 20; // 20px
        const offset = headerHeight + padding;
        
        const elementTop = fieldsContainerRef.current!.offsetTop;
        window.scrollTo({
          top: elementTop - offset,
          behavior: 'smooth'
        });
      }, 150);
      
      return () => clearTimeout(timeout);
    }
  }, [selectedAssistant.id]);

  const loadCustomInstructions = async () => {
    try {
      // Mock API call - replace with actual implementation
      const defaultInstruction = lang === 'ms' 
        ? 'Anda adalah pembantu AI yang membantu pengguna menjana prompt berkualiti tinggi. Berikan respons yang tepat dan berguna.'
        : 'You are an AI assistant that helps users generate high-quality prompts. Provide accurate and helpful responses.';
      
      setCustomInstructions(defaultInstruction);
    } catch (error) {
      console.error('Failed to load custom instructions:', error);
    }
  };

  const saveCustomInstructions = async () => {
    try {
      await requestQueue.add(async () => {
        // Mock API call - replace with actual implementation
        console.log('Saving custom instructions:', {
          assistantId: selectedAssistant.id,
          instructions: customInstructions
        });
      });
      
      toast({
        title: t('common.save'),
        description: 'Custom instructions saved successfully',
      });
    } catch (error) {
      console.error('Failed to save custom instructions:', error);
    }
  };

  const generatePrompt = async () => {
    setIsGenerating(true);
    
    try {
      await requestQueue.add(async () => {
        // Template replacement using field names as placeholder keys
        let prompt = selectedAssistant.template[lang];
        
        Object.entries(fieldValues).forEach(([fieldName, value]) => {
          const placeholder = `[${fieldName.toLowerCase().replace(/\s+/g, '')}]`;
          prompt = prompt.replace(new RegExp(placeholder, 'g'), value || '');
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
    
    try {
      await requestQueue.add(async () => {
        const response = await fetch('/api/gemini-assist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            promptText: generatedPrompt,
            assistantId: selectedAssistant.id,
            systemInstruction: customInstructions
          })
        });
        
        const data = await response.json();
        setAiAnswer(data.answer || 'No answer received');
      });
    } catch (error) {
      console.error('Error getting AI answer:', error);
      setAiAnswer('Error getting AI response. Please try again.');
    } finally {
      setIsGettingAnswer(false);
    }
  };

  const filteredAssistants = assistants.filter(assistant => {
    const matchesSearch = assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

              {/* Assistant List */}
              <div className="space-y-3">
                {filteredAssistants.map((assistant) => (
                  <button
                    key={assistant.id}
                    onClick={() => setSelectedAssistant(assistant)}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border transition-all duration-200",
                      selectedAssistant.id === assistant.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    )}
                  >
                    <div className="font-medium mb-1">{assistant.name}</div>
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
                <h3 className="font-semibold mb-4">{selectedAssistant.name}</h3>
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
                  disabled={isGenerating || Object.values(fieldValues).some(v => !v)}
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={saveCustomInstructions}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {t('common.save')}
                </Button>
              </div>
              <Textarea
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                rows={4}
                placeholder={lang === 'ms' 
                  ? 'Masukkan arahan khas untuk pembantu AI...'
                  : 'Enter custom instructions for the AI assistant...'
                }
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}