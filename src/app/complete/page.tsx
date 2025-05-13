'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Complete() {
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Trigger animation after component mount
    setShowContent(true);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600">
      <div 
        className={`text-center transform transition-all duration-1000 ${
          showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="text-9xl mb-8 animate-bounce">🎉</div>
        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
          Congratulations!
        </h1>
        <p className="text-2xl text-white/90 mb-8">
          You've completed the quest!
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-8 py-3 bg-white text-yellow-600 rounded-full font-semibold 
                   hover:bg-yellow-100 transition-colors duration-300 
                   transform hover:scale-105 active:scale-95"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}