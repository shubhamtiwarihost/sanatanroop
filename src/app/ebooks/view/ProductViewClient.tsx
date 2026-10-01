'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronLeft, Download, Lock, ShieldCheck } from 'lucide-react';
import { ShopProduct, SavedOrder, formatFileSize, formatRupees, orderPageUrl, saveOrder, savedOrders, shopGet, shopPost } from '@/lib/shop';

interface CreateOrderResponse {
  alreadyPurchased?: boolean;
  orderNumber?: string;
  accessToken?: string;
  redirectUrl?: string;
}

export default function ProductViewClient() {
  const [product, setProduct] = useState<ShopProduct | null>(null);
  const [checkoutEnabled, setCheckoutEnabled] = useState(false);
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading');
  const [owned, setOwned] = useState<SavedOrder | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState('');
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);

  useEffect(() => {
    const match = window.location.pathname.match(/^\/ebooks\/([^/]+)\/?$/);
    const slug = new URLSearchParams(window.location.search).get('slug') || (match && match[1] !== 'view' ? decodeURIComponent(match[1]) : '');
    if (!slug) {
      setState('missing');
      return;
    }
    setOwned(savedOrders()[slug] || null);
    shopGet<{ product: ShopProduct; checkoutEnabled: boolean }>('product', { slug })
      .then((d) => {
        setProduct(d.product);
        setCheckoutEnabled(d.checkoutEnabled);
        setState('ready');
        document.title = `${d.product.title} — PDF ${formatRupees(d.product.price)} | SanatanRoop`;
      })
      .catch(() => setState('missing'));
  }, []);

  const buy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || buying) return;
    setBuying(true);
    setError('');
    try {
      const res = await shopPost<CreateOrderResponse>('create-order', { slug: product.slug, ...form });
      if (res.alreadyPurchased) {
        setAlreadyPurchased(true);
      } else if (res.orderNumber && res.accessToken && res.redirectUrl) {
        saveOrder(product.slug, { o: res.orderNumber, t: res.accessToken });
        window.location.href = res.redirectUrl;
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'भुगतान प्रारंभ नहीं हो सका।');
    }
    setBuying(false);
  };

  if (state !== 'ready' || !product) {
    return (
      <div className="min-h-[70vh] bg-[#faf8f5] dark:bg-[#120d0a] flex flex-col items-center justify-center text-center px-4 space-y-4 font-serif">
        <span className="text-4xl">📖</span>
        <h1 className="text-xl font-bold text-stone-800 dark:text-stone-200">
          {state === 'loading' ? 'लोड हो रहा है…' : 'यह पुस्तक उपलब्ध नहीं है (Book not found)'}
        </h1>
        {state === 'missing' && (
          <a href="/ebooks/" className="text-sm font-semibold text-[#c2410c] hover:underline">
            सभी ई-पुस्तकें देखें →
          </a>
        )}
      </div>
    );
  }

  const inputClass =
    'w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50';

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] text-stone-900 dark:text-stone-100 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <a href="/ebooks/" className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-[#ea580c]">
          <ChevronLeft className="w-4 h-4" /> सभी ई-पुस्तकें
        </a>

        <div className="grid grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)] gap-8">
          <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-gradient-to-br from-amber-100 to-orange-200 dark:from-stone-800 dark:to-stone-900 aspect-[3/4] flex items-center justify-center">
            {product.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.coverImage} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <BookOpen className="w-20 h-20 text-amber-700/60" />
            )}
          </div>

          <div className="space-y-5">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">{product.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-3xl font-bold text-[#c2410c]">{formatRupees(product.price)}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                PDF {formatFileSize(product.pdfSize)}
              </span>
            </div>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">{product.description}</p>

            {owned && (
              <a
                href={orderPageUrl(owned)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold"
              >
                <Download className="w-4 h-4" /> अपना ऑर्डर / डाउनलोड देखें
              </a>
            )}

            {alreadyPurchased ? (
              <p className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-sm text-emerald-800 dark:text-emerald-300">
                इस ईमेल से यह पुस्तक पहले ही खरीदी जा चुकी है। डाउनलोड लिंक आपके ईमेल पर भेज दिया गया है।
              </p>
            ) : !product.available || !checkoutEnabled ? (
              <p className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-sm text-amber-800 dark:text-amber-300">
                यह पुस्तक शीघ्र ही खरीद के लिए उपलब्ध होगी।
              </p>
            ) : (
              <form onSubmit={buy} className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#1a1411] p-5 space-y-3">
                <h2 className="font-serif font-bold text-base">खरीदने के लिए विवरण भरें</h2>
                {error && (
                  <p role="alert" className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {error}
                  </p>
                )}
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="आपका नाम (Name)" className={inputClass} />
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ईमेल — डाउनलोड लिंक यहीं भेजा जाएगा" className={inputClass} />
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="मोबाइल नंबर (वैकल्पिक)" className={inputClass} />
                <button
                  type="submit"
                  disabled={buying}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-sm font-bold shadow-md disabled:opacity-60"
                >
                  {buying ? 'PhonePe पर ले जाया जा रहा है…' : `अभी खरीदें (Buy Now) — ${formatRupees(product.price)}`}
                </button>
                <p className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> PhonePe द्वारा सुरक्षित भुगतान
                  <Lock className="w-3.5 h-3.5 ml-2" /> भुगतान सफल होते ही डाउनलोड उपलब्ध
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
