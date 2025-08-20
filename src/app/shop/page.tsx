import ShopClient from './ShopClient';

export const metadata = {
  title: "Shop Plants, Tools & Supplies | Adam Hall's Garden Center",
  description: "Browse and shop quality plants, gardening tools, and supplies at Adam Hall's Garden Center. Find everything you need for your garden in Moreno Valley.",
  openGraph: {
    title: "Shop Plants, Tools & Supplies | Adam Hall's Garden Center",
    description: "Browse and shop quality plants, gardening tools, and supplies at Adam Hall's Garden Center. Find everything you need for your garden in Moreno Valley.",
    url: 'https://adamhalls.com/shop',
    siteName: "Adam Hall's Garden Center",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Adam Hall's Garden Center",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function ShopPage() {
  return <ShopClient />;
} 