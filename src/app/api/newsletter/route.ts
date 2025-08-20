import { NextResponse } from 'next/server'

// You need to set these in your .env.local file:
// MAILCHIMP_API_KEY=your-mailchimp-api-key
// MAILCHIMP_LIST_ID=your-mailchimp-list-id
// MAILCHIMP_SERVER_PREFIX=usX (e.g., us21)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Mailchimp API integration
    const apiKey = process.env.MAILCHIMP_API_KEY
    const listId = process.env.MAILCHIMP_LIST_ID
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX

    if (!apiKey || !listId || !serverPrefix) {
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      )
    }

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`;
    const data = {
      email_address: email,
      status: 'subscribed',
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      // Mailchimp error message
      return NextResponse.json(
        { error: result.detail || 'Failed to subscribe' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Successfully subscribed to newsletter',
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
} 