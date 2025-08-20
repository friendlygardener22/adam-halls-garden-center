'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong in this category!</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button onClick={() => reset()} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Try again</button>
      </div>
    </div>
  );
} 