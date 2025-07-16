import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('Contact API: Fetching submissions...');
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    console.log('Contact API: Query result:', { data, error });

    if (error) {
      console.error('Contact API: Database error:', error);
      throw error;
    }

    console.log('Contact API: Returning data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact submissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to create contact submission' },
      { status: 500 }
    );
  }
} 