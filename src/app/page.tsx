'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!input.trim()) {
      setError('Please enter a value');
      return;
    }
    
    try {
      const response = await fetch('/api/secret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
        cache: 'no-store'
      });
      
      const data = await response.json();
      
      if (response.ok) {
        router.push('/complete');
      } else {
        setError(data.error || 'Incorrect secret. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <button
          type="submit"
          className="w-32 h-32 rounded-full bg-red-500 hover:bg-red-600 transition-colors mb-8 flex items-center justify-center text-white text-xl font-bold"
        >
          GET
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter your guess..."
        />
        {error && (
          <p className="text-sm text-gray-600 mt-2 max-w-md text-center break-all">
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
