import { cookies } from 'next/headers';
import User from '@/models/User';
import dbConnect from './db';

export async function getCurrentUser() {
  try {
    await dbConnect();
    
    // Get user ID from session/cookie
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    
    if (!userId) {
      return null;
    }

    const user = await User.findById(userId).select('-password');
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}