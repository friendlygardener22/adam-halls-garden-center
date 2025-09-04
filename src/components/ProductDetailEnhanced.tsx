'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { formatPrice } from '@/utils/formatPrice';
import { careGuides } from '@/data/care-guides';

interface ProductDetailEnhancedProps {
  product: any;
  onAddToCart?: (product: any) => void;
  onAddToWishlist?: (product: any) => void;
}

const ProductDetailEnhanced: React.FC<ProductDetailEnhancedProps> = ({
  product,
  onAddToCart,
  onAddToWishlist
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleAddToWishlist = () => {
    if (onAddToWishlist) {
      onAddToWishlist(product);
    }
  };

  const getCareGuide = (plantName: string) => {
    const name = plantName.toLowerCase();
    if (name.includes('hydrangea')) return careGuides.plants.hydrangea;
    if (name.includes('maple')) return careGuides.plants.japaneseMaple;
    if (name.includes('lavender')) return careGuides.plants.lavender;
    if (name.includes('rose')) return careGuides.plants.roses;
    return null;
  };

  const careGuide = getCareGuide(product.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.images && product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-green-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  aria-label={`View ${product.name} image ${index + 1}`}
                  title={`View ${product.name} image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 20vw, 10vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            {product.scientific && (
              <p className="text-lg text-gray-600 italic mb-2">{product.scientific}</p>
            )}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-green-600">{formatPrice(product.price)}</span>
              {product.rating && (
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {product.category}
              </span>
              {product.availability && (
                <span className={`px-2 py-1 rounded-full ${
                  product.availability === 'In Stock' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.availability}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Add to wishlist"
              title="Add to wishlist"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex space-x-8">
              {['description', 'care', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                  {product.features && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Key Features:</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {product.features.map((feature: string, index: number) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-6">
                  {product.care ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(product.care).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 capitalize mb-2">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="text-gray-700">{value as string}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No care information available for this product.</p>
                  )}

                  {careGuide && (
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-4">{careGuide.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(careGuide.care).map(([key, value]) => (
                          <div key={key}>
                            <h4 className="font-medium text-green-800 capitalize mb-1">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <p className="text-green-700 text-sm">{value as string}</p>
                          </div>
                        ))}
                      </div>
                      {careGuide.tips && (
                        <div className="mt-4">
                          <h4 className="font-medium text-green-800 mb-2">Care Tips:</h4>
                          <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
                            {careGuide.tips.map((tip: string, index: number) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="space-y-4">
                  {product.size && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Size Information:</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(product.size).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-3 rounded">
                            <span className="text-sm font-medium text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <p className="text-gray-900">{value as string}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.specifications && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Specifications:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-3 rounded">
                            <span className="text-sm font-medium text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <p className="text-gray-900">
                              {Array.isArray(value) ? value.join(', ') : value as string}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.hardinessZone && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Hardiness Zone:</h3>
                      <p className="text-blue-800">{product.hardinessZone}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-8">
                  <p className="text-gray-600">Reviews feature coming soon!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailEnhanced;
