import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, phone, eventId, eventName } = await request.json()

    // Basic validation
    if (!name || !email || !eventId || !eventName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email to user
    // 3. Send notification email to staff
    // 4. Add to calendar/event management system

    // For now, we'll just return success
    // In production, integrate with your email service (SendGrid, etc.)
    // eslint-disable-next-line no-console
    console.log('Event registration:', {
      name,
      email,
      phone,
      eventId,
      eventName,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      message: 'Successfully registered for event',
      registrationId: `reg_${Date.now()}`,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Event registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register for event' },
      { status: 500 }
    )
  }
} 