class ProductCard {
  constructor(product) {
    this.product = product;
    this.card = document.createElement('div');
    this.showAnimation = false;
  }

  createImage() {
    const imageDiv = document.createElement('div');
    imageDiv.className = 'product-image relative overflow-hidden rounded-lg shadow-lg';
    
    // Use product card image if available, otherwise use regular image
    const imageSrc = this.product.product_card?.card_image || this.product.image || this.product.images?.[0];
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = this.product.name;
    img.className = 'w-full h-auto transition-transform duration-300 group-hover:scale-105';
    imageDiv.appendChild(img);
    
    // Add spin animation if available and enabled
    if (this.showAnimation && this.product.product_card?.spin_animation) {
      const animationDiv = document.createElement('div');
      animationDiv.className = 'absolute inset-0 flex items-center justify-center';
      
      const animationImg = document.createElement('img');
      animationImg.src = this.product.product_card.spin_animation;
      animationImg.alt = `${this.product.name} animation`;
      animationImg.className = 'opacity-80 w-48 h-48';
      
      animationDiv.appendChild(animationImg);
      imageDiv.appendChild(animationDiv);
    }
    
    return imageDiv;
  }

  createInfo() {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'product-info absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4';
    
    const title = document.createElement('h3');
    title.className = 'product-title text-white font-semibold text-lg';
    title.textContent = this.product.name;
    
    const price = document.createElement('p');
    price.className = 'product-price text-white/90 text-sm';
    price.textContent = `$${this.product.price.toFixed(2)}`;
    
    const button = document.createElement('button');
    button.className = 'primary-button mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors';
    button.textContent = 'Add to Cart';
    button.addEventListener('click', () => this.addToCart());
    
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    infoDiv.appendChild(button);
    
    return infoDiv;
  }

  addToCart() {
    // Implement cart functionality
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(this.product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
    
    // Show notification
    this.showNotification('Added to cart!');
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Method to toggle animation
  toggleAnimation() {
    this.showAnimation = !this.showAnimation;
    this.render();
  }

  // Method to switch to rounded card variant
  useRoundedCard() {
    if (this.product.product_card?.rounded_card) {
      const img = this.card.querySelector('img');
      if (img) {
        img.src = this.product.product_card.rounded_card;
      }
    }
  }

  render() {
    this.card.className = 'product-card relative group cursor-pointer';
    this.card.innerHTML = ''; // Clear existing content
    
    const imageContainer = this.createImage();
    const infoContainer = this.createInfo();
    
    imageContainer.appendChild(infoContainer);
    this.card.appendChild(imageContainer);
    
    // Add hover effects
    const hoverOverlay = document.createElement('div');
    hoverOverlay.className = 'absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg';
    this.card.appendChild(hoverOverlay);
    
    return this.card;
  }
}

export default ProductCard; 