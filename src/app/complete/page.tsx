'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Complete() {
  const [showContent, setShowContent] = useState(false);
  const [secret, setSecret] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the secret from the API
    const fetchSecret = async () => {
      try {
        const response = await fetch('/api/secret', {
          method: 'GET'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch secret');
        }

        const data = await response.json();
        if (data.secret) {
          setSecret(data.secret);
          setShowContent(true);
        }
      } catch (error) {
        console.error('Error fetching secret:', error);
        router.push('/');
      }
    };

    fetchSecret();
  }, [router]);

  if (!secret) {
    return null; // Don't show anything until we have the secret
  }

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
          You&apos;ve completed the quest! The secret word is: &quot;{secret}&quot;
        </p>
        <button
          onClick={() => {
            router.push('/');
          }}
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