import { ADMIN_CREDENTIAL_HASH } from '@/config/adminCredentials';

export const ADMIN_ROLES = ['SUPER_ADMIN', 'CONTENT_ADMIN', 'STORE_ADMIN'];

// Must match scripts/set-admin-password.mjs
const PBKDF2_ITERATIONS = 310000;
const SALT_PREFIX = 'sanatanroop-admin:';

export const ADMIN_SESSION_TOKEN = `admin-${ADMIN_CREDENTIAL_HASH.slice(0, 24)}`;

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  if (!ADMIN_CREDENTIAL_HASH || typeof crypto === 'undefined' || !crypto.subtle) return false;
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        hash: 'SHA-256',
        salt: enc.encode(SALT_PREFIX + email.trim().toLowerCase()),
        iterations: PBKDF2_ITERATIONS,
      },
      key,
      256
    );
    const hex = Array.from(new Uint8Array(bits))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hex === ADMIN_CREDENTIAL_HASH;
  } catch {
    return false;
  }
}
