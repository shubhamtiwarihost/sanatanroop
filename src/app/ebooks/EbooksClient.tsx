'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, Download, Mail, ShieldCheck } from 'lucide-react';
import { ShopProduct, formatFileSize, formatRupees, orderPageUrl, savedOrders, shopGet, shopPost, SavedOrder } from '@/lib/shop';

export default function EbooksClient() {
  const [products, setProducts] = useState<ShopProduct[] | null>(null);
  const [error, setError] = useState('');
  const [owned, setOwned] = useState<Record<string, SavedOrder>>({});
  const [email, setEmail] = useState('');
  const [resendState, setResendState] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    setOwned(savedOrders());
    shopGet<{ products: ShopProduct[] }>('products')
      .then((d) => setProducts(d.products))
      .catch(() => setError('पुस्तकें लोड नहीं हो सकीं। कृपया पुनः प्रयास करें।'));
  }, []);

  const resend = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendState('sending');
    await shopPost('resend-links', { email }).catch(() => null);
    setResendState('sent');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] text-stone-900 dark:text-stone-100 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">सनातन ई-पुस्तकें (E-Books)</h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            ग्रंथ, चालीसा एवं आध्यात्मिक पुस्तकें PDF में खरीदें और तुरंत डाउनलोड करें।
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> PhonePe द्वारा सुरक्षित भुगतान (UPI, कार्ड, नेट बैंकिंग)
          </p>
        </header>

        {error && <p className="text-center text-sm text-red-600">{error}</p>}
        {!products && !error && <p className="text-center text-sm text-stone-500">लोड हो रहा है…</p>}
        {products?.length === 0 && (
          <p className="text-center text-sm text-stone-500">अभी कोई पुस्तक बिक्री के लिए उपलब्ध नहीं है। शीघ्र ही आ रही हैं।</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((p) => (
            <a
              key={p.slug}
              href={`/ebooks/${p.slug}/`}
              className="bg-white dark:bg-[#1a1411] rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-md transition flex flex-col"
            >
              <div className="h-56 bg-gradient-to-br from-amber-100 to-orange-200 dark:from-stone-800 dark:to-stone-900 flex items-center justify-center overflow-hidden">
                {p.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <BookOpen className="w-14 h-14 text-amber-700/60" />
                )}
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col">
                <h2 className="font-serif font-bold text-lg leading-snug">{p.title}</h2>
                <p className="text-xs text-stone-500 line-clamp-3 flex-1">{p.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
                  <span className="text-lg font-bold text-[#c2410c]">{formatRupees(p.price)}</span>
                  <span className="text-xs font-semibold text-stone-500">
                    {owned[p.slug] ? 'खरीदी हुई ✓' : `PDF ${formatFileSize(p.pdfSize)}`}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {Object.keys(owned).length > 0 && (
          <section className="bg-white dark:bg-[#1a1411] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 space-y-3">
            <h2 className="font-serif font-bold text-lg">इस ब्राउज़र से की गई खरीद (Your orders)</h2>
            <ul className="space-y-2 text-sm">
              {Object.entries(owned).map(([slug, order]) => (
                <li key={slug}>
                  <a href={orderPageUrl(order)} className="inline-flex items-center gap-1.5 text-[#c2410c] font-semibold hover:underline">
                    <Download className="w-4 h-4" /> {products?.find((p) => p.slug === slug)?.title || slug} — {order.o}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="bg-white dark:bg-[#1a1411] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 space-y-3 max-w-xl mx-auto">
          <h2 className="font-serif font-bold text-base flex items-center gap-2">
            <Mail className="w-4 h-4" /> पहले खरीदी थी? डाउनलोड लिंक ईमेल पर पाएं
          </h2>
          {resendState === 'sent' ? (
            <p className="text-sm text-emerald-700 dark:text-emerald-400">
              यदि इस ईमेल से कोई खरीद हुई है, तो डाउनलोड लिंक भेज दिया गया है। कृपया इनबॉक्स एवं स्पैम देखें।
            </p>
          ) : (
            <form onSubmit={resend} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="खरीद के समय दिया गया ईमेल"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <button
                type="submit"
                disabled={resendState === 'sending'}
                className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-amber-600 text-white text-sm font-bold disabled:opacity-60"
              >
                लिंक भेजें
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
