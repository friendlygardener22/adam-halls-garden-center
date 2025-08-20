class Header {
  constructor() {
    this.header = document.createElement('header');
    this.nav = document.createElement('nav');
    this.logo = document.createElement('div');
    this.menu = document.createElement('ul');
    this.cart = document.createElement('li');
  }

  createLogo() {
    this.logo.className = 'logo';
    this.logo.innerHTML = `
      <i class="fas fa-leaf"></i>
      Adam Halls Garden Center
    `;
    return this.logo;
  }

  createMenu() {
    const menuItems = [
      { text: 'Home', href: 'index.html' },
      { text: 'Plants', href: 'plants.html' },
      { text: 'Garden Center', href: 'garden.html' },
      { text: 'Services', href: 'services.html' },
      { text: 'About Us', href: 'about.html' },
      { text: 'Contact', href: 'contact.html' }
    ];

    menuItems.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.text;
      li.appendChild(a);
      this.menu.appendChild(li);
    });

    return this.menu;
  }

  createCart() {
    this.cart.innerHTML = `
      <a href="cart.html" class="cart-link">
        <i class="fas fa-shopping-cart"></i>
        <span id="cart-count">0</span>
      </a>
    `;
    return this.cart;
  }

  render() {
    this.nav.appendChild(this.createLogo());
    this.menu.appendChild(this.createCart());
    this.nav.appendChild(this.menu);
    this.header.appendChild(this.nav);
    return this.header;
  }
}

export default Header; 