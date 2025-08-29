import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    product_card?: {
      card_image: string;
      card_html: string;
      spin_animation: string;
      rounded_card: string;
    };
    images: string[];
  };
  showAnimation?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAnimation = false }) => {
  const cardImage = product.product_card?.card_image || product.images[0];
  const spinAnimation = product.product_card?.spin_animation;
  
  return (
    <div className="product-card relative group">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        {/* Main Card Image */}
        <div className="relative">
          <Image
            src={cardImage}
            alt={product.name}
            width={300}
            height={400}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Spin Animation Overlay */}
          {showAnimation && spinAnimation && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={spinAnimation}
                alt={`${product.name} animation`}
                width={200}
                height={200}
                className="opacity-80"
              />
            </div>
          )}
        </div>
        
        {/* Product Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold text-lg">{product.name}</h3>
          <p className="text-white/90 text-sm">${product.price.toFixed(2)}</p>
        </div>
      </div>
      
      {/* Hover Effects */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
    </div>
  );
};

export default ProductCard;
