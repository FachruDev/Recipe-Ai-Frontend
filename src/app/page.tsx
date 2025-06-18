import Link from "next/link";
import { Header } from "@/components/Header";
import FloatingIngredients from "@/components/FloatingIngredients";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      <Header />

      <main className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Turn Your Ingredients Into Delicious Recipes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Chef AI helps you create amazing meals with ingredients you already have. Just list what in your pantry or snap a photo!
            </p>
            <div className="pt-4">
              <Link 
                href="/cook" 
                className="px-6 py-3 text-lg rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-colors inline-flex items-center"
              >
                Start Cooking
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <FloatingIngredients />
          </div>

        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Enter Ingredients</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Type in the ingredients you have or upload a photo of your pantry.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🍳</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Recipes</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our AI generates personalized recipes based on what you have available.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Chat For Help</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ask questions about the recipe and get cooking assistance in real-time.
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-20 py-8 bg-gray-100 dark:bg-zinc-900">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} FachruDev - Smart Recipe Assistant</p>
        </div>
      </footer>
    </div>
  );
}