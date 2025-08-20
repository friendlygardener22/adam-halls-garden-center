# Adam Hall's Garden Center Website

A modern, responsive e-commerce website for Adam Hall's Garden Center, built with Next.js, React, and Tailwind CSS.

## 🌱 Features

- **Product Catalog**: Browse plants, tools, and garden supplies
- **Advanced Filtering**: Filter by category, size, light requirements, water needs, and price
- **Shopping Cart**: Add items, manage quantities, apply promo codes
- **Checkout Process**: Complete customer information and place orders
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Contact Information**: Business hours, location, and team contact details

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment template:
   ```bash
   cp env.template .env.local
   ```
4. Fill in your environment variables in `.env.local`

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## 🔒 Security

This website has been configured with security best practices:

- **Security Headers**: XSS protection, content type sniffing prevention, frame options
- **Environment Variables**: All sensitive data stored in environment variables
- **Input Validation**: Server-side validation for all forms
- **HTTPS Only**: Configured for secure connections in production

### Before Deployment
1. Review the [Security Checklist](SECURITY.md)
2. Set up proper environment variables
3. Remove development scripts
4. Configure your hosting platform

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── api/            # API routes
│   ├── shop/           # Shop pages
│   ├── cart/           # Cart functionality
│   └── checkout/       # Checkout process
├── components/         # Reusable React components
├── store/             # Redux store configuration
└── styles/            # Global styles and CSS
```

## 🛠️ Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Payment Processing**: Stripe (configured)
- **Icons**: Heroicons
- **Deployment**: Vercel (recommended)

## 📞 Support

For questions or support, contact the development team.

## 📄 License

This project is private and proprietary to Adam Hall's Garden Center. 