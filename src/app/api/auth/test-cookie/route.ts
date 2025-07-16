import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookies = request.cookies;
  const authCookie = cookies.get('nextarch-admin-token');
  
  const allCookies = [];
  for (const [name, cookie] of cookies.entries()) {
    allCookies.push({
      name,
      value: cookie.value.substring(0, 20) + '...',
      path: cookie.path,
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite
    });
  }
  
  return NextResponse.json({
    message: 'Cookie test',
    hasAuthCookie: !!authCookie,
    authCookieValue: authCookie ? authCookie.value.substring(0, 50) + '...' : null,
    allCookies
  });
} 