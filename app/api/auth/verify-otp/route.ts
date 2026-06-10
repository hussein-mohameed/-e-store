import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json();
    
    // Verify OTP here against stored value
    // Using 123456 as a mock correct OTP
    if (otp === '123456') { 
       // Generate Supabase token or session here in real app
       return NextResponse.json({ success: true, message: 'OTP verified' });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid OTP' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 });
  }
}
