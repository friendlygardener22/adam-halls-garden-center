'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Bars3Icon, 
  XMarkIcon, 
  HomeIcon, 
  ShoppingBagIcon, 
  BookOpenIcon, 
  MapPinIcon, 
  UserIcon,
  ShoppingCartIcon,
  HeartIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const mobileNavItems = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Shop', href: '/shop', icon: ShoppingBagIcon },
  { name: 'Garden Center', href: '/garden', icon: BookOpenIcon },
  { name: 'Plant Care', href: '/plant-care-guide', icon: BookOpenIcon },
  { name: 'Service Areas', href: '/service-areas', icon: MapPinIcon },
  { name: 'About', href: '/about', icon: UserIcon },
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg text-green-900 hover:bg-green-100 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/logo.jpg"
                  alt="Adam Halls Garden Center"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-green-200"
                />
                <span className="text-lg font-bold text-green-900">
                  Adam Hall's
                </span>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Close mobile menu"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="p-4">
              <ul className="space-y-2">
                {mobileNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Quick Actions */}
            <div className="p-4 border-t border-gray-200">
              <div className="space-y-3">
                <Link
                  href="/cart"
                  onClick={toggleMenu}
                  className="flex items-center justify-center space-x-2 w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  <span>View Cart</span>
                </Link>
                
                <Link
                  href="/search"
                  onClick={toggleMenu}
                  className="flex items-center justify-center space-x-2 w-full bg-white text-green-700 py-3 px-4 rounded-lg font-medium border-2 border-green-600 hover:bg-green-50 transition-colors"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <span>Search Plants</span>
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900 mb-2">Contact Us</p>
                <p>📞 (951) 674-9422</p>
                <p>📍 28095 Alessandro Blvd</p>
                <p>Moreno Valley, CA 92555</p>
                <p className="mt-2">🕒 Daily 8am-6pm</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
