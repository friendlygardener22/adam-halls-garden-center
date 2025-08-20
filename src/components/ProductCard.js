class ProductCard {
  constructor(product) {
    this.product = product;
    this.card = document.createElement('div');
  }

  createImage() {
    const imageDiv = document.createElement('div');
    imageDiv.className = 'product-image';
    const img = document.createElement('img');
    img.src = this.product.image;
    img.alt = this.product.name;
    imageDiv.appendChild(img);
    return imageDiv;
  }

  createInfo() {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'product-info';
    
    const title = document.createElement('h3');
    title.className = 'product-title';
    title.textContent = this.product.name;
    
    const price = document.createElement('p');
    price.className = 'product-price';
    price.textContent = `$${this.product.price.toFixed(2)}`;
    
    const button = document.createElement('button');
    button.className = 'primary-button';
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
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  render() {
    this.card.className = 'product-card';
    this.card.appendChild(this.createImage());
    this.card.appendChild(this.createInfo());
    return this.card;
  }
}

export default ProductCard; 