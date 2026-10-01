// Client for the e-book store API (public/api/shop.php)
import { getAdminToken } from '@/lib/cmsSync';

const SHOP_API = '/api/shop.php';
const PURCHASES_KEY = 'sanatan_ebook_orders';

export interface ShopProduct {
  slug: string;
  title: string;
  description: string;
  price: number; // paise
  currency: string;
  coverImage: string;
  pdfSize: number | null;
  available: boolean;
}

export interface OrderStatus {
  orderNumber: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';
  note: string;
  amount: number;
  product: { slug: string; title: string };
  canDownload: boolean;
  downloadsLeft: number;
  checkoutUrl: string | null;
}

export const formatRupees = (paise: number) =>
  `₹${(paise / 100).toLocaleString('en-IN', { minimumFractionDigits: paise % 100 ? 2 : 0 })}`;

export const formatFileSize = (bytes: number | null) =>
  !bytes ? '' : bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

export async function shopGet<T>(action: string, params: Record<string, string> = {}, admin = false): Promise<T> {
  const query = new URLSearchParams({ action, ...params }).toString();
  const res = await fetch(`${SHOP_API}?${query}`, {
    cache: 'no-store',
    headers: admin ? { 'X-Admin-Token': getAdminToken() || '' } : {},
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data as T;
}

export async function shopPost<T>(action: string, body: unknown, admin = false): Promise<T> {
  const isForm = body instanceof FormData;
  const res = await fetch(`${SHOP_API}?action=${action}`, {
    method: 'POST',
    headers: {
      ...(isForm ? {} : { 'Content-Type': 'application/json' }),
      ...(admin ? { 'X-Admin-Token': getAdminToken() || '' } : {}),
    },
    body: isForm ? body : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data as T;
}

// The order link is a convenience copy in this browser; the server decides what it unlocks
export interface SavedOrder {
  o: string;
  t: string;
}

export function savedOrders(): Record<string, SavedOrder> {
  try {
    return JSON.parse(localStorage.getItem(PURCHASES_KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveOrder(slug: string, order: SavedOrder) {
  try {
    localStorage.setItem(PURCHASES_KEY, JSON.stringify({ ...savedOrders(), [slug]: order }));
  } catch {}
}

export const orderPageUrl = (order: SavedOrder) =>
  `/ebooks/order/?o=${encodeURIComponent(order.o)}&t=${encodeURIComponent(order.t)}`;

export const downloadUrl = (slug: string, order: SavedOrder) =>
  `/download/book/${encodeURIComponent(slug)}?o=${encodeURIComponent(order.o)}&t=${encodeURIComponent(order.t)}`;
