/**
 * Debug utility to log API requests and responses
 * 
 * This module uses environment variables to control debugging:
 * - NEXT_PUBLIC_DEBUG_MODE: Set to 'true' to enable debugging
 */

import { AxiosError } from "axios";

// Check if debug mode is enabled via environment variable
const DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';

/**
 * Log API requests with data in a formatted way
 */
export function logApiRequest(endpoint: string, data: unknown): void {
  if (!DEBUG_MODE) return;
  
  console.group(`🚀 API Request: ${endpoint}`);
  console.log('Request Data:', data);
  console.groupEnd();
}

/**
 * Log API responses in a formatted way
 */
export function logApiResponse(endpoint: string, response: unknown): void {
  if (!DEBUG_MODE) return;
  
  console.group(`✅ API Response: ${endpoint}`);
  console.log('Response Data:', response);
  console.groupEnd();
}

/**
 * Log API errors in a formatted way
 */
export function logApiError(endpoint: string, error: unknown): void {
  if (!DEBUG_MODE) return;
  
  console.group(`❌ API Error: ${endpoint}`);
  console.error('Error:', error);
  
  // Log detailed error information if available
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as AxiosError;
    console.error('Response Status:', axiosError.response?.status);
    console.error('Response Data:', axiosError.response?.data);
    console.error('Response Headers:', axiosError.response?.headers);
  } else if (error && typeof error === 'object' && 'request' in error) {
    const axiosError = error as AxiosError;
    console.error('Request:', axiosError.request);
  } else if (error instanceof Error) {
    console.error('Message:', error.message);
  }
  
  console.groupEnd();
}

/**
 * Utility to inspect FormData contents
 * FormData can't be directly logged, so this converts it to an object
 */
export function inspectFormData(formData: FormData): Record<string, unknown> {
  if (!DEBUG_MODE) return {};
  
  const result: Record<string, unknown> = {};
  
  formData.forEach((value, key) => {
    if (value instanceof File) {
      result[key] = {
        fileName: value.name,
        type: value.type,
        size: `${(value.size / 1024).toFixed(2)} KB`,
      };
    } else {
      result[key] = value;
    }
  });
  
  return result;
} 