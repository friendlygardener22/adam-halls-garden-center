import ContactClient from './ContactClient';

export const metadata = {
  title: "Contact Us | Adam Hall's Garden Center",
  description: "Contact Adam Hall's Garden Center in Moreno Valley for expert gardening advice, store hours, location, and customer support.",
  openGraph: {
    title: "Contact Us | Adam Hall's Garden Center",
    description: "Contact Adam Hall's Garden Center in Moreno Valley for expert gardening advice, store hours, location, and customer support.",
    url: 'https://adamhalls.com/contact',
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

export default function ContactPage() {
  return <ContactClient />;
} 