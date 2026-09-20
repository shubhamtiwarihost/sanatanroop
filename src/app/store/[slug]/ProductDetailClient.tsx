'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/context/CartContext';
import { ALL_STORE_PRODUCTS, StoreProduct } from '@/data/storeProducts';
import {
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ShoppingCart,
  Zap,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Share2,
  Heart,
} from 'lucide-react';

export default function ProductDetailClient() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const { locale, t } = useLanguage();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'vidhi' | 'details' | 'reviews'>('desc');
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Find product by slug or default to first
  const product: StoreProduct = useMemo(() => {
    const found = ALL_STORE_PRODUCTS.find((p) => p.slug === slug);
    return found || ALL_STORE_PRODUCTS[0];
  }, [slug]);

  // Related products in same category
  const relatedProducts = useMemo(() => {
    return ALL_STORE_PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);
  }, [product]);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        slug: product.slug,
        titleEn: product.title,
        titleHi: product.titleHi || product.title,
        price: product.price,
        mrp: product.mrp,
        imageUrl: product.img,
        stock: 50,
        sku: product.id,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans pb-20">
      
      {/* BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-xs text-stone-500 font-serif flex items-center space-x-2">
          <Link href="/" className="hover:text-[#ea580c]">Home</Link>
          <span>/</span>
          <Link href="/store" className="hover:text-[#ea580c]">Store</Link>
          <span>/</span>
          <span className="text-orange-700 font-semibold">{product.category}</span>
          <span>/</span>
          <span className="text-stone-900 font-bold truncate max-w-xs sm:max-w-md">{product.title}</span>
        </nav>
      </div>

      {/* PRODUCT MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-10">
            
            {/* Left Column: Product Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 flex items-center justify-center group">
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[#ea580c] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {product.badge}
                  </span>
                )}
                {product.mrp && product.mrp > product.price && (
                  <span className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif uppercase tracking-widest text-[#ea580c] font-bold">
                    {product.category}
                  </span>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center space-x-1 text-xs text-stone-500 hover:text-[#ea580c] border border-stone-200 px-3 py-1.5 rounded-full transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Link Copied' : 'Share'}</span>
                  </button>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                  {product.title}
                </h1>
                {product.titleHi && (
                  <p className="text-sm font-serif text-orange-950/70">{product.titleHi}</p>
                )}

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-stone-800">{product.rating}</span>
                  <span className="text-stone-400">•</span>
                  <span className="text-stone-500 text-xs">({product.reviewsCount} customer reviews)</span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline space-x-3 pt-2">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#b45309]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.mrp && product.mrp > product.price && (
                    <span className="text-lg font-serif text-stone-400 line-through">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Inclusive of all taxes
                  </span>
                </div>

                <p className="text-sm text-stone-600 font-serif leading-relaxed">
                  {product.shortDesc}
                </p>

                {/* Quantity Selector */}
                <div className="pt-2 flex items-center space-x-4">
                  <span className="text-xs font-semibold text-stone-700">Quantity:</span>
                  <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-semibold text-stone-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 transition font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-3.5 px-6 rounded-xl font-medium flex items-center justify-center space-x-2 transition shadow-sm ${
                      added
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-6 rounded-xl font-medium bg-amber-700 hover:bg-amber-800 text-white flex items-center justify-center space-x-2 transition shadow-sm"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-stone-100 text-center">
                  <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                    <ShieldCheck className="w-5 h-5 text-orange-600 mx-auto" />
                    <p className="text-[11px] font-bold text-stone-800">100% Authentic</p>
                    <p className="text-[10px] text-stone-500">Certified & Blessed</p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                    <Truck className="w-5 h-5 text-orange-600 mx-auto" />
                    <p className="text-[11px] font-bold text-stone-800">Fast Shipping</p>
                    <p className="text-[10px] text-stone-500">Pan-India Delivery</p>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                    <RotateCcw className="w-5 h-5 text-orange-600 mx-auto" />
                    <p className="text-[11px] font-bold text-stone-800">Easy Returns</p>
                    <p className="text-[10px] text-stone-500">7 Days Return</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Tabbed Content */}
          <div className="border-t border-stone-200">
            <div className="flex border-b border-stone-200 px-6 sm:px-10">
              <button
                onClick={() => setActiveTab('desc')}
                className={`py-4 px-4 font-serif text-sm font-semibold border-b-2 transition ${
                  activeTab === 'desc'
                    ? 'border-[#ea580c] text-[#ea580c]'
                    : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                Description
              </button>
              {product.consecrationNote && (
                <button
                  onClick={() => setActiveTab('vidhi')}
                  className={`py-4 px-4 font-serif text-sm font-semibold border-b-2 transition ${
                    activeTab === 'vidhi'
                      ? 'border-[#ea580c] text-[#ea580c]'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Consecration & Vidhi
                </button>
              )}
            </div>

            <div className="p-6 sm:p-10 font-serif leading-relaxed text-stone-700 text-sm">
              {activeTab === 'desc' && (
                <div className="space-y-4">
                  <p>{product.shortDesc}</p>
                </div>
              )}
              {activeTab === 'vidhi' && (
                <div className="space-y-4 bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                  <h3 className="font-bold text-base text-orange-950">प्राण-प्रतिष्ठा एवं पूजन निर्देश (Consecration & Vidhi)</h3>
                  <p className="text-orange-900/90 whitespace-pre-line">{product.consecrationNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl font-serif font-bold text-stone-900">Related Sacred Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/store/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                >
                  <div className="relative aspect-square w-full bg-stone-50 overflow-hidden">
                    <Image
                      src={rel.img}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-serif uppercase tracking-widest text-[#ea580c] font-bold">
                        {rel.category}
                      </span>
                      <h3 className="font-serif font-bold text-sm text-stone-900 line-clamp-1 group-hover:text-[#ea580c] transition">
                        {rel.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                      <span className="font-serif font-bold text-stone-900">₹{rel.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-[#ea580c] font-semibold flex items-center">
                        View <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
