import React from 'react';

interface RecipeResponseProps {
  content: string;
}

export function RecipeResponse({ content }: RecipeResponseProps) {
  // Clean and process the content for better display
  const processContent = (text: string) => {
    // Check if this looks like a recipe response
    if (text.includes('Ingredients:') && text.includes('Instructions:')) {
      // Clean the text - remove excessive symbols and formatting
      const cleanedText = text
        .replace(/\*\*/g, '') // Remove ** markdown bold
        .replace(/###/g, '') // Remove ### markdown headers
        .replace(/\n\s*-\s*/g, '\n- ') // Normalize bullet points
        .replace(/\n\d+\.\s*/g, '\n- ') // Convert numbered lists to bullet points for consistency
        .replace(/\n\s*([A-Z][^:]+):/g, '\n$1:') // Fix section headers
        .trim();
      
      // Extract title if present
      let title = '';
      const titleMatch = cleanedText.match(/(?:recipe for|for making|let's make|how to make|prepare) ["']?([^"'\n.]+)["']?/i);
      if (titleMatch && titleMatch[1]) {
        title = titleMatch[1].trim();
        if (title.endsWith('.')) title = title.slice(0, -1);
      }
      
      // Extract ingredients section
      const sections = [];
      
      // Add title if found
      if (title) {
        sections.push(
          <div key="title" className="mb-4">
            <h3 className="text-xl font-bold text-teal-700 dark:text-teal-400">{title}</h3>
          </div>
        );
      }
      
      // Process ingredients
      const ingredientsMatch = cleanedText.match(/Ingredients:([\s\S]*?)(?=Instructions:|$)/i);
      if (ingredientsMatch && ingredientsMatch[1]) {
        let ingredientsText = ingredientsMatch[1].trim();
        
        // Further clean up ingredients text
        ingredientsText = ingredientsText
          .replace(/^\s*-\s*/gm, '') // Remove leading bullet points
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        
        // Split ingredients by line or by recognizable patterns
        const ingredientsList = ingredientsText
          .split(/\n|(?<=\))\s+(?=\d+|[a-zA-Z])|(?<=\w)\s+(?=\d+\s+[a-zA-Z]+\s+)/)
          .map(item => item.trim())
          .filter(item => item.length > 0);
        
        if (ingredientsList.length > 0) {
          sections.push(
            <div key="ingredients" className="mb-6 bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
              <h4 className="font-bold text-lg mb-3 text-teal-800 dark:text-teal-300 border-b border-teal-200 dark:border-teal-800 pb-2">
                Ingredients
              </h4>
              <ul className="space-y-2">
                {ingredientsList.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-4 h-4 mt-1 mr-2 bg-teal-500 dark:bg-teal-600 rounded-full flex-shrink-0"></span>
                    <span className="text-gray-800 dark:text-gray-200">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
      }
      
      // Process instructions
      const instructionsMatch = cleanedText.match(/Instructions:([\s\S]*?)(?=Notes:|Serve:|Enjoy|$)/i);
      if (instructionsMatch && instructionsMatch[1]) {
        let instructionsText = instructionsMatch[1].trim();
        
        // Clean up instructions
        instructionsText = instructionsText
          .replace(/^\s*-\s*/gm, '') // Remove leading bullet points
          .trim();
        
        // Split by recognizable step patterns
        const stepPatterns = [
          /(?:^|\n)(?:Step \d+:|Prepare|Mix|Cook|Fry|Bake|Serve|Add|Cut|Peel|Chop|Boil|Simmer|Stir|Pour|Place|Remove|Let|Allow|Garnish|Sprinkle)[^:]*:/gi,
          /(?:^|\n)(?:\d+\.)/,
          /(?:^|\n)(?:[A-Z][^:]*:)/,
        ];
        
        let steps: string[] = [];
        const currentText = instructionsText;
        
        // Try different patterns until we get reasonable steps
        for (const pattern of stepPatterns) {
          if (currentText.match(pattern)) {
            steps = currentText.split(pattern)
              .filter(step => step.trim().length > 0)
              .map(step => step.trim());
            
            if (steps.length > 1) break;
          }
        }
        
        // If no pattern matched well, just split by newlines
        if (steps.length <= 1) {
          steps = instructionsText.split(/\n+/)
            .filter(step => step.trim().length > 0)
            .map(step => step.trim());
        }
        
        if (steps.length > 0) {
          sections.push(
            <div key="instructions" className="mb-6 bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-lg">
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                Instructions
              </h4>
              <ol className="space-y-3">
                {steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 font-medium text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          );
        }
      }
      
      // Extract any notes or serving suggestions
      const notesMatch = cleanedText.match(/(?:Notes:|Serve:|Enjoy)([\s\S]*?)$/i);
      if (notesMatch && notesMatch[1] && notesMatch[1].trim()) {
        sections.push(
          <div key="notes" className="mt-4 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-gray-700 dark:text-gray-300 italic">
            <span className="font-medium">Tip:</span> {notesMatch[1].trim()}
          </div>
        );
      }
      
      // If we successfully parsed the recipe, return the formatted version
      if (sections.length > 0) {
        return (
          <div className="recipe-response bg-white dark:bg-zinc-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            {sections}
          </div>
        );
      }
    }
    
    // If we couldn't parse it as a recipe, return the original text with preserved whitespace
    return <div className="whitespace-pre-wrap">{text}</div>;
  };

  return processContent(content);
} 