'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshCw, Upload, Trash2, Pencil, Plus, CheckCircle2, AlertTriangle } from 'lucide-react';
import { uploadFile } from '@/lib/cmsSync';
import { formatFileSize, formatRupees, shopGet, shopPost } from '@/lib/shop';

interface AdminProduct {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  cover_image: string;
  status: 'active' | 'draft' | 'archived';
  pdf_file: string | null;
  pdf_name: string | null;
  pdf_size: number | null;
  sold: number;
}

interface AdminOrder {
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  amount: number;
  payment_gateway: string;
  gateway_order_id: string | null;
  gateway_transaction_id: string | null;
  payment_status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';
  status_note: string;
  created_at: number;
  product_title: string;
  download_count: number | null;
  download_limit: number | null;
  revoked_at: number | null;
}

interface GatewaySettings {
  environment: 'sandbox' | 'production';
  clientId: string;
  clientVersion: string;
  hasClientSecret: boolean;
  webhookUsername: string;
  hasWebhookPassword: boolean;
  webhookUrl: string;
  ready: boolean;
  secureStorage: boolean;
}

const EMPTY_PRODUCT = { id: 0, slug: '', title: '', description: '', priceRupees: '', coverImage: '', status: 'draft' };

const STATUS_STYLE: Record<AdminOrder['payment_status'], string> = {
  paid: 'bg-emerald-100 text-emerald-800',
  pending: 'bg-amber-100 text-amber-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-stone-200 text-stone-700',
  refunded: 'bg-purple-100 text-purple-800',
};

const input = 'w-full border border-[#8c8f94] rounded px-2.5 py-1.5 text-xs bg-white focus:border-[#2271b1] focus:outline-none';
const primaryBtn = 'bg-[#2271b1] hover:bg-[#135e96] text-white px-3 py-1.5 rounded font-semibold text-xs disabled:opacity-50';
const linkBtn = 'text-[#2271b1] hover:underline text-xs';

export default function EbookStore({ onNotice }: { onNotice: (message: string) => void }) {
  const [tab, setTab] = useState<'books' | 'orders' | 'payment'>('books');
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [totals, setTotals] = useState({ paid_orders: 0, revenue: 0 });
  const [statusFilter, setStatusFilter] = useState('');
  const [form, setForm] = useState<typeof EMPTY_PRODUCT | null>(null);
  const [settings, setSettings] = useState<GatewaySettings | null>(null);
  const [secrets, setSecrets] = useState({ clientSecret: '', webhookPassword: '' });
  const [busy, setBusy] = useState(false);
  const pdfInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);
  const pdfTarget = useRef(0);

  const fail = useCallback((err: unknown) => onNotice(err instanceof Error ? err.message : 'Request failed'), [onNotice]);

  const loadProducts = useCallback(
    () => shopGet<{ products: AdminProduct[] }>('admin-products', {}, true).then((d) => setProducts(d.products)).catch(fail),
    [fail]
  );
  const loadOrders = useCallback(
    () =>
      shopGet<{ orders: AdminOrder[]; totals: { paid_orders: number; revenue: number } }>('admin-orders', statusFilter ? { status: statusFilter } : {}, true)
        .then((d) => {
          setOrders(d.orders);
          setTotals(d.totals);
        })
        .catch(fail),
    [fail, statusFilter]
  );
  const loadSettings = useCallback(
    () => shopGet<GatewaySettings>('gateway-settings', {}, true).then(setSettings).catch(fail),
    [fail]
  );

  useEffect(() => {
    if (tab === 'books') loadProducts();
    if (tab === 'orders') loadOrders();
    if (tab === 'payment') loadSettings();
  }, [tab, loadProducts, loadOrders, loadSettings]);

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setBusy(true);
    try {
      await shopPost('save-product', form, true);
      onNotice(`Book "${form.title}" saved.`);
      setForm(null);
      await loadProducts();
    } catch (err) {
      fail(err);
    }
    setBusy(false);
  };

  const uploadPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    try {
      const data = new FormData();
      data.append('id', String(pdfTarget.current));
      data.append('file', file);
      await shopPost('upload-pdf', data, true);
      onNotice('Protected PDF uploaded.');
      await loadProducts();
    } catch (err) {
      fail(err);
    }
    setBusy(false);
  };

  const uploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !form) return;
    setBusy(true);
    const url = await uploadFile(file);
    if (url) setForm({ ...form, coverImage: url });
    else onNotice('Cover image could not be uploaded.');
    setBusy(false);
  };

  const removeProduct = async (p: AdminProduct) => {
    if (!confirm(`Delete "${p.title}"? Books that already have orders are archived instead.`)) return;
    try {
      const res = await shopPost<{ archived?: boolean }>('delete-product', { id: p.id }, true);
      onNotice(res.archived ? 'This book has orders, so it was archived (hidden from the store).' : 'Book deleted.');
      await loadProducts();
    } catch (err) {
      fail(err);
    }
  };

  const orderAction = async (action: string, body: Record<string, string>, done: string) => {
    try {
      await shopPost(action, body, true);
      onNotice(done);
      await loadOrders();
    } catch (err) {
      fail(err);
    }
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setBusy(true);
    try {
      const res = await shopPost<{ connected: boolean }>('save-gateway-settings', { ...settings, ...secrets }, true);
      onNotice(res.connected ? 'Saved. PhonePe accepted these credentials.' : 'Saved, but PhonePe did not accept these credentials. Check them and the environment.');
      setSecrets({ clientSecret: '', webhookPassword: '' });
      await loadSettings();
    } catch (err) {
      fail(err);
    }
    setBusy(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-normal text-[#1d2327]">E-Book Store</h1>
        {(['books', 'orders', 'payment'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1 rounded text-xs font-semibold border ${tab === t ? 'bg-[#2271b1] text-white border-[#2271b1]' : 'bg-white text-[#2271b1] border-[#2271b1]'}`}
          >
            {t === 'books' ? 'Books' : t === 'orders' ? 'Orders' : 'PhonePe Settings'}
          </button>
        ))}
        {busy && <span className="text-xs text-amber-700">Working…</span>}
      </div>

      {tab === 'books' && (
        <div className="space-y-4">
          {!form && (
            <button onClick={() => setForm({ ...EMPTY_PRODUCT })} className={`${primaryBtn} inline-flex items-center gap-1`}>
              <Plus className="w-3.5 h-3.5" /> Add Book
            </button>
          )}
          {form && (
            <form onSubmit={saveProduct} className="bg-white border border-[#c3c4c7] rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2 font-bold text-[#1d2327]">{form.id ? 'Edit Book' : 'New Book'}</div>
              <label className="space-y-1">
                <span className="font-semibold">Title</span>
                <input
                  required
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm({
                      ...form,
                      title,
                      slug: form.id ? form.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
                    });
                  }}
                  className={input}
                />
              </label>
              <label className="space-y-1">
                <span className="font-semibold">URL name (English letters, e.g. hanuman-chalisa)</span>
                <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={input} />
              </label>
              <label className="space-y-1">
                <span className="font-semibold">Price (₹)</span>
                <input required type="number" min="1" step="0.01" value={form.priceRupees} onChange={(e) => setForm({ ...form, priceRupees: e.target.value })} className={input} />
              </label>
              <label className="space-y-1">
                <span className="font-semibold">Status</span>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={input}>
                  <option value="draft">Draft (hidden)</option>
                  <option value="active">Active (on sale)</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <label className="space-y-1 md:col-span-2">
                <span className="font-semibold">Description</span>
                <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={input} />
              </label>
              <div className="space-y-1 md:col-span-2">
                <span className="font-semibold">Cover image</span>
                <div className="flex gap-2">
                  <input value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} placeholder="Image URL" className={input} />
                  <button type="button" onClick={() => coverInput.current?.click()} className="border border-[#2271b1] text-[#2271b1] px-3 rounded text-xs font-semibold whitespace-nowrap">
                    Upload
                  </button>
                </div>
              </div>
              <div className="md:col-span-2 flex items-center gap-2">
                <button type="submit" disabled={busy} className={primaryBtn}>Save Book</button>
                <button type="button" onClick={() => setForm(null)} className={linkBtn}>Cancel</button>
                <span className="text-[11px] text-stone-500">After saving, upload the PDF from the list below.</span>
              </div>
            </form>
          )}

          <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f6f7f7] border-b border-[#c3c4c7]">
                <tr>
                  {['Book', 'Price', 'Status', 'Protected PDF', 'Sold', ''].map((h) => (
                    <th key={h} className="p-2.5 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && (
                  <tr><td colSpan={6} className="p-4 text-stone-500">No books yet. Add your first book above.</td></tr>
                )}
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-[#f0f0f1] align-top">
                    <td className="p-2.5">
                      <div className="font-semibold text-[#1d2327]">{p.title}</div>
                      <a href={`/ebooks/${p.slug}/`} target="_blank" rel="noopener noreferrer" className={linkBtn}>/ebooks/{p.slug}/</a>
                    </td>
                    <td className="p-2.5">{formatRupees(p.price)}</td>
                    <td className="p-2.5 capitalize">{p.status}</td>
                    <td className="p-2.5">
                      {p.pdf_file ? (
                        <span className="text-emerald-700">{p.pdf_name} ({formatFileSize(p.pdf_size)})</span>
                      ) : (
                        <span className="text-red-600">No PDF — cannot be sold yet</span>
                      )}
                      <div>
                        <button
                          onClick={() => {
                            pdfTarget.current = p.id;
                            pdfInput.current?.click();
                          }}
                          className={`${linkBtn} inline-flex items-center gap-1`}
                        >
                          <Upload className="w-3 h-3" /> {p.pdf_file ? 'Replace PDF' : 'Upload PDF'}
                        </button>
                      </div>
                    </td>
                    <td className="p-2.5">{p.sold}</td>
                    <td className="p-2.5 whitespace-nowrap space-x-3">
                      <button
                        onClick={() => setForm({ id: p.id, slug: p.slug, title: p.title, description: p.description, priceRupees: String(p.price / 100), coverImage: p.cover_image, status: p.status })}
                        className={`${linkBtn} inline-flex items-center gap-1`}
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </button>
                      <button onClick={() => removeProduct(p)} className="text-red-600 hover:underline text-xs inline-flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-stone-500">
            Paid PDFs are stored in a private folder on the server. They have no public link and are only sent to buyers with a verified payment.
          </p>
        </div>
      )}

      {tab === 'orders' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-white border border-[#c3c4c7] rounded px-3 py-1.5">Paid orders: <strong>{totals.paid_orders}</strong></span>
            <span className="bg-white border border-[#c3c4c7] rounded px-3 py-1.5">Revenue: <strong>{formatRupees(totals.revenue)}</strong></span>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-[#8c8f94] rounded px-2 py-1.5 text-xs bg-white">
              <option value="">All statuses</option>
              {Object.keys(STATUS_STYLE).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button onClick={loadOrders} className={`${linkBtn} inline-flex items-center gap-1`}>
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>
          <div className="bg-white border border-[#c3c4c7] rounded overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f6f7f7] border-b border-[#c3c4c7]">
                <tr>
                  {['Order', 'Customer', 'Book', 'Amount', 'Payment', 'Downloads', 'Actions'].map((h) => (
                    <th key={h} className="p-2.5 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && (
                  <tr><td colSpan={7} className="p-4 text-stone-500">No orders.</td></tr>
                )}
                {orders.map((o) => (
                  <tr key={o.order_number} className="border-b border-[#f0f0f1] align-top">
                    <td className="p-2.5">
                      <div className="font-mono">{o.order_number}</div>
                      <div className="text-stone-500">{new Date(o.created_at * 1000).toLocaleString('en-IN')}</div>
                    </td>
                    <td className="p-2.5">
                      <div>{o.customer_name}</div>
                      <div className="text-stone-500">{o.customer_email}</div>
                      {o.customer_phone && <div className="text-stone-500">{o.customer_phone}</div>}
                    </td>
                    <td className="p-2.5">{o.product_title}</td>
                    <td className="p-2.5">{formatRupees(o.amount)}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_STYLE[o.payment_status]}`}>{o.payment_status}</span>
                      {o.status_note && <div className="text-red-600 mt-1">{o.status_note}</div>}
                      {o.gateway_transaction_id && <div className="text-stone-500 mt-1 font-mono">{o.gateway_transaction_id}</div>}
                    </td>
                    <td className="p-2.5">
                      {o.download_count === null ? '—' : `${o.download_count} / ${o.download_limit}`}
                      {o.revoked_at && <div className="text-red-600">Access revoked</div>}
                    </td>
                    <td className="p-2.5 space-y-1">
                      {o.payment_status !== 'paid' && o.payment_status !== 'refunded' && (
                        <button onClick={() => orderAction('recheck-order', { orderNumber: o.order_number }, 'Checked with PhonePe.')} className={`${linkBtn} block`}>
                          Re-check with PhonePe
                        </button>
                      )}
                      {o.download_count !== null && (
                        <>
                          <button onClick={() => orderAction('set-access', { orderNumber: o.order_number, change: o.revoked_at ? 'restore' : 'revoke' }, 'Access updated.')} className={`${linkBtn} block`}>
                            {o.revoked_at ? 'Restore access' : 'Revoke access'}
                          </button>
                          <button onClick={() => orderAction('set-access', { orderNumber: o.order_number, change: 'reset-downloads' }, 'Download count reset.')} className={`${linkBtn} block`}>
                            Reset downloads
                          </button>
                          {o.payment_status === 'paid' && (
                            <button onClick={() => orderAction('set-access', { orderNumber: o.order_number, change: 'resend-email' }, 'Download link emailed.')} className={`${linkBtn} block`}>
                              Email link again
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-stone-500">
            Refunds are issued from the PhonePe Business dashboard. When PhonePe confirms a refund, the order changes to &quot;refunded&quot; here and the download stops working.
          </p>
        </div>
      )}

      {tab === 'payment' && settings && (
        <form onSubmit={saveSettings} className="bg-white border border-[#c3c4c7] rounded p-4 space-y-3 max-w-2xl">
          <div className={`flex items-center gap-2 p-2.5 rounded ${settings.ready ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
            {settings.ready ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {settings.ready ? `PhonePe is set up (${settings.environment}).` : 'PhonePe is not set up yet. Buy Now stays disabled until credentials are saved.'}
          </div>
          {!settings.secureStorage && (
            <div className="flex items-center gap-2 p-2.5 rounded bg-amber-50 text-amber-800">
              <AlertTriangle className="w-4 h-4" /> Private files are stored inside the website folder (blocked by server rules) because the folder above it is not writable.
            </div>
          )}
          <label className="space-y-1 block">
            <span className="font-semibold">Environment</span>
            <select value={settings.environment} onChange={(e) => setSettings({ ...settings, environment: e.target.value as GatewaySettings['environment'] })} className={input}>
              <option value="sandbox">Sandbox (testing, no real money)</option>
              <option value="production">Production (real payments)</option>
            </select>
          </label>
          <label className="space-y-1 block">
            <span className="font-semibold">Client ID</span>
            <input value={settings.clientId} onChange={(e) => setSettings({ ...settings, clientId: e.target.value })} className={input} autoComplete="off" />
          </label>
          <label className="space-y-1 block">
            <span className="font-semibold">Client Version</span>
            <input value={settings.clientVersion} onChange={(e) => setSettings({ ...settings, clientVersion: e.target.value })} className={input} autoComplete="off" />
          </label>
          <label className="space-y-1 block">
            <span className="font-semibold">Client Secret {settings.hasClientSecret && <em className="font-normal text-stone-500">(saved — leave empty to keep)</em>}</span>
            <input type="password" value={secrets.clientSecret} onChange={(e) => setSecrets({ ...secrets, clientSecret: e.target.value })} className={input} autoComplete="new-password" />
          </label>
          <div className="pt-2 border-t border-[#dcdcde] space-y-2">
            <p className="font-semibold">Webhook (set the same values in the PhonePe dashboard)</p>
            <p className="text-stone-600">URL: <code className="bg-stone-100 px-1.5 py-0.5 rounded select-all">{settings.webhookUrl}</code></p>
            <p className="text-stone-500 text-[11px]">Events: checkout.order.completed, checkout.order.failed, pg.refund.completed, pg.refund.failed</p>
            <label className="space-y-1 block">
              <span className="font-semibold">Webhook username</span>
              <input value={settings.webhookUsername} onChange={(e) => setSettings({ ...settings, webhookUsername: e.target.value })} className={input} autoComplete="off" />
            </label>
            <label className="space-y-1 block">
              <span className="font-semibold">Webhook password {settings.hasWebhookPassword && <em className="font-normal text-stone-500">(saved — leave empty to keep)</em>}</span>
              <input type="password" value={secrets.webhookPassword} onChange={(e) => setSecrets({ ...secrets, webhookPassword: e.target.value })} className={input} autoComplete="new-password" />
            </label>
          </div>
          <button type="submit" disabled={busy} className={primaryBtn}>Save and test connection</button>
          <p className="text-[11px] text-stone-500">Secrets are stored only on the server and are never shown again or sent to the browser.</p>
        </form>
      )}

      <input ref={pdfInput} type="file" accept="application/pdf" hidden onChange={uploadPdf} />
      <input ref={coverInput} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={uploadCover} />
    </div>
  );
}
