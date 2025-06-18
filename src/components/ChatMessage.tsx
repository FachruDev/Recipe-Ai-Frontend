import { RecipeResponse } from './RecipeResponse';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export function ChatMessage({ message, isUser }: ChatMessageProps) {
  // Determine if the message might be a recipe response
  const isRecipeResponse = !isUser && 
    (message.includes('Ingredients:') && message.includes('Instructions:'));
  
  // Format regular text with markdown-style formatting
  const formatText = (text: string) => {
    // Replace bold text (**text**)
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    
    // Replace headers (###)
    formattedText = formattedText.replace(/###\s+(.*?)(?=\n|$)/g, '<h3 class="text-lg font-bold my-2">$1</h3>');
    
    // Format numbered lists (1. Text, 2. Text, etc.)
    formattedText = formattedText.replace(
      /(\d+\.)\s+(.*?)(?=\n\d+\.|$)/g,
      (match, number, content) => {
        // Process the content to maintain line breaks within the item
        const processedContent = content.trim().replace(/\n/g, '<br/>');
        return `<div class="flex mb-3">
          <div class="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 flex items-center justify-center mr-3 mt-0.5">${number.replace('.', '')}</div>
          <div class="flex-1">${processedContent}</div>
        </div>`;
      }
    );
    
    // Format bullet points
    formattedText = formattedText.replace(
      /•\s+(.*?)(?=\n•|$)/g,
      '<div class="flex mb-2"><span class="flex-shrink-0 mr-2">•</span><span>$1</span></div>'
    );
    
    return formattedText;
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[85%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-teal-600 text-white rounded-br-none'
            : 'bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
        }`}
      >
        {isRecipeResponse ? (
          <RecipeResponse content={message} />
        ) : (
          <div 
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: formatText(message) }}
          />
        )}
      </div>
    </div>
  );
} 