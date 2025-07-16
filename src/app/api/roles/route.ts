import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: roles, error } = await supabase
      .from('roles')
      .select(`
        *,
        users (
          id,
          first_name,
          last_name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching roles:', error);
      return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 });
    }

    // Add user count to each role
    const rolesWithUserCount = roles?.map(role => ({
      ...role,
      user_count: role.users?.length || 0
    }));

    return NextResponse.json(rolesWithUserCount);
  } catch (error) {
    console.error('Error in GET /api/roles:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      display_name, 
      description, 
      permissions,
      is_default = false,
      can_invite_users = false,
      requires_approval = false
    } = body;

    // Validate required fields
    if (!name || !display_name) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Check if role name already exists
    const { data: existingRole } = await supabase
      .from('roles')
      .select('id')
      .eq('name', name)
      .single();

    if (existingRole) {
      return NextResponse.json(
        { error: 'Role with this name already exists' }, 
        { status: 409 }
      );
    }

    // If this is set as default, unset other default roles
    if (is_default) {
      await supabase
        .from('roles')
        .update({ is_default: false })
        .eq('is_default', true);
    }

    // Create role
    const { data: role, error: roleError } = await supabase
      .from('roles')
      .insert({
        name,
        display_name,
        description,
        permissions: permissions || [],
        is_default,
        can_invite_users,
        requires_approval,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (roleError) {
      console.error('Error creating role:', roleError);
      return NextResponse.json(
        { error: 'Failed to create role' }, 
        { status: 500 }
      );
    }

    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/roles:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 