// Product categories for filtering
export const productCategories = [
  { key: 'all', label: 'All Products', icon: '🌱' },
  { key: 'Trees', label: 'Trees', icon: '🌳' },
  { key: 'Shrubs', label: 'Shrubs', icon: '🌿' },
  { key: 'Perennials', label: 'Perennials', icon: '🌸' },
  { key: 'Annuals', label: 'Annuals', icon: '🌺' },
  { key: 'Succulents', label: 'Succulents', icon: '🌵' },
  { key: 'Tropical', label: 'Tropical', icon: '🌴' },
  { key: 'Fruit', label: 'Fruit Trees', icon: '🍎' },
  { key: 'Tools', label: 'Tools', icon: '🛠️' },
  { key: 'Supplies', label: 'Supplies', icon: '🧺' }
];

export const priceRanges = [
  { min: 0, max: 25, label: 'Under $25' },
  { min: 25, max: 50, label: '$25 - $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 200, label: '$100 - $200' },
  { min: 200, max: Infinity, label: 'Over $200' }
];
