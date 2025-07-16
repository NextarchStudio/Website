import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select(`
        *,
        roles (
          id,
          name,
          display_name,
          permissions
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error in GET /api/users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      first_name, 
      last_name, 
      email, 
      password, 
      role_id, 
      permissions,
      send_invite = true,
      require_password_change = true 
    } = body;

    // Validate required fields
    if (!first_name || !last_name || !email || !password || !role_id) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' }, 
        { status: 409 }
      );
    }

    // Hash password (in production, use a proper hashing library)
    const hashedPassword = password; // TODO: Implement proper password hashing

    // Create user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role_id,
        permissions: permissions || [],
        status: 'active',
        require_password_change,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (userError) {
      console.error('Error creating user:', userError);
      return NextResponse.json(
        { error: 'Failed to create user' }, 
        { status: 500 }
      );
    }

    // Send welcome email if requested
    if (send_invite) {
      // TODO: Implement email sending functionality
      console.log('Sending welcome email to:', email);
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/users:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 