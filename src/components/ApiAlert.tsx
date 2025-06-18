import React from 'react';

interface ApiAlertProps {
  error: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ApiAlert({ error, onRetry, showRetry = false }: ApiAlertProps) {
  return (
    <div className="max-w-2xl mx-auto mb-8 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <svg
          className="h-5 w-5 text-red-600 dark:text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="font-medium text-red-800 dark:text-red-300">Error</h3>
      </div>
      
      <p className="text-red-700 dark:text-red-300">
        {error}
      </p>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 text-sm font-medium text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100 underline"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export function ApiServerUnavailable() {
  return (
    <div className="max-w-2xl mx-auto mb-8 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <svg
          className="h-5 w-5 text-red-600 dark:text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="font-medium text-red-800 dark:text-red-300">Server Not Available</h3>
      </div>
      
      {/* <p className="text-red-700 dark:text-red-300">
        The API server is not responding. Please ensure your backend server is running at: 
        <code className="bg-red-200 dark:bg-red-900 px-1 py-0.5 rounded ml-1">
          http://127.0.0.1:8000
        </code>
      </p> */}
      
      <div className="mt-3 text-sm text-red-700 dark:text-red-300 border-t border-red-200 dark:border-red-800 pt-2">
        <p className="font-medium">Troubleshooting steps:</p>
        <ol className="list-decimal list-inside ml-2 mt-1 space-y-1">
          <li>Check if the server is running</li>
          {/* <li>Ensure the server is listening on port 8000</li>
          <li>Verify there are no CORS issues blocking the requests</li>
          <li>Restart the backend server if necessary</li> */}
        </ol>
      </div>
    </div>
  );
} 