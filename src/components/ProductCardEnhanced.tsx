import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    category?: string;
    scientific?: string;
    product_card?: {
      card_image?: string;
      card_html?: string;
      spin_animation?: string;
      rounded_card?: string;
    };
    images: string[];
    description?: string;
  };
  showAnimation?: boolean;
  variant?: 'default' | 'rounded' | 'animated';
  className?: string;
}

const ProductCardEnhanced: React.FC<ProductCardProps> = ({ 
  product, 
  showAnimation = false, 
  variant = 'default',
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentImage, setCurrentImage] = useState(() => {
    if (variant === 'rounded' && product.product_card?.rounded_card) {
      return product.product_card.rounded_card;
    }
    return product.product_card?.card_image || product.images[0];
  });

  const handleAnimationToggle = () => {
    if (product.product_card?.spin_animation) {
      setIsAnimating(!isAnimating);
    }
  };

  const handleImageSwitch = () => {
    if (product.product_card?.rounded_card && currentImage === product.product_card.card_image) {
      setCurrentImage(product.product_card.rounded_card);
    } else if (product.product_card?.card_image) {
      setCurrentImage(product.product_card.card_image);
    }
  };

  return (
    <div className={`product-card-enhanced relative group ${className}`}>
      <Link href={`/shop/${product.category?.toLowerCase() || 'other'}/${product.id}`}>
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          {/* Main Card Image */}
          <div className="relative aspect-[3/4]">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Spin Animation Overlay */}
            {isAnimating && product.product_card?.spin_animation && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Image
                  src={product.product_card.spin_animation}
                  alt={`${product.name} animation`}
                  width={200}
                  height={200}
                  className="opacity-90 animate-spin"
                />
              </div>
            )}
            
            {/* Animation Toggle Button */}
            {product.product_card?.spin_animation && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAnimationToggle();
                }}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Toggle Animation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}
            
            {/* Image Variant Toggle */}
            {product.product_card?.rounded_card && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleImageSwitch();
                }}
                className="absolute top-2 left-2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Switch Card Style"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Product Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <div className="text-white">
              <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
              {product.scientific && (
                <p className="text-white/70 text-sm italic">{product.scientific}</p>
              )}
              <div className="flex items-center justify-between mt-2">
                <p className="text-white font-bold text-lg">${product.price.toFixed(2)}</p>
                {product.category && (
                  <span className="bg-green-600/80 text-white text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Quick Add to Cart Button */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                // Add to cart functionality
                console.log('Add to cart:', product.name);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
      
      {/* Product Details (on hover) */}
      {product.description && (
        <div className="absolute inset-0 bg-black/90 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center text-center">
          <p className="text-sm leading-relaxed">{product.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductCardEnhanced;
