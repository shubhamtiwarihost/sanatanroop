import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken, logAuditAction } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as any,
      name: user.name,
    });

    await logAuditAction({
      userId: user.id,
      action: 'LOGIN',
      entityType: 'USER',
      entityId: user.id,
      details: { role: user.role, email: user.email },
      ipAddress: req.ip || req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        preferredLocale: user.preferredLocale,
      },
    });

    // Set cookie for SSR/client persistence
    response.cookies.set('auth_token', token, {
      httpOnly: false, // Accessible by client context
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
