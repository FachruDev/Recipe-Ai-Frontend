import axios from 'axios';
import { Recipe } from '@/components/RecipeCard';
import { logApiRequest, logApiResponse, logApiError, inspectFormData } from './debug';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

interface SessionResponse {
  context_id: string;
  recipes: Recipe[];
}

/**
 * Check if the API server is up and running
 * This is useful to provide a better user experience when the server isn't available
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    await axios.get(API_BASE_URL, { timeout: 3000 });
    return true;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    // Commented for production
    // console.error('API server not available:', _error);
    return false;
  }
}

// Function to start a new session with ingredients
export async function startSession(ingredients: string, image?: File): Promise<SessionResponse> {
  const formData = new FormData();
  const endpoint = '/api/session/';
  
  if (ingredients && ingredients.trim()) {
    formData.append('text', ingredients.trim());
  }
  
  if (image) {
    // Ensure we're using the correct field name expected by the API
    formData.append('image', image, image.name);
  }
  
  // Log the request data in a readable format
  logApiRequest(endpoint, inspectFormData(formData));
  
  try {
    const response = await api.post<SessionResponse>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    });
    
    logApiResponse(endpoint, response.data);
    return response.data;
  } catch (error) {
    logApiError(endpoint, error);
    throw error;
  }
}

// Function to select a recipe
export async function selectRecipe(contextId: string, recipeId: string): Promise<void> {
  if (!contextId) {
    throw new Error('Context ID is required');
  }
  
  if (!recipeId) {
    throw new Error('Recipe ID is required');
  }
  
  const endpoint = `/api/session/${contextId}/select`;
  const data = { recipe_id: recipeId };
  
  logApiRequest(endpoint, data);
  
  try {
    const response = await api.post(endpoint, data, {
      timeout: 5000, // 5 second timeout
    });
    logApiResponse(endpoint, response.data);
  } catch (error) {
    logApiError(endpoint, error);
    
    // Add more context to the error
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. The server might be busy or unavailable.');
    }
    
    throw error;
  }
}

// Function to send a chat message
export async function sendChatMessage(contextId: string, message: string): Promise<string> {
  if (!contextId) {
    throw new Error('Context ID is required');
  }
  
  const endpoint = `/api/session/${contextId}/chat`;
  const data = { message };
  
  logApiRequest(endpoint, data);
  
  try {
    const response = await api.post<{ reply: string }>(endpoint, data);
    logApiResponse(endpoint, response.data);
    return response.data.reply;
  } catch (error) {
    logApiError(endpoint, error);
    throw error;
  }
}

// Function to end a session
export async function endSession(contextId: string): Promise<void> {
  if (!contextId) {
    // Commented for production
    // console.warn('Attempted to end session with empty context ID');
    return;
  }
  
  const endpoint = `/api/session/${contextId}/end`;
  
  logApiRequest(endpoint, 'DELETE request - no body');
  
  try {
    const response = await api.delete(endpoint);
    logApiResponse(endpoint, response.data);
  } catch (error) {
    logApiError(endpoint, error);
    // We don't throw the error here as this is typically called during cleanup
    // Commented for production
    // console.error('Failed to end session:', error);
  }
} 