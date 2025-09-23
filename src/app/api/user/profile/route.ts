import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function PUT(request: Request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    const { userId, ...updateData } = data;

    console.log('Updating user:', userId, 'with data:', updateData); // Debug log

    const updateFields = {
      name: updateData.name,
      year: updateData.year,
      department: updateData.department,
      carpoolPreference: updateData.carpoolPreference,
      vehicleDetails: {
        model: updateData.vehicleModel,
        plateNumber: updateData.vehiclePlate
      },
      updatedAt: new Date()
    };
    console.log("UpdateFields being applied:", updateFields);


    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    )
    .select('-password') 
    .lean();;

    if (!updatedUser) {
      console.log('User not found:', userId); // Debug log
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('Updated user:', updatedUser); // Debug log
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}