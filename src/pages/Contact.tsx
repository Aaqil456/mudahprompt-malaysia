import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Using standard button
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();

  const [subject, setSubject] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim() || isLoading) {
      toast({
        title: t('contact.form.validationError'),
        description: t('contact.form.messageRequired'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('feedback_submissions')
        .insert([
          {
            subject,
            message: feedbackMessage,
            user_id: user?.id || null,
          },
        ]);

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: t('contact.form.successTitle'),
        description: t('contact.form.successDescription'),
      });

      // Clear form fields
      setSubject('');
      setFeedbackMessage('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: t('contact.form.errorTitle'),
        description: t('contact.form.errorDescription'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-xl text-muted-foreground mb-8">
            {t('contact.subtitle')}
          </p>
          
          <div className="flex items-center justify-center text-muted-foreground">
            <Mail className="h-5 w-5 mr-2" />
            <span>{t('contact.email')}</span>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 card-gradient">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="subject">{t('contact.form.subjectLabel')}</Label>
                <Input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={t('contact.form.subjectPlaceholder')}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="message">{t('contact.form.messageLabel')}</Label>
                <Textarea
                  id="message"
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={5}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('contact.form.submitting') : t('contact.form.submitButton')}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>


        </div>
      </div>
    </div>
  );
}
