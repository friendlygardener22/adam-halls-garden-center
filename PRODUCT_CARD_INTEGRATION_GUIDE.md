# Product Card Integration Guide

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
