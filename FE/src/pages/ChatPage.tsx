import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI philosophy companion. I can discuss philosophical concepts, help analyze quotes, and explore the ideas of great thinkers with you. What would you like to explore today?',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString() + '_user',
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call the actual backend API
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: Date.now().toString() + '_ai',
        content: data.response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback response if backend is not available
      const mockResponse: Message = {
        id: Date.now().toString() + '_ai',
        content: `I apologize, but I'm currently unable to connect to my knowledge base. However, your question about "${inputMessage}" is deeply philosophical and worth exploring!

Consider these general approaches to philosophical inquiry:

• **Question the assumptions** - What underlying beliefs does your question rest on?
• **Explore multiple perspectives** - How might different philosophers approach this?
• **Consider the implications** - What would the consequences be if your view were widely accepted?
• **Seek clarity** - Can we define the key terms more precisely?

When my connection is restored, I'd love to give you a more detailed philosophical analysis. Please try again later!`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, mockResponse]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">AI Philosophy Chat</h1>
          <p className="text-amber-700">Engage in meaningful conversations about philosophy, life, and wisdom</p>
        </div>

        <Card className="h-[70vh] flex flex-col">
          <CardHeader className="border-b bg-gradient-to-r from-amber-100 to-yellow-100">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-amber-700" />
              Philosophy AI Assistant
              <Badge variant="secondary" className="ml-auto">Online</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="h-full flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'ai' && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-amber-200 text-amber-800">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.sender === 'user'
                            ? 'bg-amber-600 text-white'
                            : 'bg-white border border-amber-200 text-amber-900'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <p className="text-xs text-amber-600 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {message.sender === 'user' && (
                      <Avatar className="w-8 h-8 mt-1 order-2">
                        <AvatarFallback className="bg-blue-200 text-blue-800">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-amber-200 text-amber-800">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white border border-amber-200 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2 text-amber-600">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t bg-gray-50 p-4">
                <div className="flex gap-2">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about philosophy, ethics, existence, or any philosophical question..."
                    className="flex-1 resize-none rounded-lg border border-amber-300 p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    rows={1}
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-amber-600 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;