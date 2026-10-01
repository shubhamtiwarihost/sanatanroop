// Client for the PHP CMS API in public/api (shared content for all visitors).

const CMS_API = '/api/cms.php';
const UPLOAD_API = '/api/upload.php';
const SYNC_PREFIXES = ['hindu_dharma_cms_', 'sanatan_cms_', 'sanatan_live_festival'];
// Orders are created by visitors at checkout and stay in their own browser
const LOCAL_ONLY_KEYS = ['hindu_dharma_cms_orders'];
const PUSH_DEBOUNCE_MS = 600;

export const CMS_SYNC_ERROR_EVENT = 'sanatan_cms_sync_error';

export function isSyncedKey(key: string): boolean {
  return SYNC_PREFIXES.some((p) => key.startsWith(p)) && !LOCAL_ONLY_KEYS.includes(key);
}

// Server-issued admin tokens are "<payload>.<signature>"
export function isServerToken(token: string | null | undefined): token is string {
  return !!token && token.includes('.');
}

export function getAdminToken(): string | null {
  try {
    const token = localStorage.getItem('auth_token');
    return isServerToken(token) ? token : null;
  } catch {
    return null;
  }
}

function reportSyncError(message: string) {
  console.warn('CMS sync error:', message);
  window.dispatchEvent(new CustomEvent(CMS_SYNC_ERROR_EVENT, { detail: message }));
}

async function post(body: unknown, token: string) {
  try {
    const res = await fetch(CMS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
      body: JSON.stringify(body),
    });
    if (res.status === 401) reportSyncError('सत्र समाप्त हो गया है — कृपया पुनः लॉगिन करें (Session expired, please log in again).');
    else if (!res.ok) reportSyncError(`सर्वर पर सुरक्षित नहीं हो सका (Could not save to server: ${res.status}).`);
  } catch {
    reportSyncError('सर्वर से संपर्क नहीं हो सका (Could not reach server). परिवर्तन केवल इस ब्राउज़र में सुरक्षित हैं।');
  }
}

const pending = new Map<string, ReturnType<typeof setTimeout>>();

export function pushCmsValue(key: string, value: unknown) {
  if (typeof window === 'undefined' || !isSyncedKey(key)) return;
  const token = getAdminToken();
  if (!token) return;
  clearTimeout(pending.get(key));
  pending.set(
    key,
    setTimeout(() => {
      pending.delete(key);
      post({ key, value }, token);
    }, PUSH_DEBOUNCE_MS)
  );
}

export function resetRemoteCms(token: string | null) {
  if (token) post({ reset: true }, token);
}

// Returns raw JSON strings per key (same shape as localStorage), or null if the API is unavailable
export async function fetchRemoteCms(): Promise<Record<string, string> | null> {
  try {
    const res = await fetch(CMS_API, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json || typeof json.data !== 'object' || json.data === null) return null;
    const out: Record<string, string> = {};
    for (const [key, value] of Object.entries(json.data)) {
      if (isSyncedKey(key)) out[key] = JSON.stringify(value);
    }
    return out;
  } catch {
    return null;
  }
}

// Stores a PDF or image on the server and returns its public URL
export async function uploadFile(file: File): Promise<string | null> {
  const token = getAdminToken();
  if (!token) return null;
  try {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(UPLOAD_API, { method: 'POST', headers: { 'X-Admin-Token': token }, body: form });
    if (!res.ok) return null;
    const json = await res.json();
    return typeof json.url === 'string' ? json.url : null;
  } catch {
    return null;
  }
}
