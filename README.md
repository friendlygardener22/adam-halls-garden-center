# Adam Halls Garden Center - Enhanced Website

## 🌿 Overview

Adam Halls Garden Center is a comprehensive e-commerce website for a local garden center, featuring an extensive product catalog, detailed plant care guides, and advanced shopping features. The website showcases plants, garden tools, supplies, and seasonal items with rich product information and expert care advice.

## 🚀 Key Features

### **Enhanced Product Catalog**
- **25+ products** across multiple categories
- **Comprehensive plant information** with care instructions
- **Garden tools and supplies** with detailed specifications
- **Seasonal collections** for year-round offerings
- **Multiple product images** with thumbnail navigation

### **Advanced Product Categories**
- **Plants**: Trees, Shrubs, Perennials, Annuals, Succulents, Tropical, Herbs, Mixed
- **Tools**: Garden tools, equipment, and accessories
- **Supplies**: Soil, fertilizer, irrigation, and garden materials
- **Seasonal**: Holiday plants, bulbs, and seasonal collections

### **Smart Filtering & Search**
- **Category-based filtering** with visual icons
- **Price range slider** with real-time updates
- **Care requirement filtering** (light, water, size)
- **Advanced search** across product names, descriptions, and features
- **Sorting options** (price, name, featured, ratings)

### **Comprehensive Care Information**
- **Plant-specific care guides** for popular varieties
- **Seasonal maintenance schedules**
- **Problem-solving guides** for pests and diseases
- **Quick reference charts** for watering and fertilizing
- **Hardiness zone information** for climate compatibility

### **User Experience Features**
- **Responsive design** for all devices
- **Product detail pages** with tabbed information
- **Image galleries** with thumbnail navigation
- **Shopping cart functionality**
- **Wishlist features**
- **Product reviews and ratings**

## 📊 Product Statistics

### **Current Inventory**
- **25 total products** across all categories
- **10 enhanced plants** with detailed care information
- **12 garden tools and supplies** with specifications
- **3 seasonal collections** for year-round sales

### **Category Distribution**
- **Plants**: 40% (10 products)
- **Tools**: 24% (6 products)
- **Supplies**: 24% (6 products)
- **Seasonal**: 12% (3 products)

### **Price Range Coverage**
- **Under $25**: 32% (8 products)
- **$25-$50**: 36% (9 products)
- **$50-$100**: 24% (6 products)
- **$100-$200**: 8% (2 products)

## 🛠️ Technical Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State management

### **Data Management**
- **Local JSON data** - Product information and care guides
- **Helper functions** - Filtering, search, and statistics
- **Modular structure** - Easy maintenance and updates

### **Components**
- **ProductCardEnhanced** - Rich product display
- **ProductDetailEnhanced** - Comprehensive product pages
- **FilterPanel** - Advanced filtering system
- **Search** - Real-time search functionality
- **Pagination** - Large catalog navigation

## 📁 Project Structure

```
adam-halls-garden-center/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── shop/
│   │   │   └── catalog/        # Product catalog page
│   │   ├── garden/             # Garden advice section
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── ProductCardEnhanced.tsx
│   │   ├── ProductDetailEnhanced.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── Search.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── data/                   # Product and care data
│   │   ├── plants.js           # Plant catalog
│   │   ├── garden-products.js  # Tools and supplies
│   │   ├── all-products.js     # Unified product management
│   │   ├── care-guides.js      # Care information
│   │   └── categories.js       # Category definitions
│   ├── utils/                  # Utility functions
│   │   ├── formatPrice.ts
│   │   └── validateEmail.ts
│   └── types/                  # TypeScript definitions
│       ├── product.ts
│       └── cart.ts
├── public/
│   └── images/
│       ├── plants/             # Plant images
│       ├── products/           # Product images
│       └── logo.jpg            # Brand assets
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone [repository-url]
cd adam-halls-garden-center

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Development**
```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

## 🌐 Available Pages

### **Main Pages**
- **Home** (`/`) - Landing page with featured products
- **Shop** (`/shop`) - Main shopping area
- **Catalog** (`/shop/catalog`) - Complete product catalog with filters
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact information and form

### **Product Pages**
- **Product Details** (`/shop/product/[id]`) - Individual product pages
- **Category Pages** (`/shop/[category]`) - Category-specific product listings

### **Garden Resources**
- **Garden Advice** (`/garden-advice`) - Care guides and tips
- **Plant Care** (`/plant-care`) - Plant-specific care information

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎨 Design System

### **Color Palette**
- **Primary Green**: #16a34a (Garden theme)
- **Secondary Green**: #22c55e (Accents)
- **Neutral Gray**: #6b7280 (Text and borders)
- **Background**: #f9fafb (Light background)

### **Typography**
- **Headings**: Inter font family
- **Body Text**: System font stack
- **Product Names**: Semibold weight
- **Descriptions**: Regular weight

## 🔧 Configuration

### **Environment Variables**
Create a `.env.local` file:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Adam Halls Garden Center
```

### **Tailwind Configuration**
The project uses Tailwind CSS with custom configurations for:
- Color palette
- Typography scales
- Spacing system
- Component styles

## 📈 Performance

### **Optimizations**
- **Image optimization** with Next.js Image component
- **Code splitting** for better loading performance
- **Static generation** for product pages
- **Lazy loading** for images and components

### **SEO Features**
- **Meta tags** for all pages
- **Structured data** for products
- **Sitemap generation**
- **Robots.txt** configuration

## 🧪 Testing

### **Test Coverage**
- **Component testing** with React Testing Library
- **Integration testing** for user flows
- **Accessibility testing** with axe-core

### **Running Tests**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 📝 Content Management

### **Adding Products**
1. Add product data to appropriate files in `src/data/`
2. Add product images to `public/images/`
3. Update category definitions if needed
4. Test product display and filtering

### **Updating Care Guides**
1. Edit care information in `src/data/care-guides.js`
2. Add new plant-specific guides as needed
3. Update seasonal maintenance schedules

### **Managing Images**
- **Plant images**: `public/images/plants/`
- **Product images**: `public/images/products/`
- **Brand assets**: `public/images/`

## 🚀 Deployment

### **Production Build**
```bash
# Build the application
npm run build

# Start production server
npm start
```

### **Deployment Options**
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Traditional hosting**

## 🤝 Contributing

### **Development Workflow**
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request
5. Code review
6. Merge to main

### **Code Standards**
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for formatting
- **Conventional commits** for commit messages

## 📞 Support

For questions or support:
- **Email**: [contact@adamhallsgardencenter.com]
- **Phone**: [phone number]
- **Address**: [physical address]

## 📄 License

This project is proprietary software for Adam Halls Garden Center.

---

**Built with ❤️ for Adam Halls Garden Center** 