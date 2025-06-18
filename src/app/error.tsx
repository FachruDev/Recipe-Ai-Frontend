'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // Commented for production
    // console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900 p-4">
      <div className="text-red-500 text-6xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
          <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Something went wrong!
      </h1>
      
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        We apologize for the inconvenience. Please try again or return to the home page.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset}>
          Try Again
        </Button>
        
        <Link href="/" passHref>
          <Button variant="secondary">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}