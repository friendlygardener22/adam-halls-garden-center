// Product categories for filtering
export const productCategories = [
  { key: 'all', label: 'All Products', icon: '🌱' },
  { key: 'Trees', label: 'Trees', icon: '🌳' },
  { key: 'Shrubs', label: 'Shrubs', icon: '🌿' },
  { key: 'Perennials', label: 'Perennials', icon: '🌸' },
  { key: 'Annuals', label: 'Annuals', icon: '🌺' },
  { key: 'Succulents', label: 'Succulents', icon: '🌵' },
  { key: 'Tropical', label: 'Tropical', icon: '🌴' },
  { key: 'Herbs', label: 'Herbs', icon: '🌿' },
  { key: 'Fruit', label: 'Fruit Trees', icon: '🍎' },
  { key: 'Mixed', label: 'Mixed Plants', icon: '🌱' },
  { key: 'Tools', label: 'Garden Tools', icon: '🛠️' },
  { key: 'Supplies', label: 'Garden Supplies', icon: '🧺' },
  { key: 'Seasonal', label: 'Seasonal Items', icon: '🎄' }
];

export const priceRanges = [
  { min: 0, max: 25, label: 'Under $25' },
  { min: 25, max: 50, label: '$25 - $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 200, label: '$100 - $200' },
  { min: 200, max: Infinity, label: 'Over $200' }
];

// Plant care categories for advanced filtering
export const careCategories = {
  light: [
    { key: 'full-sun', label: 'Full Sun (6+ hours)', icon: '☀️' },
    { key: 'partial-sun', label: 'Partial Sun (4-6 hours)', icon: '🌤️' },
    { key: 'shade', label: 'Shade (< 4 hours)', icon: '🌥️' }
  ],
  water: [
    { key: 'low', label: 'Low Water', icon: '💧' },
    { key: 'moderate', label: 'Moderate Water', icon: '💧💧' },
    { key: 'high', label: 'High Water', icon: '💧💧💧' }
  ],
  size: [
    { key: 'small', label: 'Small (< 2 ft)', icon: '📏' },
    { key: 'medium', label: 'Medium (2-6 ft)', icon: '📏📏' },
    { key: 'large', label: 'Large (> 6 ft)', icon: '📏📏📏' }
  ]
};

// Seasonal availability
export const seasonalAvailability = [
  { key: 'spring', label: 'Spring', icon: '🌸' },
  { key: 'summer', label: 'Summer', icon: '☀️' },
  { key: 'fall', label: 'Fall', icon: '🍂' },
  { key: 'winter', label: 'Winter', icon: '❄️' },
  { key: 'year-round', label: 'Year Round', icon: '🔄' }
];
