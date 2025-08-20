import CheckoutClient from './CheckoutClient';

export const metadata = {
  title: "Checkout | Adam Hall's Garden Center",
  description: "Complete your purchase and place your order for plants and garden supplies from Adam Hall's Garden Center.",
  openGraph: {
    title: "Checkout | Adam Hall's Garden Center",
    description: "Complete your purchase and place your order for plants and garden supplies from Adam Hall's Garden Center.",
    url: 'https://adamhalls.com/checkout',
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

export default function CheckoutPage() {
  return <CheckoutClient />;
} 