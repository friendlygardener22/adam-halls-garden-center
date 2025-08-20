'use client'

import Link from 'next/link'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-green-900 text-white py-10 mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-bold mb-2">Adam Hall's Garden Center</h3>
          <p className="text-green-200 mb-2">Grow Beautifully™</p>
          <div className="flex flex-col gap-2 text-green-100 text-sm mb-2">
            <span className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-green-300" />
              28095 Alessandro Blvd, Moreno Valley, CA
            </span>
            <a href="tel:951-674-9422" className="flex items-center gap-2 hover:text-green-300 transition">
              <PhoneIcon className="h-5 w-5 text-green-300" />
              (951) 674-9422
            </a>
            <a href="mailto:Adam@adamhallsnursery.com" className="flex items-center gap-2 hover:text-green-300 transition">
              <EnvelopeIcon className="h-5 w-5 text-green-300" />
              Adam@adamhallsnursery.com
            </a>
          </div>
          <p className="text-green-300 text-sm">&copy; {currentYear} Adam Hall's Garden Center. All rights reserved.</p>
        </div>
        <nav className="flex flex-col md:flex-row gap-4 md:gap-8 text-green-100 text-sm">
          <Link href="/about" className="hover:text-green-300">About</Link>
          <Link href="/shop" className="hover:text-green-300">Shop</Link>
          <Link href="/garden-advice" className="hover:text-green-300">Garden Advice</Link>
          <Link href="/contact" className="hover:text-green-300">Contact</Link>
          <Link href="/sustainability" className="hover:text-green-300">Sustainability</Link>
        </nav>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a 
            href="https://www.instagram.com/adamhallsgardencenter" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram" 
            className="hover:text-green-300"
          >
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a 
            href="https://www.facebook.com/adamhallsgardencenter" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Facebook" 
            className="hover:text-green-300"
          >
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a 
            href="https://twitter.com/adamhallsgarden" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Twitter" 
            className="hover:text-green-300"
          >
            <i className="fab fa-twitter fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  )
} 