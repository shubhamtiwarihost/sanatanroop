'use client';

import React, { useEffect, useState } from 'react';
import { X, Download, ShieldCheck } from 'lucide-react';
import { ShopProduct, formatRupees, shopGet } from '@/lib/shop';

export interface PayBookInfo {
  id: string;
  titleHi: string;
  titleEn: string;
  author: string;
  pdfUrl?: string;
  pdfFileName?: string;
  pdfFileSize?: string;
}

interface BookPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: PayBookInfo | null;
}

// Points the reader to the e-book store, where payment is verified on the server before any download
export default function BookPayModal({ isOpen, onClose, book }: BookPayModalProps) {
  const [product, setProduct] = useState<ShopProduct | null | 'loading'>('loading');

  useEffect(() => {
    if (!isOpen || !book) return;
    setProduct('loading');
    shopGet<{ product: ShopProduct }>('product', { slug: book.id })
      .then((d) => setProduct(d.product))
      .catch(() => setProduct(null));
  }, [isOpen, book]);

  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1b120c] border border-[#c5a059]/40 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-stone-200">
        <div className="px-5 py-4 border-b border-[#c5a059]/30 flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-amber-100 flex items-center gap-2">
            <Download className="w-5 h-5 text-amber-300" /> ग्रंथ PDF डाउनलोड
          </h3>
          <button onClick={onClose} aria-label="Close" className="text-stone-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 text-center font-serif">
          <h4 className="text-lg font-bold text-amber-200">{book.titleHi}</h4>
          {product === 'loading' ? (
            <p className="text-sm text-stone-400">लोड हो रहा है…</p>
          ) : product ? (
            <>
              <p className="text-3xl font-bold text-amber-300">{formatRupees(product.price)}</p>
              <a
                href={`/ebooks/${product.slug}/`}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-sm font-bold"
              >
                PDF खरीदें (Buy PDF)
              </a>
              <p className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> PhonePe द्वारा सुरक्षित भुगतान
              </p>
            </>
          ) : (
            <p className="text-sm text-stone-300 leading-relaxed">
              इस ग्रंथ का PDF डाउनलोड अभी उपलब्ध नहीं है। आप इसे ऑनलाइन निःशुल्क पढ़ सकते हैं।
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
