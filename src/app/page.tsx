'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <main>
      <section className="page-tabs">
        <div className="tabs-container">
          <Link href="/" className="tab-btn active">
            <i className="fas fa-home"></i> Home
          </Link>
          <Link href="/shop" className="tab-btn">
            <i className="fas fa-leaf"></i> Plants
          </Link>
          <Link href="/garden" className="tab-btn">
            <i className="fas fa-seedling"></i> Garden Center
          </Link>
          <Link href="/services" className="tab-btn">
            <i className="fas fa-tools"></i> Services
          </Link>
          <Link href="/about" className="tab-btn">
            <i className="fas fa-info-circle"></i> About Us
          </Link>
          <Link href="/contact" className="tab-btn">
            <i className="fas fa-envelope"></i> Contact
          </Link>
          <div className="cart-icon">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
      </section>

      <section className="hero">
        <div className="hero-image">
          <Image 
            src="/images/logo.jpg" 
            alt="Beautiful Garden Center Entrance"
            width={1920}
            height={1080}
            priority
          />
          <div className="hero-content">
            <h1>Welcome to Adam Halls Garden Center</h1>
            <p>Your local garden center since 1995</p>
            <Link href="/shop" className="primary-button">Shop Now</Link>
          </div>
        </div>
      </section>

      <section className="our-story">
        <div className="container">
          <h2>Our Story</h2>
          <div className="story-content">
            <div className="video-container">
              <iframe 
                src="https://www.youtube.com/embed/bS3sFfIerTA" 
                title="Business Spotlight: Adam Hall's Plant Nursery"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
            <div className="story-text">
              <h3>Adam Hall's Garden Center</h3>
              <p>Welcome to Adam Hall's Garden Center, your premier destination for quality plants and expert gardening advice in Moreno Valley. Since 1995, we've been serving our community with passion and dedication, offering a wide selection of plants, trees, and gardening supplies.</p>
              <p>Our knowledgeable staff is always ready to help you create the garden of your dreams, whether you're a seasoned gardener or just starting out. Visit us at our beautiful location and discover why we're the trusted choice for gardeners throughout the Inland Empire.</p>
              <Link href="/about" className="secondary-button">Learn More About Us</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="seasonal-highlights">
        <div className="container">
          <h2>Seasonal Highlights</h2>
          <div className="seasonal-grid">
            <div className="seasonal-card">
              <Image 
                src="/images/plants/Bearded iris.jpeg" 
                alt="Spring Blooms"
                width={400}
                height={300}
              />
              <div className="seasonal-content">
                <h3>Spring Blooms</h3>
                <p>Discover our selection of spring-flowering plants and bulbs</p>
                <Link href="/shop?season=spring" className="secondary-button">Shop Spring</Link>
              </div>
            </div>
            <div className="seasonal-card">
              <Image 
                src="/images/plants/bouganvillia.jpeg" 
                alt="Summer Garden"
                width={400}
                height={300}
              />
              <div className="seasonal-content">
                <h3>Summer Garden</h3>
                <p>Perfect plants for your summer landscape</p>
                <Link href="/shop?season=summer" className="secondary-button">Shop Summer</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="plant-care">
        <div className="container">
          <h2>Plant Care Tips</h2>
          <div className="care-grid">
            <div className="care-card">
              <i className="fas fa-sun"></i>
              <h3>Light Requirements</h3>
              <p>Learn about different light conditions and which plants thrive in each</p>
              <Link href="/care#light" className="text-link">Read More</Link>
            </div>
            <div className="care-card">
              <i className="fas fa-tint"></i>
              <h3>Watering Guide</h3>
              <p>Proper watering techniques for healthy plants</p>
              <Link href="/care#water" className="text-link">Read More</Link>
            </div>
            <div className="care-card">
              <i className="fas fa-thermometer-half"></i>
              <h3>Temperature Zones</h3>
              <p>Understanding your growing zone and plant hardiness</p>
              <Link href="/care#zones" className="text-link">Read More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="growing-guide">
        <div className="container">
          <div className="guide-content">
            <h2>Find Your Growing Zone</h2>
            <p>Enter your zip code to discover plants perfect for your area</p>
            <form className="zone-finder">
              <input type="text" placeholder="Enter ZIP Code" pattern="[0-9]{5}" maxLength={5} required />
              <button type="submit" className="primary-button">Find Plants</button>
            </form>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-content">
            <h2>Why Choose Us?</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <Image 
                  src="/images/plants/Bearded iris.jpeg" 
                  alt="Quality Plants" 
                  className="feature-image"
                  width={300}
                  height={200}
                />
                <h3>Quality Plants</h3>
                <p>Carefully selected plants for your garden</p>
              </div>
              <div className="feature-card">
                <Image 
                  src="/images/plants/bouganvillia.jpeg" 
                  alt="Local Delivery" 
                  className="feature-image"
                  width={300}
                  height={200}
                />
                <h3>Local Delivery</h3>
                <p>Fast delivery to your doorstep</p>
              </div>
              <div className="feature-card">
                <Image 
                  src="/images/plants/Yellow barrel cactus.jpeg" 
                  alt="Expert Advice" 
                  className="feature-image"
                  width={300}
                  height={200}
                />
                <h3>Expert Advice</h3>
                <p>Professional gardening guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <Image 
              src="/images/plants/Bearded iris.jpeg" 
              alt="Plants"
              width={400}
              height={300}
            />
            <h3>Plants</h3>
            <p>Browse our wide selection of plants</p>
            <Link href="/shop" className="secondary-button">Browse Plants</Link>
          </div>
          <div className="category-card">
            <Image 
              src="/images/plants/bouganvillia.jpeg" 
              alt="Garden Center"
              width={400}
              height={300}
            />
            <h3>Garden Center</h3>
            <p>Everything you need for your garden</p>
            <Link href="/garden" className="secondary-button">Visit Garden Center</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

const categories = [
  {
    id: 1,
    name: 'Plants',
    slug: 'plants',
    description: 'Browse our selection of indoor and outdoor plants',
    image: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?q=80&w=2071',
  },
  {
    id: 2,
    name: 'Tools',
    slug: 'tools',
    description: 'Quality gardening tools for every task',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2072',
  },
  {
    id: 3,
    name: 'Supplies',
    slug: 'supplies',
    description: 'Everything you need for your garden',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2070',
  },
]

const features = [
  {
    id: 1,
    title: 'Expert Advice',
    description: 'Get personalized gardening advice from our experienced staff',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Quality Products',
    description: 'We carefully select the best plants and products for our customers',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Local Business',
    description: 'Supporting our community with locally grown plants and supplies',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
  },
] 