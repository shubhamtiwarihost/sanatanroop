import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'sanatan-default-jwt-secret-key';

export type Role =
  | 'SUPER_ADMIN'
  | 'CONTENT_ADMIN'
  | 'STORE_ADMIN'
  | 'EDITOR'
  | 'AUTHOR'
  | 'MODERATOR'
  | 'USER';

export type ActionPermission =
  | 'CREATE'
  | 'READ'
  | 'UPDATE'
  | 'DELETE'
  | 'PUBLISH'
  | 'APPROVE'
  | 'EXPORT';

export type Resource =
  | 'SCRIPTURES'
  | 'BOOKS'
  | 'SHLOKAS'
  | 'ARTICLES'
  | 'PRODUCTS'
  | 'ORDERS'
  | 'USERS'
  | 'AUDIT_LOGS'
  | 'SETTINGS'
  | 'MEDIA';

// Permission Matrix enforcing server-side rules
const ROLE_PERMISSIONS: Record<Role, { allowedResources: Resource[]; allowedActions: ActionPermission[] }> = {
  SUPER_ADMIN: {
    allowedResources: ['SCRIPTURES', 'BOOKS', 'SHLOKAS', 'ARTICLES', 'PRODUCTS', 'ORDERS', 'USERS', 'AUDIT_LOGS', 'SETTINGS', 'MEDIA'],
    allowedActions: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'PUBLISH', 'APPROVE', 'EXPORT'],
  },
  CONTENT_ADMIN: {
    allowedResources: ['SCRIPTURES', 'BOOKS', 'SHLOKAS', 'ARTICLES', 'SETTINGS', 'MEDIA'],
    allowedActions: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'PUBLISH', 'APPROVE', 'EXPORT'],
  },
  STORE_ADMIN: {
    allowedResources: ['PRODUCTS', 'ORDERS', 'SETTINGS', 'MEDIA'],
    allowedActions: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'PUBLISH', 'APPROVE', 'EXPORT'],
  },
  EDITOR: {
    allowedResources: ['SCRIPTURES', 'BOOKS', 'SHLOKAS', 'ARTICLES'],
    allowedActions: ['CREATE', 'READ', 'UPDATE', 'APPROVE'],
  },
  AUTHOR: {
    allowedResources: ['ARTICLES'],
    allowedActions: ['CREATE', 'READ', 'UPDATE'],
  },
  MODERATOR: {
    allowedResources: ['ARTICLES', 'PRODUCTS'],
    allowedActions: ['READ', 'DELETE'],
  },
  USER: {
    allowedResources: [],
    allowedActions: ['READ'],
  },
};

export function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, 10);
}

export function comparePassword(plainText: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plainText, hashed);
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: Role;
  name: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function hasPermission(role: string, resource: Resource, action: ActionPermission): boolean {
  const userRole = role as Role;
  const config = ROLE_PERMISSIONS[userRole];
  if (!config) return false;

  if (userRole === 'SUPER_ADMIN') return true;

  const resourceAllowed = config.allowedResources.includes(resource);
  const actionAllowed = config.allowedActions.includes(action);

  return resourceAllowed && actionAllowed;
}

export async function logAuditAction(params: {
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        details: params.details ? JSON.stringify(params.details) : null,
        ipAddress: params.ipAddress,
      },
    });
  } catch (e) {
    console.error('Failed to write audit log:', e);
  }
}
