import CartClient from './CartClient';

export const metadata = {
  title: "Shopping Cart | Adam Hall's Garden Center",
  description: "Review and checkout your selected plants and garden supplies from Adam Hall's Garden Center.",
  openGraph: {
    title: "Shopping Cart | Adam Hall's Garden Center",
    description: "Review and checkout your selected plants and garden supplies from Adam Hall's Garden Center.",
    url: 'https://adamhalls.com/cart',
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

export default function CartPage() {
  return <CartClient />;
} 