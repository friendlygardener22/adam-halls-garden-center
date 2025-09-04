import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/components/AuthContext'
import { WishlistProvider } from '@/components/WishlistContext'
import { SpeedInsights } from '@vercel/speed-insights/next'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import OfflineIndicator from '@/components/OfflineIndicator'
import MobileFeatures from '@/components/MobileFeatures'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Adam Hall's Garden Center - Plants & Garden Supplies | Moreno Valley, CA",
  description: "Visit Adam Hall's Garden Center in Moreno Valley for quality plants, garden supplies, and expert advice. Serving Riverside County, Orange County, and Los Angeles area. Open daily 8am-6pm. Best garden center in Moreno Valley, CA.",
  keywords: "garden center, plant nursery, Moreno Valley, Riverside County, Orange County, Los Angeles, plants, garden supplies, landscaping, succulents, trees, shrubs, garden center near me, plants Moreno Valley, nursery Riverside County, garden supplies Inland Empire, best garden center Moreno Valley, plant care advice, landscaping Moreno Valley, garden tools, soil, fertilizers, plant delivery Moreno Valley",
  authors: [{ name: "Adam Hall's Garden Center" }],
  creator: "Adam Hall's Garden Center",
  publisher: "Adam Hall's Garden Center",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://adamhallsgardencenter.com'),
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  themeColor: '#4CAF50',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Adam Hall's Garden Center",
  },
  applicationName: "Adam Hall's Garden Center",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-167x167.png', sizes: '167x167', type: 'image/png' },
      { url: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Adam Hall's Garden Center - Plants & Garden Supplies | Moreno Valley, CA",
    description: "Visit Adam Hall's Garden Center in Moreno Valley for quality plants, garden supplies, and expert advice. Serving Riverside County, Orange County, and Los Angeles area. Open daily 8am-6pm.",
    url: 'https://adamhallsgardencenter.com',
    siteName: "Adam Hall's Garden Center",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Adam Hall's Garden Center - Moreno Valley Plant Nursery",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Adam Hall's Garden Center - Plants & Garden Supplies | Moreno Valley, CA",
    description: "Visit Adam Hall's Garden Center in Moreno Valley for quality plants, garden supplies, and expert advice.",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'Garden Center',
  classification: 'Plant Nursery',
  other: {
    'geo.region': 'US-CA',
    'geo.placename': 'Moreno Valley',
    'geo.position': '33.912345;-117.234567',
    'ICBM': '33.912345, -117.234567',
    'DC.title': "Adam Hall's Garden Center",
    'DC.creator': 'Adam Hall',
    'DC.subject': 'Garden Center, Plant Nursery, Plants, Garden Supplies',
    'DC.description': 'Family-owned garden center in Moreno Valley, CA serving Riverside County, Orange County, and Los Angeles area.',
    'DC.publisher': "Adam Hall's Garden Center",
    'DC.contributor': 'Adam Hall, Taylor Hall, Devon Dourseoua',
    'DC.date': '1925',
    'DC.type': 'Garden Center',
    'DC.format': 'Website',
    'DC.identifier': 'https://adamhallsgardencenter.com',
    'DC.language': 'en',
    'DC.coverage': 'Moreno Valley, Riverside County, Orange County, Los Angeles',
    'DC.rights': 'Copyright 2024 Adam Hall\'s Garden Center',
  },
}

// Enhanced Structured Data for Local Business
const structuredData = {
  "@context": "https://schema.org",
  "@type": "GardenCenter",
  "name": "Adam Hall's Garden Center",
  "description": "Adam Hall's Garden Center is a family-owned plant nursery in Moreno Valley, California, serving Riverside County, Orange County, and the Los Angeles area. We offer quality plants, garden supplies, and expert gardening advice. Open daily 8am-6pm.",
  "url": "https://adamhallsgardencenter.com",
  "logo": "https://adamhallsgardencenter.com/images/logo.jpg",
  "telephone": "+1-951-674-9422",
  "email": "Adam@adamhallsnursery.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "28095 Alessandro Blvd",
    "addressLocality": "Moreno Valley",
    "addressRegion": "CA",
    "postalCode": "92555",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.912345,
    "longitude": -117.234567
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$",
  "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Check"],
  "currenciesAccepted": "USD",
  "areaServed": [
    {
      "@type": "City",
      "name": "Moreno Valley"
    },
    {
      "@type": "City", 
      "name": "Riverside"
    },
    {
      "@type": "City",
      "name": "San Bernardino"
    },
    {
      "@type": "City",
      "name": "Orange County"
    },
    {
      "@type": "City",
      "name": "Los Angeles"
    },
    {
      "@type": "City",
      "name": "Corona"
    },
    {
      "@type": "City",
      "name": "Temecula"
    },
    {
      "@type": "City",
      "name": "Murrieta"
    },
    {
      "@type": "City",
      "name": "Lake Elsinore"
    },
    {
      "@type": "City",
      "name": "Perris"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Plants and Garden Supplies",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Trees and Shrubs",
          "description": "Quality trees and shrubs for landscaping and gardens"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Product",
          "name": "Succulents and Cacti",
          "description": "Drought-resistant succulents and cacti perfect for California gardens"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product", 
          "name": "Garden Tools and Supplies",
          "description": "Professional garden tools, soil, fertilizers, and supplies"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Flowering Plants",
          "description": "Beautiful flowering plants for year-round color"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Herbs and Vegetables",
          "description": "Fresh herbs and vegetable plants for home gardens"
        }
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/adamhallsgardencenter",
    "https://www.instagram.com/adamhallsgardencenter",
    "https://www.yelp.com/biz/adam-halls-garden-center-moreno-valley",
    "https://www.google.com/maps/place/Adam+Hall's+Garden+Center"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "founder": {
    "@type": "Person",
    "name": "Adam Hall",
    "jobTitle": "Founder and Owner",
    "description": "Adam Hall has been growing and selling plants since 1925"
  },
  "foundingDate": "1925",
  "slogan": "Growing the healthiest, most beautiful plants for every garden",
  "knowsAbout": [
    "Plant Care",
    "Garden Design", 
    "Landscaping",
    "Succulents",
    "Trees and Shrubs",
    "Garden Tools",
    "Soil and Fertilizers",
    "California Native Plants",
    "Drought-Resistant Gardening",
    "Seasonal Planting",
    "Plant Disease Treatment",
    "Garden Maintenance"
  ],
  "serviceType": [
    "Plant Sales",
    "Garden Supply Retail",
    "Landscaping Consultation",
    "Plant Care Advice",
    "Local Delivery",
    "Custom Plant Orders",
    "Garden Design Services"
  ],
  "hasMap": "https://www.google.com/maps/place/28095+Alessandro+Blvd,+Moreno+Valley,+CA+92555",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-951-674-9422",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1-951-250-5117",
      "contactType": "customer service",
      "contactOption": "TollFree",
      "availableLanguage": "English"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1-951-704-3370",
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  ],
  "employee": [
    {
      "@type": "Person",
      "name": "Taylor Hall",
      "jobTitle": "Customer Service Manager & Design",
      "telephone": "+1-951-250-5117"
    },
    {
      "@type": "Person",
      "name": "Devon Dourseoua",
      "jobTitle": "Sales Manager & Head Plant Specialist",
      "telephone": "+1-951-704-3370"
    }
  ],
  "award": [
    "Best Garden Center Moreno Valley 2024",
    "Top Plant Nursery Riverside County",
    "Customer Choice Award Inland Empire"
  ],
  "brand": "Adam Hall's Garden Center",
  "category": "Garden Center",
  "subcategory": "Plant Nursery"
}

// Additional FAQ Schema for AI Discovery
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are your business hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are open daily from 8am-6pm most of the year, and 8am-5pm after time changes."
      }
    },
    {
      "@type": "Question",
      "name": "Do you deliver plants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer local delivery services to Moreno Valley, Riverside, and surrounding areas."
      }
    },
    {
      "@type": "Question",
      "name": "What types of plants do you sell?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We sell trees, shrubs, succulents, flowering plants, herbs, vegetables, and garden supplies."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer plant care advice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our expert staff provides free plant care advice and gardening tips."
      }
    },
    {
      "@type": "Question",
      "name": "Where are you located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are located at 28095 Alessandro Blvd, Moreno Valley, CA 92555, serving Riverside County, Orange County, and Los Angeles area."
      }
    }
  ]
}

// Breadcrumb Schema
const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://adamhallsgardencenter.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Shop",
      "item": "https://adamhallsgardencenter.com/shop"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "About",
      "item": "https://adamhallsgardencenter.com/about"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Contact",
      "item": "https://adamhallsgardencenter.com/contact"
    }
  ]
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <link rel="canonical" href="https://adamhallsgardencenter.com" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Moreno Valley" />
        <meta name="geo.position" content="33.912345;-117.234567" />
        <meta name="ICBM" content="33.912345, -117.234567" />
        <meta name="DC.title" content="Adam Hall's Garden Center" />
        <meta name="DC.creator" content="Adam Hall" />
        <meta name="DC.subject" content="Garden Center, Plant Nursery, Plants, Garden Supplies" />
        <meta name="DC.description" content="Family-owned garden center in Moreno Valley, CA serving Riverside County, Orange County, and Los Angeles area." />
        <meta name="DC.publisher" content="Adam Hall's Garden Center" />
        <meta name="DC.contributor" content="Adam Hall, Taylor Hall, Devon Dourseoua" />
        <meta name="DC.date" content="1925" />
        <meta name="DC.type" content="Garden Center" />
        <meta name="DC.format" content="Website" />
        <meta name="DC.identifier" content="https://adamhallsgardencenter.com" />
        <meta name="DC.language" content="en" />
        <meta name="DC.coverage" content="Moreno Valley, Riverside County, Orange County, Los Angeles" />
        <meta name="DC.rights" content="Copyright 2024 Adam Hall's Garden Center" />
        
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GardenCenter",
              "name": "Adam Hall's Garden Center",
              "description": "Premier garden center in Moreno Valley offering quality plants, garden supplies, and expert gardening advice. Serving Riverside County, Orange County, and Los Angeles area.",
              "url": "https://adamhallsgardencenter.com",
              "telephone": "+1-951-674-9422",
              "email": "Adam@adamhallsnursery.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "28095 Alessandro Blvd",
                "addressLocality": "Moreno Valley",
                "addressRegion": "CA",
                "postalCode": "92555",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 33.9375,
                "longitude": -117.2306
              },
              "openingHours": [
                "Mo-Su 08:00-18:00"
              ],
              "priceRange": "$$",
              "paymentAccepted": "Cash, Credit Card, Debit Card",
              "currenciesAccepted": "USD",
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Moreno Valley"
                },
                {
                  "@type": "City", 
                  "name": "Riverside"
                },
                {
                  "@type": "City",
                  "name": "Orange County"
                },
                {
                  "@type": "City",
                  "name": "Los Angeles"
                }
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 33.9375,
                  "longitude": -117.2306
                },
                "geoRadius": "50000"
              },
              "sameAs": [
                "https://www.facebook.com/adamhallsgardencenter",
                "https://www.instagram.com/adamhallsgardencenter"
              ],
              "image": [
                "https://adamhallsgardencenter.com/images/og-image.jpg"
              ],
              "logo": "https://adamhallsgardencenter.com/images/logo.jpg"
            })
          }}
        />
        
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_title: 'Adam Hall\'s Garden Center',
                  custom_map: {
                    'custom_parameter_1': 'location',
                    'custom_parameter_2': 'business_type'
                  }
                });
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  'custom_parameter_1': 'Moreno Valley, CA',
                  'custom_parameter_2': 'Garden Center'
                });
              `,
            }} />
          </>
        )}
        
        {/* Error Tracking and Performance Monitoring */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Error tracking
            window.addEventListener('error', function(e) {
              console.error('Error tracked:', e.error);
              if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                  description: e.error.message,
                  fatal: false
                });
              }
            });
            
            // Performance monitoring
            window.addEventListener('load', function() {
              if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData && typeof gtag !== 'undefined') {
                  gtag('event', 'timing_complete', {
                    name: 'load',
                    value: Math.round(perfData.loadEventEnd - perfData.loadEventStart)
                  });
                }
              }
            });
            
            // User interaction tracking
            document.addEventListener('click', function(e) {
              if (e.target.tagName === 'A' && typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                  event_category: 'engagement',
                  event_label: e.target.href || e.target.textContent
                });
              }
            });
          `,
        }} />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-to-content absolute left-[-999px] top-auto w-px h-px overflow-hidden focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:bg-green-700 focus:text-white focus:rounded focus:p-3 z-50 transition-all">Skip to main content</a>
        <OfflineIndicator />
        <Navigation />
        <AuthProvider>
          <WishlistProvider>
            <main id="main-content" className="min-h-screen">{children}</main>
          </WishlistProvider>
        </AuthProvider>
        <Footer />
        <PWAInstallPrompt />
        <MobileFeatures />
        <SpeedInsights />
      </body>
    </html>
  )
} 