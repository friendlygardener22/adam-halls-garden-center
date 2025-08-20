export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="mb-6">
          {/* Simple plant/leaf SVG illustration */}
          <svg width="64" height="64" fill="none" viewBox="0 0 64 64" className="mx-auto">
            <ellipse cx="32" cy="48" rx="20" ry="8" fill="#A7F3D0" />
            <path d="M32 48C32 32 48 24 48 8" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
            <path d="M32 48C32 32 16 24 16 8" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-green-700">Page Not Found</h1>
        <p className="mb-6 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        <a href="/" className="btn btn-primary">Back to Home</a>
      </div>
    </main>
  );
} 