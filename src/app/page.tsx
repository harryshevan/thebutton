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
    
    try {
      const response = await fetch(`/api/check?text=${encodeURIComponent(input)}`);
      const data = await response.json();
      
      if (data.success) {
        router.push('/complete');
      } else {
        console.log(data);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <button
        className="w-32 h-32 rounded-full bg-red-500 hover:bg-red-600 transition-colors mb-8"
        onClick={() => {}}
      />
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter your guess..."
        />
        <button
          type="submit"
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Submit
        </button>
        {error && (
          <p className="text-sm text-gray-600 mt-2 max-w-md text-center break-all">
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
