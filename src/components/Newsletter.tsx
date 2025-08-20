'use client'

import { useState } from 'react'

interface NewsletterProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function Newsletter({
  title = "Subscribe to Our Newsletter",
  description = "Get gardening tips, seasonal advice, and exclusive offers delivered to your inbox.",
  className = "",
}: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setStatus('success')
      setMessage('Thank you for subscribing!')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  return (
    <div className={`bg-green-50 rounded-lg p-6 ${className}`}>
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" aria-label="Newsletter signup form">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            aria-required="true"
            aria-invalid={status === 'error'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {/*
          To connect to Mailchimp, replace the fetch('/api/newsletter', ...) call in handleSubmit
          with a POST to your Mailchimp endpoint, e.g.:
          await fetch('https://YOUR_DC.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', { ... })
        */}
        {message && (
          <p
            className={`mt-4 text-sm ${
              status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
            role={status === 'error' ? 'alert' : undefined}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
} 