import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const { email, password, adminKey } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // If admin login, verify admin role and key
    if (adminKey) {
      if (user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Unauthorized access' },
          { status: 403 }
        );
      }
      // Add your admin key verification logic here
      if (adminKey !== process.env.ADMIN_KEY) {
        return NextResponse.json(
          { error: 'Invalid admin key' },
          { status: 401 }
        );
      }
    }

    // Set user cookie after successful login
    const cookieStore = await cookies();
    cookieStore.set('userId', user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    // Return user data (exclude password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return NextResponse.json(userData);
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}