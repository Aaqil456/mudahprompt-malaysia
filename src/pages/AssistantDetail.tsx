import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Copy, Edit3, Save, Wand2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { getAssistants } from '@/lib/assistants';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

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

export default function AssistantDetail() {
    const { assistantId } = useParams<{ assistantId: string }>();
    const navigate = useNavigate();
    const { lang, t } = useLanguage();
    const { toast } = useToast();
    const fieldsContainerRef = useRef<HTMLDivElement>(null);
    const generatedPromptRef = useRef<HTMLDivElement>(null);

    const { data: allAssistants = [], isLoading: isLoadingAssistants } = useQuery({
        queryKey: ['assistants'],
        queryFn: getAssistants,
    });

    const assistant = allAssistants.find(a => a.id === assistantId);

    const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [editedPrompt, setEditedPrompt] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);

    // Handle redirection if assistant is not found
    useEffect(() => {
        if (!isLoadingAssistants && !assistant) {
            toast({
                title: 'Error',
                description: 'Assistant not found',
                variant: 'destructive',
            });
            navigate('/prompt-assistant');
        }
    }, [assistant, isLoadingAssistants, navigate, toast]);

    const isLoading = isLoadingAssistants;

    // Regenerate prompt when language changes (if prompt was already generated)
    useEffect(() => {
        // Only regenerate if there's a generated prompt and we're not editing
        if (assistant && generatedPrompt && Object.keys(fieldValues).length > 0 && !isEditing) {
            // Regenerate the prompt with the new language template
            let prompt = assistant.template[lang];

            // Create field mappings
            const fieldMappings: Record<string, string> = {};
            const fields = Array.isArray(assistant.fields) ? assistant.fields : [];
            fields.forEach((field: any) => {
                const fieldKey = field.name.toLowerCase().replace(/\s+/g, '');
                fieldMappings[fieldKey] = fieldValues[field.name] || '';
            });

            // Replace placeholders
            Object.entries(fieldMappings).forEach(([key, value]) => {
                const placeholder = new RegExp(`\\[${key}\\]`, 'g');
                prompt = prompt.replace(placeholder, value);
            });

            setGeneratedPrompt(prompt);
            setEditedPrompt(prompt);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]); // Only trigger when language changes

    const generatePrompt = async () => {
        if (assistant && Object.keys(fieldValues).length > 0) {
            setIsGenerating(true);
            setProgress(0);
            setGeneratedPrompt('');
            setEditedPrompt('');

            try {
                // Determine step size for a 1.5-second duration (1500ms)
                // If we update every 30ms, we have 50 steps.
                const totalDuration = 1500;
                const intervalTime = 30;
                const totalSteps = totalDuration / intervalTime;
                const incrementPerStep = 100 / totalSteps;

                const progressInterval = setInterval(() => {
                    setProgress(prev => {
                        if (prev >= 98) {
                            clearInterval(progressInterval);
                            return 98;
                        }
                        return prev + incrementPerStep;
                    });
                }, intervalTime);

                await requestQueue.add(async () => {
                    // Force a minimum wait of 3 seconds to show simulation
                    await new Promise(resolve => setTimeout(resolve, totalDuration));

                    let prompt = assistant.template[lang];

                    // Create field mappings using the improved logic from the other project
                    const fieldMappings: Record<string, string> = {};
                    const fields = Array.isArray(assistant.fields) ? assistant.fields : [];
                    fields.forEach((field: any) => {
                        const fieldKey = field.name.toLowerCase().replace(/\s+/g, '');
                        fieldMappings[fieldKey] = fieldValues[field.name] || '';
                    });

                    // Replace placeholders using the field mappings
                    Object.entries(fieldMappings).forEach(([key, value]) => {
                        const placeholder = new RegExp(`\\[${key}\\]`, 'g');
                        prompt = prompt.replace(placeholder, value);
                    });

                    console.log('Generated Prompt (JSON.stringify):', JSON.stringify(prompt));

                    setGeneratedPrompt(prompt);
                    setEditedPrompt(prompt);
                    setIsEditing(false);
                    setProgress(100);

                    // Save prompt to history
                    savePromptHistory(prompt);

                    // Increment trending score (fire-and-forget)
                    incrementTrendingScore(assistant.id);

                    clearInterval(progressInterval);
                });
            } catch (error) {
                console.error('Error generating prompt:', error);
            } finally {
                setIsGenerating(false);
                setTimeout(() => setProgress(0), 500); // Reset progress after completion
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
        if (!assistant) return;
        try {
            const { error } = await supabase
                .from('prompt_history')
                .insert([
                    {
                        assistant_id: assistant.id,
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
        );
    }

    if (!assistant) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate('/prompt-assistant')}
                    className="mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {t('common.back') || 'Back to Assistants'}
                </Button>

                <Card className="card-gradient p-6 max-w-4xl mx-auto">
                    {/* Large banner image at the top */}
                    {assistant.imageSrc ? (
                        <div className="relative mx-auto w-fit max-w-full overflow-hidden rounded-lg mb-4 bg-muted/20 border-4 border-yellow-400">
                            <img
                                src={assistant.imageSrc}
                                alt={assistant.name[lang]}
                                className="block h-auto max-h-[500px] w-auto max-w-full object-contain"
                                loading="lazy"
                            />
                        </div>
                    ) : (
                        <div className="relative w-full pb-[56.25%] bg-primary/20 rounded-lg mb-4 flex items-center justify-center">
                            <Wand2 className="h-1/2 w-1/2 text-primary" />
                        </div>
                    )}

                    {/* Title and subtitle directly under the image */}
                    <h2 className="text-2xl font-bold mb-2">{assistant.name[lang]}</h2>
                    <p className="text-muted-foreground text-sm mb-4">
                        {assistant.description[lang]}
                    </p>

                    {/* Category */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-xs bg-accent/20 dark:bg-accent text-accent-foreground px-2 py-1 rounded inline-block">
                            {assistant.category[lang]}
                        </span>
                    </div>

                    {/* Fields Container (main content area) */}
                    <div ref={fieldsContainerRef} className="mb-6">
                        <div className="grid gap-4">
                            {Array.isArray(assistant.fields) && assistant.fields.map((field: any) => (
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
                                            {field.options?.map((option: any, index: number) => (
                                                <option key={index} value={option.value[lang]}>
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

                    <Button
                        onClick={generatePrompt}
                        disabled={!assistant || Object.keys(fieldValues).length === 0 || isGenerating}
                        className="w-full group mb-6"
                        variant="accent"
                    >
                        {isGenerating ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                                {t('common.loading')}
                            </>
                        ) : (
                            <>
                                <Wand2 className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                                {t('assistant.generatePrompt')}
                            </>
                        )}
                    </Button>

                    {assistant.tutorialUrl && (
                        <Button
                            variant="outline"
                            onClick={() => window.open(assistant.tutorialUrl, '_blank')}
                            className="w-full mb-6 bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary"
                        >
                            <Wand2 className="h-4 w-4 mr-2" />
                            {lang === 'ms' ? 'Cara Penggunaan' : 'How to Use'}
                        </Button>
                    )}

                    {isGenerating && (
                        <div className="mb-6 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                            <div className="relative h-24 w-24">
                                {/* SVG for Circular Progress */}
                                <svg className="h-full w-full" viewBox="0 0 100 100">
                                    {/* Background Circle */}
                                    <circle
                                        className="text-secondary stroke-current"
                                        strokeWidth="8"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="transparent"
                                    ></circle>
                                    {/* Progress Circle */}
                                    <circle
                                        className="text-primary stroke-current transition-all duration-300 ease-out"
                                        strokeWidth="8"
                                        strokeDasharray={2 * Math.PI * 40}
                                        strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
                                        strokeLinecap="round"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="transparent"
                                        transform="rotate(-90 50 50)"
                                    ></circle>
                                </svg>
                                {/* Percentage Text in Center */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-bold text-foreground">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                            </div>
                            <span className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
                                {t('common.loading')}...
                            </span>
                        </div>
                    )}

                    {/* Generated Prompt (if exists) */}
                    {generatedPrompt && (
                        <div ref={generatedPromptRef} className="mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
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

                    {/* Action Buttons */}
                    {generatedPrompt && (
                        <div className="space-y-3">
                            <Button
                                onClick={copyAndNavigateToChatGPT}
                                disabled={!generatedPrompt}
                                className="w-full"
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
                    )}
                </Card>
            </div>
        </div>
    );
}
