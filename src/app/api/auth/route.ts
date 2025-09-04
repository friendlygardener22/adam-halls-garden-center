import { NextRequest, NextResponse } from 'next/server';
import { User, LoginCredentials, RegisterCredentials } from '@/types/user';
import { validateEmail } from '@/utils/validateEmail';

// In a real application, you'd use a database and proper authentication
// For now, we'll use a simple in-memory store (not suitable for production)
let users: User[] = [];

// Simple password hashing (in a real app, use bcrypt or similar)
const hashPassword = (password: string): string => {
  return btoa(password); // Base64 encoding (NOT secure - just for demo)
};

const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return hashPassword(password) === hashedPassword;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...credentials } = body;

    if (action === 'login') {
      return await handleLogin(credentials as LoginCredentials);
    } else if (action === 'register') {
      return await handleRegister(credentials as RegisterCredentials);
    } else if (action === 'logout') {
      return await handleLogout();
    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

async function handleLogin(credentials: LoginCredentials) {
  const { email, password } = credentials;

  // Validate input
  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  if (!validateEmail(email)) {
    return NextResponse.json(
      { error: 'Invalid email format' },
      { status: 400 }
    );
  }

  // Find user
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }

  // Verify password
  if (!verifyPassword(password, user.password || '')) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }

  // Create session (in a real app, use JWT or session tokens)
  const session = {
    userId: user.id,
    email: user.email,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  };

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      address: user.address,
      preferences: user.preferences,
    },
    session,
    message: 'Login successful',
  });
}

async function handleRegister(credentials: RegisterCredentials) {
  const { email, password, firstName, lastName, phone } = credentials;

  // Validate input
  if (!email || !password || !firstName || !lastName) {
    return NextResponse.json(
      { error: 'All required fields must be provided' },
      { status: 400 }
    );
  }

  if (!validateEmail(email)) {
    return NextResponse.json(
      { error: 'Invalid email format' },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters long' },
      { status: 400 }
    );
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return NextResponse.json(
      { error: 'User with this email already exists' },
      { status: 409 }
    );
  }

  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    email: email.toLowerCase(),
    firstName,
    lastName,
    phone,
    password: hashPassword(password), // In a real app, use proper hashing
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      newsletter: true,
      theme: 'light',
      language: 'en',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(newUser);

  // Create session
  const session = {
    userId: newUser.id,
    email: newUser.email,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  };

  return NextResponse.json({
    success: true,
    user: {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      address: newUser.address,
      preferences: newUser.preferences,
    },
    session,
    message: 'Registration successful',
  });
}

async function handleLogout() {
  // In a real app, you'd invalidate the session/token
  return NextResponse.json({
    success: true,
    message: 'Logout successful',
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (userId) {
      const user = users.find(u => u.id === userId);
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address,
          preferences: user.preferences,
        },
      });
    }

    // Return all users (in a real app, this would be admin-only)
    return NextResponse.json({
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
        preferences: user.preferences,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
