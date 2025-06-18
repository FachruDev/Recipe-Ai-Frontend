'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import { ChatMessage } from '@/components/ChatMessage';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { sendChatMessage, endSession } from '@/lib/api';

interface ChatMessage {
  message: string;
  isUser: boolean;
}

// Suggested questions for recipes
const SUGGESTED_QUESTIONS = [
  "How can I adjust this recipe for dietary restrictions?",
  "What are good side dishes to serve with this?",
  "Can I substitute any ingredients?",
  "How do I know when it's perfectly cooked?",
  "Can I prepare any parts of this recipe ahead of time?",
  "What's the best way to store leftovers?",
  "What cooking techniques are used in this recipe?",
  "How spicy is this dish and can I adjust the heat level?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEndingSession, setIsEndingSession] = useState(false);
  const [showEndSessionDialog, setShowEndSessionDialog] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();
  const contextId = params.contextId as string;
  
  useEffect(() => {
    // Add initial AI greeting
    setMessages([
      { 
        message: "I'm here to help with your selected recipe. What would you like to know?", 
        isUser: false 
      }
    ]);
    
    // No automatic cleanup - we'll let the user end the session manually
  }, [contextId]);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { message: userMessage, isUser: true }]);
    setIsLoading(true);
    setError('');
    
    try {
      // Send message to API
      const reply = await sendChatMessage(contextId, userMessage);
      
      // Add AI response
      setMessages(prev => [...prev, { message: reply, isUser: false }]);
    } catch (err) {
      console.error("Failed to send chat message:", err); 
      setError('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };
  
  const handleBack = () => {
    router.push('/cook');
  };
  
  const handleEndSessionClick = () => {
    setShowEndSessionDialog(true);
  };
  
  const handleEndSession = async () => {
    setIsEndingSession(true);
    try {
      await endSession(contextId);
      router.push('/cook');
    } catch (err) {
      console.error("Failed to end session:", err);
      setError('Failed to end session. You can still navigate away safely.');
      setIsEndingSession(false);
      setShowEndSessionDialog(false);
    }
  };

  const getRandomSuggestions = (count: number = 3) => {
    const shuffled = [...SUGGESTED_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  const suggestedQuestions = getRandomSuggestions();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex flex-col">
      <header className="bg-white dark:bg-zinc-800 shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
          >
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Recipes
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Chef AI Assistant</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleEndSessionClick}
            className="text-red-600 hover:text-red-800 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30"
          >
            End Session
          </Button>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6 overflow-hidden flex flex-col">
        <div className="flex-grow overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.message} isUser={msg.isUser} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 rounded-bl-none max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          {error && <p className="text-center text-red-500 my-2">{error}</p>}
          <div ref={messagesEndRef}></div>
        </div>
        
        {/* Suggested questions */}
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="text-sm bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full px-3 py-1 text-gray-700 dark:text-gray-300 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4">
          <TextArea
            placeholder="Ask about the recipe..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            onEnterPress={handleSubmit}
          />
          <div className="mt-2 flex justify-end">
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              isLoading={isLoading}
            >
              Send
            </Button>
          </div>
        </form>
      </main>
      
      <ConfirmDialog
        isOpen={showEndSessionDialog}
        title="End Session"
        message="Are you sure you want to end this session? This will delete the conversation history."
        confirmText="End Session"
        cancelText="Cancel"
        onConfirm={handleEndSession}
        onCancel={() => setShowEndSessionDialog(false)}
        isConfirmLoading={isEndingSession}
        isDanger={true}
      />
    </div>
  );
}