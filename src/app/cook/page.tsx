'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { RecipeCard, Recipe } from '@/components/RecipeCard';
import { Header } from '@/components/Header';
import { ApiAlert, ApiServerUnavailable } from '@/components/ApiAlert';
import { FileDropzone } from '@/components/FileDropzone';
import { startSession, selectRecipe, checkApiHealth } from '@/lib/api';
import axios from 'axios';

export default function CookPage() {
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [contextId, setContextId] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);
  const [isSelectingRecipe, setIsSelectingRecipe] = useState(false);
  
  const router = useRouter();
  
  // Check if the API server is available when the page loads
  useEffect(() => {
    checkApiServer();
  }, []);
  
  const checkApiServer = async () => {
    const isAvailable = await checkApiHealth();
    setApiAvailable(isAvailable);
    
    if (!isAvailable) {
      setError('API server is not available. Please make sure the server is running.');
    } else {
      setError(''); 
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!apiAvailable) {
      setError('API server is not available. Please make sure the server is running.');
      return;
    }
    
    if (!ingredients.trim() && !image) {
      setError('Please enter ingredients or upload an image');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const response = await startSession(ingredients, image || undefined);
      setRecipes(response.recipes);
      setContextId(response.context_id);
    } catch (err) {
      // Commented for production
      // console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        // Get detailed error message from API if available
        const apiError = err.response.data?.detail || err.message;
        setError(`Failed to get recipes: ${apiError}`);
      } else {
        setError('Failed to get recipes. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle recipe selection
  const handleSelectRecipe = async (recipe: Recipe) => {
    if (isSelectingRecipe) return; 

    setSelectedRecipe(recipe);
    setIsSelectingRecipe(true);
    setError('');
    
    try {
      await selectRecipe(contextId, recipe.id);
      
      // Navigate to the chat page with the context ID
      // Use a slight delay to allow the state update to complete
      setTimeout(() => {
        router.push(`/chat/${contextId}`);
      }, 100);
    } catch (err) {
      // Commented for production
      // console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        // Get detailed error message from API if available
        const apiError = err.response.data?.detail || err.message;
        setError(`Failed to select recipe: ${apiError}`);
      } else {
        setError('Failed to select recipe. Please try again.');
      }
      setIsSelectingRecipe(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          What ingredients do you have?
        </h1>
        
        {apiAvailable === false && (
          <ApiServerUnavailable />
        )}
        
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 mb-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input 
                label="Enter your ingredients (comma separated)"
                placeholder="e.g., chicken, rice, onions, garlic"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                fullWidth
              />
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 my-4 text-center">
              <p className="text-gray-500 mb-2">or</p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-md p-3 mb-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="h-5 w-5 text-teal-600 dark:text-teal-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-teal-800 dark:text-teal-300">Photo Tips</h3>
                    <div className="mt-1 text-sm text-teal-700 dark:text-teal-400">
                      <p>For best results, please upload a high-definition (HD) image of your ingredients. Make sure the image is well-lit and ingredients are clearly visible.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <FileDropzone
                onFileSelected={(file) => {
                  setImage(file);
                  setError(''); 
                }}
                onFileRemoved={() => setImage(null)}
                selectedFile={image}
                accept="image/jpeg,image/png,image/jpg"
                maxSize={2 * 1024 * 1024} 
                onError={setError}
              />
            </div>
            
            {error && apiAvailable !== false && (
              <ApiAlert error={error} onRetry={apiAvailable === null ? checkApiServer : undefined} showRetry={apiAvailable === null} />
            )}
            
            <div className="text-center">
              <Button 
                type="submit" 
                isLoading={isLoading} 
                fullWidth
                disabled={isLoading || apiAvailable === false}
              >
                Find Recipes
              </Button>
            </div>
          </form>
        </div>
        
        {recipes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Recommended Recipes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={handleSelectRecipe}
                  selected={selectedRecipe?.id === recipe.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 