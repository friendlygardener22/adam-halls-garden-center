import { searchService } from '../services/searchService.js';
import { createPlantCard } from '../js/catalog.js';

class Search {
  constructor() {
    this.searchInput = document.getElementById('searchInput');
    this.searchResults = document.getElementById('searchResults');
    this.catalogGrid = document.getElementById('catalogGrid');
    this.resultCount = document.getElementById('resultCount');
    
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Handle search input
    this.searchInput?.addEventListener('input', this.debounce((e) => {
      this.handleSearch(e.target.value);
    }, 300));

    // Handle search suggestions
    this.searchInput?.addEventListener('focus', () => {
      if (this.searchInput.value.length >= 2) {
        this.showSuggestions(this.searchInput.value);
      }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.searchInput?.contains(e.target) && !this.searchResults?.contains(e.target)) {
        this.hideSuggestions();
      }
    });
  }

  // Debounce function to limit search frequency
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Handle search
  async handleSearch(query) {
    if (!query || query.length < 2) {
      this.hideSuggestions();
      this.showAllPlants();
      return;
    }

    const results = searchService.search(query);
    this.displayResults(results);
    this.showSuggestions(query);
  }

  // Display search results
  displayResults(results) {
    if (!this.catalogGrid) return;

    this.catalogGrid.innerHTML = '';
    
    if (results.length === 0) {
      this.catalogGrid.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <p>No plants found matching your search</p>
        </div>
      `;
    } else {
      results.forEach(plant => {
        const card = createPlantCard(plant);
        this.catalogGrid.appendChild(card);
      });
    }

    // Update result count
    if (this.resultCount) {
      this.resultCount.textContent = results.length;
    }
  }

  // Show search suggestions
  showSuggestions(query) {
    if (!this.searchResults) return;

    const suggestions = searchService.getSuggestions(query);
    
    if (suggestions.length === 0) {
      this.hideSuggestions();
      return;
    }

    this.searchResults.innerHTML = suggestions
      .map(suggestion => `
        <div class="suggestion-item" data-suggestion="${suggestion}">
          <i class="fas fa-search"></i>
          <span>${suggestion}</span>
        </div>
      `)
      .join('');

    this.searchResults.classList.add('active');

    // Add click handlers for suggestions
    this.searchResults.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        this.searchInput.value = item.dataset.suggestion;
        this.handleSearch(item.dataset.suggestion);
        this.hideSuggestions();
      });
    });
  }

  // Hide search suggestions
  hideSuggestions() {
    if (this.searchResults) {
      this.searchResults.classList.remove('active');
      this.searchResults.innerHTML = '';
    }
  }

  // Show all plants
  showAllPlants() {
    if (!this.catalogGrid) return;
    
    // Trigger the filter function to show all plants
    const filterEvent = new Event('click');
    document.getElementById('resetFilters')?.dispatchEvent(filterEvent);
  }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Search();
}); 