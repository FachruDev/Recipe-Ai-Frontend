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
      setError('API server is not available. Please make sure the backend server is running.');
    } else {
      setError(''); 
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!apiAvailable) {
      setError('API server is not available. Please make sure the backend server is running.');
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
            
            <FileDropzone
              onFileSelected={(file) => {
                setImage(file);
                setError(''); 
              }}
              onFileRemoved={() => setImage(null)}
              selectedFile={image}
              accept="image/jpeg,image/png,image/jpg"
              maxSize={1 * 1024 * 1024} 
              onError={setError}
            />
            
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