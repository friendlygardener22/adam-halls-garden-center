# Adam Halls Garden Center - Product Catalog Documentation

## 📚 Product Catalog System Overview

The Adam Halls Garden Center product catalog is a comprehensive system designed to showcase plants, garden tools, supplies, and seasonal items with detailed information, care guides, and expert advice.

## 🏗️ Data Structure

### **Product Data Organization**

The product catalog is organized into multiple data files for easy management:

```
src/data/
├── plants.js              # Plant catalog (10 products)
├── garden-products.js     # Tools and supplies (12 products)
├── all-products.js        # Unified product management
├── care-guides.js         # Care information and guides
└── categories.js          # Category definitions and filters
```

### **Product Object Structure**

Each product follows a standardized structure:

```javascript
{
  id: number,                    // Unique product identifier
  name: string,                  // Product name
  scientific?: string,           // Scientific name (plants only)
  category: string,              // Product category
  price: number,                 // Product price
  description: string,           // Detailed description
  images: string[],              // Array of image paths
  features: string[],            // Key features list
  care?: {                       // Care information (plants only)
    light: string,
    water: string,
    soil: string,
    fertilizer: string,
    pruning: string,
    mulching?: string,
    winterCare?: string
  },
  size?: {                       // Size information (plants only)
    height: string,
    width: string,
    growthRate: string
  },
  specifications?: {             // Technical specs (tools/supplies)
    material?: string,
    dimensions?: string,
    weight?: string,
    warranty?: string,
    includes?: string[]
  },
  availability: string,          // Stock status
  brand?: string,               // Brand name (tools/supplies)
  rating?: number,              // Product rating
  reviews?: number,             // Number of reviews
  season?: string,              // Seasonal availability
  hardinessZone?: string,       // Hardiness zone (plants)
  bloomTime?: string,           // Bloom time (plants)
  flowerColor?: string,         // Flower color (plants)
  foliageColor?: string,        // Foliage color (plants)
  fallColor?: string,           // Fall color (plants)
  specialFeatures?: string[]    // Special features
}
```

## 📊 Current Product Inventory

### **Plants Category (10 products)**

#### **1. Hydrangea Endless Summer**
- **Price**: $29.99
- **Category**: Shrubs
- **Features**: Long blooming, color-changing flowers, hardy
- **Care Level**: Moderate
- **Hardiness Zone**: 4-9

#### **2. Japanese Maple Bloodgood**
- **Price**: $89.99
- **Category**: Trees
- **Features**: Stunning red foliage, compact size, fall color
- **Care Level**: Moderate
- **Hardiness Zone**: 5-8

#### **3. Lavender Munstead**
- **Price**: $12.99
- **Category**: Herbs
- **Features**: Fragrant, drought-tolerant, attracts pollinators
- **Care Level**: Easy
- **Hardiness Zone**: 5-9

#### **4. Knock Out Rose**
- **Price**: $24.99
- **Category**: Shrubs
- **Features**: Disease-resistant, continuous blooming, low maintenance
- **Care Level**: Easy
- **Hardiness Zone**: 4-9

#### **5. Boxwood Green Mountain**
- **Price**: $39.99
- **Category**: Shrubs
- **Features**: Evergreen, formal appearance, deer resistant
- **Care Level**: Easy
- **Hardiness Zone**: 5-8

#### **6. Bougainvillea**
- **Price**: $34.99
- **Category**: Tropical
- **Features**: Vibrant colors, climbing habit, heat-loving
- **Care Level**: Moderate
- **Hardiness Zone**: 9-11

#### **7. Bearded Iris**
- **Price**: $15.99
- **Category**: Perennials
- **Features**: Spring blooming, various colors, drought-tolerant
- **Care Level**: Easy
- **Hardiness Zone**: 3-9

#### **8. Yellow Barrel Cactus**
- **Price**: $44.99
- **Category**: Succulents
- **Features**: Low maintenance, drought-tolerant, unique appearance
- **Care Level**: Easy
- **Hardiness Zone**: 9-11

#### **9. Mixed Nursery Plants**
- **Price**: $19.99
- **Category**: Mixed Plants
- **Features**: Variety pack, great for beginners, seasonal selection
- **Care Level**: Easy
- **Hardiness Zone**: Varies

#### **10. Greenhouse Specialty Plants**
- **Price**: $42.99
- **Category**: Mixed Plants
- **Features**: Rare varieties, expert care, premium quality
- **Care Level**: Moderate
- **Hardiness Zone**: Varies

### **Tools Category (6 products)**

#### **1. Premium Garden Tool Set**
- **Price**: $89.99
- **Brand**: GardenPro
- **Features**: 5-piece set, stainless steel, lifetime warranty
- **Includes**: Trowel, hand rake, cultivator, weeder, pruner, storage case

#### **2. Garden Kneeler and Seat**
- **Price**: $34.99
- **Brand**: ComfortGarden
- **Features**: Padded seat, tool pockets, lightweight design
- **Material**: Heavy-duty canvas, aluminum frame

#### **3. Garden Gloves Set**
- **Price**: $22.99
- **Brand**: GreenThumb
- **Features**: 3-pair set, different thicknesses, breathable
- **Material**: Leather and cotton blend

#### **4. Garden Cart/Wheelbarrow**
- **Price**: $129.99
- **Brand**: HeavyDuty
- **Features**: 4-cubic foot capacity, pneumatic tires, foldable
- **Material**: Powder-coated steel

#### **5. Garden Pruning Shears**
- **Price**: $28.99
- **Brand**: SharpCut
- **Features**: Bypass design, comfortable grip, safety lock
- **Material**: High-carbon steel

#### **6. Seed Starting Kit**
- **Price**: $29.99
- **Brand**: GrowRight
- **Features**: 72-cell tray, humidity dome, heat mat
- **Includes**: Trays, domes, labels, instructions

### **Supplies Category (6 products)**

#### **1. Organic Potting Soil Mix**
- **Price**: $24.99
- **Brand**: Nature's Best
- **Features**: 20-quart bag, enriched with compost, pH balanced
- **Ingredients**: Peat moss, perlite, compost, organic fertilizer

#### **2. Drip Irrigation System**
- **Price**: $45.99
- **Brand**: WaterWise
- **Features**: 50-foot kit, adjustable emitters, timer included
- **Includes**: Tubing, emitters, connectors, timer

#### **3. Plant Food Fertilizer**
- **Price**: $18.99
- **Brand**: GreenGrowth
- **Features**: 5-pound bag, balanced formula, slow-release
- **NPK Ratio**: 10-10-10

#### **4. Garden Hose with Nozzle**
- **Price**: $39.99
- **Brand**: FlexFlow
- **Features**: 50-foot length, kink-resistant, 8-pattern nozzle
- **Material**: Heavy-duty rubber

#### **5. Garden Trellis Set**
- **Price**: $49.99
- **Brand**: ClimbRight
- **Features**: 6-foot height, expandable, rust-resistant
- **Material**: Powder-coated steel

#### **6. Garden Mulch - Natural**
- **Price**: $15.99
- **Brand**: EarthCover
- **Features**: 2-cubic foot bag, natural color, weed suppression
- **Material**: Shredded hardwood bark

### **Seasonal Category (3 products)**

#### **1. Spring Bulb Collection**
- **Price**: $34.99
- **Features**: 50 bulbs, mixed varieties, spring blooming
- **Includes**: Tulips, daffodils, hyacinths, crocus

#### **2. Holiday Poinsettia**
- **Price**: $19.99
- **Features**: Red variety, festive pot, care instructions
- **Season**: November-December

#### **3. Summer Annual Collection**
- **Price**: $24.99
- **Features**: 12 plants, heat-tolerant varieties, instant color
- **Includes**: Marigolds, zinnias, petunias, impatiens

## 🔍 Filtering and Search System

### **Category Filters**
- **Plants**: Trees, Shrubs, Perennials, Annuals, Succulents, Tropical, Herbs, Mixed
- **Tools**: Garden tools, equipment, accessories
- **Supplies**: Soil, fertilizer, irrigation, materials
- **Seasonal**: Holiday plants, bulbs, seasonal collections

### **Care Requirement Filters**
- **Light**: Full Sun, Partial Sun, Shade
- **Water**: Low, Moderate, High
- **Size**: Small, Medium, Large

### **Price Range Filter**
- **Under $25**: 8 products (32%)
- **$25-$50**: 9 products (36%)
- **$50-$100**: 6 products (24%)
- **$100-$200**: 2 products (8%)

### **Search Functionality**
- **Product Names**: Exact and partial matching
- **Descriptions**: Keyword search
- **Scientific Names**: Plant identification
- **Features**: Tag-based search
- **Categories**: Category-based filtering

## 📝 Content Management Guidelines

### **Product Descriptions**

#### **Plant Descriptions Should Include:**
- **Appearance**: Size, color, form, texture
- **Growing Habits**: Growth rate, spread, height
- **Seasonal Interest**: Bloom time, fall color, winter interest
- **Landscape Uses**: Where to plant, companion plants
- **Benefits**: Wildlife attraction, environmental benefits

#### **Tool Descriptions Should Include:**
- **Functionality**: What it does, how to use it
- **Materials**: Construction quality, durability
- **Features**: Special features, ergonomics
- **Warranty**: Coverage and terms
- **Included Items**: What comes with the product

#### **Supply Descriptions Should Include:**
- **Composition**: Ingredients or materials
- **Coverage**: How much area it covers
- **Application**: How to use it properly
- **Benefits**: What it provides
- **Safety**: Any precautions or warnings

### **Image Guidelines**

#### **Image Requirements:**
- **Format**: JPEG or PNG
- **Size**: Minimum 800x600 pixels
- **Quality**: High resolution, clear focus
- **Quantity**: 3-5 images per product
- **Content**: Product in use, close-ups, different angles

#### **Image Organization:**
```
public/images/
├── plants/
│   ├── hydrangea-endless-summer/
│   │   ├── main.jpg
│   │   ├── closeup.jpg
│   │   ├── in-garden.jpg
│   │   └── flowers.jpg
│   └── japanese-maple-bloodgood/
├── products/
│   ├── tools/
│   │   └── garden-tool-set/
│   └── supplies/
│       └── potting-soil/
└── categories/
    ├── plants.jpg
    ├── tools.jpg
    └── supplies.jpg
```

### **Care Information Guidelines**

#### **Plant Care Should Include:**
- **Light Requirements**: Hours of sunlight needed
- **Watering**: Frequency and amount
- **Soil**: Type and pH requirements
- **Fertilizing**: Schedule and type
- **Pruning**: When and how to prune
- **Winter Care**: Cold protection needs
- **Pest Management**: Common issues and solutions

#### **Tool Care Should Include:**
- **Maintenance**: Cleaning and storage
- **Sharpening**: When and how to sharpen
- **Storage**: Proper storage conditions
- **Safety**: Usage precautions
- **Warranty**: Coverage details

## 🔄 Product Management Procedures

### **Adding New Products**

1. **Data Entry**
   ```javascript
   // Add to appropriate data file
   {
     id: 26, // Next available ID
     name: "New Product Name",
     category: "Plants", // or Tools, Supplies, Seasonal
     price: 29.99,
     description: "Detailed description...",
     images: ["/images/products/new-product-1.jpg"],
     features: ["Feature 1", "Feature 2"],
     // ... other properties
   }
   ```

2. **Image Preparation**
   - Optimize images for web
   - Create multiple sizes
   - Add to appropriate folder
   - Update image paths in data

3. **Content Review**
   - Verify accuracy of information
   - Check spelling and grammar
   - Ensure consistency with existing products
   - Test display in catalog

### **Updating Existing Products**

1. **Price Updates**
   - Update price in data file
   - Verify currency formatting
   - Check for any related promotions

2. **Inventory Updates**
   - Update availability status
   - Add/remove products as needed
   - Update stock quantities

3. **Content Updates**
   - Refresh descriptions
   - Add new images
   - Update care information
   - Modify features list

### **Seasonal Product Management**

1. **Spring Products** (February-April)
   - Bulbs and early spring plants
   - Garden tools and supplies
   - Seed starting materials

2. **Summer Products** (May-August)
   - Annual flowers and vegetables
   - Irrigation supplies
   - Garden maintenance tools

3. **Fall Products** (September-November)
   - Fall-blooming plants
   - Bulbs for spring
   - Garden cleanup supplies

4. **Winter Products** (December-January)
   - Holiday plants
   - Indoor gardening supplies
   - Planning and design tools

## 📊 Analytics and Reporting

### **Product Performance Metrics**
- **Views**: How many times products are viewed
- **Clicks**: Interaction with product cards
- **Conversions**: Add to cart actions
- **Search Terms**: What customers are searching for
- **Filter Usage**: Which filters are most popular

### **Inventory Reports**
- **Stock Levels**: Current inventory status
- **Sales Velocity**: How quickly products sell
- **Seasonal Trends**: Performance by season
- **Category Performance**: Which categories perform best

### **Customer Behavior**
- **Popular Products**: Most viewed items
- **Search Patterns**: Common search terms
- **Filter Preferences**: Most used filters
- **Page Performance**: Load times and errors

## 🛠️ Technical Implementation

### **Data Management Functions**

```javascript
// src/data/all-products.js
export const getProductsByCategory = (category) => {
  if (category === 'all') return allProducts;
  return allProducts.filter(product => product.category === category);
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    (product.scientific && product.scientific.toLowerCase().includes(searchTerm))
  );
};

export const getProductsByPriceRange = (minPrice, maxPrice) => {
  return allProducts.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );
};

export const getProductStats = () => {
  const totalProducts = allProducts.length;
  const categories = [...new Set(allProducts.map(p => p.category))];
  const priceRanges = {
    under25: allProducts.filter(p => p.price < 25).length,
    under50: allProducts.filter(p => p.price < 50).length,
    under100: allProducts.filter(p => p.price < 100).length,
    over100: allProducts.filter(p => p.price >= 100).length
  };
  
  return { totalProducts, categories, priceRanges };
};
```

### **Component Integration**

```typescript
// ProductCardEnhanced.tsx
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

// FilterPanel.tsx
interface FilterPanelProps {
  categories: Category[];
  priceRanges: PriceRange[];
  careCategories: CareCategories;
  onFilterChange: (filters: ProductFilters) => void;
}

// Catalog page
const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState(allProducts);
  const [filters, setFilters] = useState<ProductFilters>({});
  
  // Filter and display logic
};
```

## 📋 Maintenance Checklist

### **Weekly Tasks**
- [ ] Check product availability
- [ ] Review search analytics
- [ ] Monitor page performance
- [ ] Update seasonal content

### **Monthly Tasks**
- [ ] Review and update pricing
- [ ] Add new product images
- [ ] Update care guides
- [ ] Analyze customer feedback

### **Quarterly Tasks**
- [ ] Complete inventory review
- [ ] Update product descriptions
- [ ] Refresh category organization
- [ ] Performance optimization

### **Annual Tasks**
- [ ] Major content refresh
- [ ] Technology updates
- [ ] User experience improvements
- [ ] Strategic planning

---

**Document Version**: 2.0  
**Last Updated**: August 30, 2025  
**Next Review**: September 30, 2025
