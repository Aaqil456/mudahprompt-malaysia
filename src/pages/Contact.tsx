import { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      id: '1',
      text: t('lang') === 'ms' 
        ? 'Selamat datang! Bagaimana kami boleh membantu anda hari ini?'
        : 'Welcome! How can we help you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          history: chatHistory
        })
      });

      const data = await response.json();
      
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || (t('lang') === 'ms' 
          ? 'Terima kasih atas mesej anda. Tim kami akan menghubungi anda tidak lama lagi.'
          : 'Thank you for your message. Our team will get back to you shortly.'),
        isUser: false,
        timestamp: new Date()
      };

      setChatHistory(prev => [...prev, botReply]);

      toast({
        title: t('lang') === 'ms' ? 'Mesej Dihantar' : 'Message Sent',
        description: t('lang') === 'ms' 
          ? 'Mesej anda telah berjaya dihantar'
          : 'Your message has been sent successfully',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorReply: Message = {
        id: (Date.now() + 1).toString(),
        text: t('lang') === 'ms'
          ? 'Maaf, berlaku ralat. Sila cuba lagi atau hubungi kami di support@mudahprompt.my'
          : 'Sorry, there was an error. Please try again or contact us at support@mudahprompt.my',
        isUser: false,
        timestamp: new Date()
      };

      setChatHistory(prev => [...prev, errorReply]);
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

        {/* Chat Interface */}
        <div className="max-w-2xl mx-auto">
          <Card className="card-gradient">
            {/* Chat History */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      msg.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-70">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="border-t border-border p-6">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('contact.placeholder')}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  variant="accent"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">{t('contact.send')}</span>
                </Button>
              </form>
            </div>
          </Card>

          {/* Additional Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              {t('lang') === 'ms'
                ? 'Atau hubungi kami melalui:'
                : 'Or reach us through:'
              }
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <h3 className="font-semibold mb-2">
                  {t('lang') === 'ms' ? 'Sokongan Teknikal' : 'Technical Support'}
                </h3>
                <p className="text-sm text-muted-foreground">support@mudahprompt.my</p>
              </Card>
              
              <Card className="p-4 text-center">
                <h3 className="font-semibold mb-2">
                  {t('lang') === 'ms' ? 'Perniagaan' : 'Business'}
                </h3>
                <p className="text-sm text-muted-foreground">business@mudahprompt.my</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}