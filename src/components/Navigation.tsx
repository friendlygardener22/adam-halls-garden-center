'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const shopCategories = [
  { name: 'All Products', href: '/shop' },
  { name: 'Plants', href: '/shop/plants' },
  { name: 'Tools', href: '/shop/tools' },
  { name: 'Supplies', href: '/shop/supplies' },
];

const mainLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop', dropdown: true },
  { name: 'Garden Center', href: '/garden' },
  { name: 'Plant Care Guide', href: '/plant-care-guide' },
  { name: 'Service Areas', href: '/service-areas' },
  { name: 'Garden Advice', href: '/garden-advice' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Cart', href: '/cart' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-green-200 rounded-b-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center">
          {/* Logo and name left */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo.jpg"
                alt="Adam Halls Garden Center"
                width={50}
                height={50}
                className="h-12 w-auto rounded-full border-2 border-green-200 shadow group-hover:scale-105 transition-transform duration-200"
              />
              <span className="ml-3 text-2xl font-extrabold text-green-900 tracking-tight" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>Adam Hall&apos;s Garden Center</span>
            </Link>
          </div>
          {/* Centered nav links */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex space-x-4 lg:space-x-6">
              {mainLinks.map(link => {
                if (link.dropdown) {
                  return (
                    <div key={link.name} className="relative group">
                      <button
                        className="nav-link flex items-center gap-1 focus:outline-none px-3 py-2 rounded-lg font-semibold text-green-900 hover:bg-green-100 hover:text-green-700 transition-all duration-150 group-hover:scale-105 text-sm"
                        aria-haspopup="true"
                        aria-expanded={isShopOpen}
                        aria-controls="shop-dropdown"
                        onClick={() => setIsShopOpen((v) => !v)}
                        tabIndex={0}
                      >
                        {link.name}
                        <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {isShopOpen && (
                        <div id="shop-dropdown" className="absolute left-0 mt-2 w-44 bg-white border border-green-200 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
                          {shopCategories.map((cat) => (
                            <Link key={cat.href} href={cat.href} className="block px-4 py-2 text-green-900 hover:bg-green-50 hover:text-green-700 transition-colors rounded-lg" onClick={() => setIsShopOpen(false)}>{cat.name}</Link>
                          ))}
            </div>
                      )}
          </div>
                  );
                }
                if (link.name === 'Cart') {
                  return (
                    <Link key={link.name} href={link.href} className="nav-link flex items-center px-3 py-2 rounded-lg font-semibold text-green-900 hover:bg-green-100 hover:text-green-700 transition-all duration-150 group-hover:scale-105 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="sr-only">Cart</span>
            </Link>
                  );
                }
                return <Link key={link.name} href={link.href} className="nav-link px-3 py-2 rounded-lg font-semibold text-green-900 hover:bg-green-100 hover:text-green-700 transition-all duration-150 group-hover:scale-105 focus:bg-green-200 focus:text-green-900 focus:outline-none text-sm">{link.name}</Link>;
              })}
          </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 border-t border-green-200 shadow-2xl animate-fade-in rounded-b-2xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {mainLinks.map(link => {
              if (link.dropdown) {
                return (
                  <div key={link.name} className="relative">
                    <button
                      className="block nav-link w-full text-left flex items-center gap-1 focus:outline-none px-4 py-2 rounded-lg font-semibold text-green-900 hover:bg-green-100 hover:text-green-700 transition-all duration-150"
                      aria-haspopup="true"
                      aria-expanded={isShopOpen}
                      aria-controls="mobile-shop-dropdown"
                      onClick={() => setIsShopOpen((v) => !v)}
                      tabIndex={0}
                    >
                      {link.name}
                      <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {isShopOpen && (
                      <div id="mobile-shop-dropdown" className="ml-4 mt-2 bg-green-50 border border-green-200 rounded-lg py-2">
                        {shopCategories.map((cat) => (
                          <Link key={cat.href} href={cat.href} className="block px-4 py-2 text-green-900 hover:bg-green-100 hover:text-green-700 transition-colors" onClick={() => setIsShopOpen(false)}>{cat.name}</Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (link.name === 'Cart') {
                return (
                  <Link key={link.name} href={link.href} className="block nav-link px-4 py-2 rounded-lg font-semibold text-green-900 hover:bg-green-100 hover:text-green-700 transition-all duration-150">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Cart
                    </div>
                  </Link>
                );
              }
              return <Link key={link.name} href={link.href} className="block nav-link px-4 py-2 rounded-lg font-semibold text-green-900 hover:bg-green-100 hover:text-green-700 transition-all duration-150" onClick={() => setIsMenuOpen(false)}>{link.name}</Link>;
            })}
          </div>
        </div>
      )}
    </nav>
  )
} 