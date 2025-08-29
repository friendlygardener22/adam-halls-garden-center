#!/usr/bin/env python3
"""
Integrate Product Cards
Copies product card images and HTML files to the website and updates product data.
"""

import os
import shutil
import json
from pathlib import Path

def copy_product_card_files():
    """Copy product card files to the website structure."""
    
    # Source files from desktop
    source_files = [
        r"C:\Users\taylo\OneDrive\Desktop\TRE-ACE-25GAL-001_card.png",
        r"C:\Users\taylo\OneDrive\Desktop\TRE-ACE-25GAL-001_card.html",
        r"C:\Users\taylo\OneDrive\Desktop\japanese_maple_spin_slow.gif",
        r"C:\Users\taylo\OneDrive\Desktop\japanese_maple_card_rounded.png"
    ]
    
    # Destination directory
    dest_dir = "public/images/product-cards"
    
    # Create destination directory if it doesn't exist
    os.makedirs(dest_dir, exist_ok=True)
    
    print("Copying product card files...")
    
    copied_files = []
    for source_file in source_files:
        if os.path.exists(source_file):
            filename = os.path.basename(source_file)
            dest_file = os.path.join(dest_dir, filename)
            
            try:
                shutil.copy2(source_file, dest_file)
                copied_files.append(filename)
                print(f"✅ Copied: {filename}")
            except Exception as e:
                print(f"❌ Error copying {filename}: {e}")
        else:
            print(f"⚠️  File not found: {source_file}")
    
    return copied_files

def update_product_with_card(product_id, card_files):
    """Update a specific product with card information."""
    
    json_path = "src/api/products.json"
    
    # Read current products
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Find the product (Japanese Maple with SKU TRE-ACE-25GAL-001)
    product_found = False
    for product in data['products']:
        if product.get('sku') == 'TRE-ACE-25GAL-001' or product.get('id') == product_id:
            # Update product with card information
            product['product_card'] = {
                'card_image': '/images/product-cards/TRE-ACE-25GAL-001_card.png',
                'card_html': '/images/product-cards/TRE-ACE-25GAL-001_card.html',
                'spin_animation': '/images/product-cards/japanese_maple_spin_slow.gif',
                'rounded_card': '/images/product-cards/japanese_maple_card_rounded.png'
            }
            
            # Update images array to include the new card
            if 'images' not in product:
                product['images'] = []
            
            # Add card images to the images array
            product['images'].extend([
                '/images/product-cards/TRE-ACE-25GAL-001_card.png',
                '/images/product-cards/japanese_maple_card_rounded.png'
            ])
            
            product_found = True
            print(f"✅ Updated product {product['name']} (ID: {product['id']}) with card information")
            break
    
    if not product_found:
        print(f"⚠️  Product with SKU TRE-ACE-25GAL-001 or ID {product_id} not found")
        return False
    
    # Write updated data back to file
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    return True

def create_product_card_component():
    """Create a React component for displaying product cards."""
    
    component_code = '''import React from 'react';
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
'''
    
    # Write component to file
    component_path = "src/components/ProductCard.tsx"
    with open(component_path, 'w', encoding='utf-8') as f:
        f.write(component_code)
    
    print(f"✅ Created ProductCard component: {component_path}")

def create_card_integration_guide():
    """Create a guide for integrating product cards."""
    
    guide_content = '''# Product Card Integration Guide

## Overview
This guide explains how to integrate product cards into the Adam Halls Garden Center website.

## File Structure
```
public/images/product-cards/
├── TRE-ACE-25GAL-001_card.png          # Main product card image
├── TRE-ACE-25GAL-001_card.html         # HTML version of card
├── japanese_maple_spin_slow.gif        # Animated spin effect
└── japanese_maple_card_rounded.png     # Rounded card variant
```

## Product Data Structure
Each product with a card will have a `product_card` object:
```json
{
  "product_card": {
    "card_image": "/images/product-cards/TRE-ACE-25GAL-001_card.png",
    "card_html": "/images/product-cards/TRE-ACE-25GAL-001_card.html",
    "spin_animation": "/images/product-cards/japanese_maple_spin_slow.gif",
    "rounded_card": "/images/product-cards/japanese_maple_card_rounded.png"
  }
}
```

## Usage Examples

### 1. Display Product Card
```jsx
import ProductCard from '@/components/ProductCard';

<ProductCard product={product} />
```

### 2. Display with Animation
```jsx
<ProductCard product={product} showAnimation={true} />
```

### 3. Access Card Files
```jsx
const cardImage = product.product_card?.card_image;
const spinAnimation = product.product_card?.spin_animation;
```

## Adding New Product Cards

1. **Copy Files**: Place card files in `public/images/product-cards/`
2. **Update Product**: Add `product_card` object to product data
3. **Test Display**: Verify card displays correctly on website

## File Naming Convention
- Use SKU-based naming: `{SKU}_card.png`
- Include variants: `{SKU}_card_rounded.png`
- Add animations: `{plant_name}_spin_slow.gif`

## Next Steps
- Create cards for all 890 products
- Implement card gallery view
- Add card filtering and search
- Create card preview modal
'''
    
    # Write guide to file
    guide_path = "PRODUCT_CARD_INTEGRATION_GUIDE.md"
    with open(guide_path, 'w', encoding='utf-8') as f:
        f.write(guide_content)
    
    print(f"✅ Created integration guide: {guide_path}")

def main():
    """Main integration function."""
    
    print("🌱 Integrating Product Cards into Adam Halls Garden Center")
    print("=" * 60)
    
    # Step 1: Copy product card files
    print("\n📁 Step 1: Copying product card files...")
    copied_files = copy_product_card_files()
    
    if not copied_files:
        print("❌ No files were copied. Please check file paths.")
        return
    
    # Step 2: Update product data
    print("\n📝 Step 2: Updating product data...")
    success = update_product_with_card(1, copied_files)  # Japanese Maple is ID 1
    
    if not success:
        print("❌ Failed to update product data.")
        return
    
    # Step 3: Create React component
    print("\n⚛️  Step 3: Creating React component...")
    create_product_card_component()
    
    # Step 4: Create integration guide
    print("\n📖 Step 4: Creating integration guide...")
    create_card_integration_guide()
    
    # Summary
    print("\n" + "=" * 60)
    print("🎉 PRODUCT CARD INTEGRATION COMPLETE!")
    print("=" * 60)
    print(f"✅ Copied {len(copied_files)} files to public/images/product-cards/")
    print("✅ Updated Japanese Maple product with card information")
    print("✅ Created ProductCard React component")
    print("✅ Created integration guide")
    print("\n📋 Next Steps:")
    print("1. Restart the development server")
    print("2. Visit http://localhost:3000 to see the updated product")
    print("3. Check the Japanese Maple product page for the new card")
    print("4. Use the integration guide to add more product cards")

if __name__ == "__main__":
    main()
