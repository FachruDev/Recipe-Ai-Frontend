import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white dark:bg-zinc-800 shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-teal-600 dark:text-teal-400">
          Chef AI
        </Link>
        <nav className="flex gap-4">
          <Link 
            href="/cook" 
            className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
          >
            Cook
          </Link>
        </nav>
      </div>
    </header>
  );
} 