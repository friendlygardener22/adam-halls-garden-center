export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-4">Sorry, we couldn't find this product.</p>
        <a href="/shop" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Back to Shop</a>
      </div>
    </div>
  );
} 