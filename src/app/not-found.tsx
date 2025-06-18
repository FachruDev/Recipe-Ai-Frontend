import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900 p-4">
      <div className="text-teal-600 dark:text-teal-400 text-6xl mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
          <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        404 - Page Not Found
      </h1>
      
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        Oops! It seems like the page youre looking for doesnt exist or has been moved.
      </p>
      
      <Link href="/" passHref>
        <Button>
          Return to Home
        </Button>
      </Link>
    </div>
  );
} 