'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Clock, Download, RefreshCw, XCircle } from 'lucide-react';
import { OrderStatus, downloadUrl, formatRupees, saveOrder, shopGet } from '@/lib/shop';

const POLL_MS = 4000;
const MAX_POLLS = 45; // about three minutes

export default function OrderClient() {
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [error, setError] = useState('');
  const [link, setLink] = useState<{ o: string; t: string } | null>(null);
  const [gaveUp, setGaveUp] = useState(false);
  const polls = useRef(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const o = params.get('o') || '';
    const t = params.get('t') || '';
    if (!o || !t) {
      setError('यह ऑर्डर लिंक अमान्य है।');
      return;
    }
    setLink({ o, t });
    let timer: ReturnType<typeof setTimeout>;
    let stopped = false;

    // The server asks PhonePe for the real status every time; nothing here is taken from the redirect
    const check = async () => {
      try {
        const data = await shopGet<OrderStatus>('order-status', { o, t });
        if (stopped) return;
        setOrder(data);
        if (data.status === 'paid') saveOrder(data.product.slug, { o, t });
        if (data.status === 'pending') {
          polls.current += 1;
          if (polls.current < MAX_POLLS) timer = setTimeout(check, POLL_MS);
          else setGaveUp(true);
        }
      } catch (err) {
        if (!stopped) setError(err instanceof Error ? err.message : 'ऑर्डर की स्थिति नहीं मिल सकी।');
      }
    };
    check();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, []);

  const card = 'max-w-lg w-full bg-white dark:bg-[#1a1411] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl p-8 text-center space-y-4';

  return (
    <div className="min-h-[80vh] bg-[#faf8f5] dark:bg-[#120d0a] text-stone-900 dark:text-stone-100 flex items-center justify-center px-4 py-12 font-serif">
      {error ? (
        <div className={card}>
          <XCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h1 className="text-xl font-bold">{error}</h1>
          <a href="/ebooks/" className="text-sm font-semibold text-[#c2410c] hover:underline">ई-पुस्तकें देखें →</a>
        </div>
      ) : !order ? (
        <div className={card}>
          <RefreshCw className="w-10 h-10 text-amber-600 mx-auto animate-spin" />
          <h1 className="text-xl font-bold">भुगतान की पुष्टि की जा रही है…</h1>
        </div>
      ) : (
        <div className={card}>
          {order.status === 'paid' && (
            <>
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h1 className="text-2xl font-bold">भुगतान सफल — धन्यवाद! 🙏</h1>
              <p className="text-sm text-stone-600 dark:text-stone-400">{order.product.title}</p>
              {order.canDownload && link ? (
                <>
                  <a
                    href={downloadUrl(order.product.slug, link)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold"
                  >
                    <Download className="w-4 h-4" /> PDF डाउनलोड करें
                  </a>
                  <p className="text-xs text-stone-500">
                    शेष डाउनलोड: {order.downloadsLeft}. यह लिंक आपके ईमेल पर भी भेजा गया है — कृपया इसे साझा न करें।
                  </p>
                </>
              ) : (
                <p className="text-sm text-red-600">इस ऑर्डर का डाउनलोड वर्तमान में उपलब्ध नहीं है। कृपया हमसे संपर्क करें।</p>
              )}
            </>
          )}
          {order.status === 'pending' && (
            <>
              <Clock className="w-12 h-12 text-amber-600 mx-auto" />
              <h1 className="text-xl font-bold">{gaveUp ? 'भुगतान अभी लंबित है' : 'भुगतान की प्रतीक्षा है…'}</h1>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                {gaveUp
                  ? 'पुष्टि मिलते ही डाउनलोड लिंक आपके ईमेल पर भेज दिया जाएगा। आप यह पृष्ठ बाद में फिर खोल सकते हैं।'
                  : 'यदि आपने भुगतान कर दिया है तो कुछ क्षण प्रतीक्षा करें, यह पृष्ठ स्वयं अपडेट होगा।'}
              </p>
              {order.checkoutUrl && (
                <a href={order.checkoutUrl} className="inline-block px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold">
                  भुगतान पूरा करें
                </a>
              )}
            </>
          )}
          {(order.status === 'failed' || order.status === 'cancelled') && (
            <>
              <XCircle className="w-12 h-12 text-red-500 mx-auto" />
              <h1 className="text-xl font-bold">
                {order.status === 'cancelled' ? 'भुगतान पूरा नहीं हुआ (समय समाप्त)' : 'भुगतान असफल रहा'}
              </h1>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                आपसे कोई राशि नहीं ली गई है। यदि राशि कट गई है तो वह बैंक द्वारा लौटा दी जाएगी, या हमसे संपर्क करें।
              </p>
              <a href={`/ebooks/${order.product.slug}/`} className="inline-block px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold">
                पुनः प्रयास करें
              </a>
            </>
          )}
          {order.status === 'refunded' && (
            <>
              <RefreshCw className="w-12 h-12 text-stone-500 mx-auto" />
              <h1 className="text-xl font-bold">यह भुगतान वापस (Refund) कर दिया गया है</h1>
            </>
          )}
          <p className="text-[11px] text-stone-400 font-sans pt-2 border-t border-stone-100 dark:border-stone-800">
            Order {order.orderNumber} • {formatRupees(order.amount)}
          </p>
        </div>
      )}
    </div>
  );
}
