import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken, logAuditAction } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, preferredLocale = 'en' } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email: cleanEmail,
        passwordHash,
        role: 'USER',
        preferredLocale,
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: 'USER',
      name: user.name,
    });

    await logAuditAction({
      userId: user.id,
      action: 'REGISTER',
      entityType: 'USER',
      entityId: user.id,
      details: { email: user.email },
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

    response.cookies.set('auth_token', token, {
      httpOnly: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
