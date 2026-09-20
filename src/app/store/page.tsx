'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/context/CartContext';
import {
  Search,
  ShoppingCart,
  Check,
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Filter,
  Eye,
  X,
  Zap,
} from 'lucide-react';

import { StoreProduct, ALL_STORE_PRODUCTS } from '@/data/storeProducts';

export default function StorePage() {
  const { locale, t } = useLanguage();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [quickViewProduct, setQuickViewProduct] = useState<StoreProduct | null>(null);

  const categories = [
    { name: 'All', icon: '📿', label: 'All Items' },
    { name: 'Puja Samagri', icon: '🪔', label: 'Puja Samagri' },
    { name: 'Idols & Statues', icon: '🕉️', label: 'Idols & Statues' },
    { name: 'Rudraksha', icon: '🌿', label: 'Rudraksha' },
    { name: 'Books', icon: '📖', label: 'Spiritual Books' },
    { name: 'Agarbatti', icon: '✨', label: 'Dhoop & Agarbatti' },
    { name: 'Yantra', icon: '🏵️', label: 'Sacred Yantras' },
  ];

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return ALL_STORE_PRODUCTS.filter((p) => {
      const matchesCategory =
        activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.titleHi && p.titleHi.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [activeCategory, searchQuery, sortBy]);

  const handleAddToCart = (product: StoreProduct) => {
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
      1
    );

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans pb-20">
      
      {/* =========================================================================
          HERO BANNER: SPIRITUAL STORE
      ========================================================================= */}
      <section className="bg-gradient-to-r from-[#241711] via-[#3a2217] to-[#241711] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#4d3224]">
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>॥ प्रामाणिक वैदिक सामग्री एवं पावन शास्त्र ॥</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-wide text-amber-100">
            सनातन भण्डार • Spiritual Store
          </h1>

          <p className="text-sm sm:text-base text-amber-200/90 font-serif max-w-2xl mx-auto leading-relaxed">
            प्रामाणिक रुद्राक्ष, शुद्ध पीतल विग्रह, हवन सामग्री, धूप एवं पावन ग्रन्थ। काशी व हरिद्वार से अभिमंत्रित।
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-lg mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="रुद्राक्ष, विग्रह, दीप, ग्रन्थ या हवन सामग्री खोजें..."
              className="w-full bg-white text-stone-900 placeholder-stone-400 text-xs sm:text-sm rounded-full py-3 pl-11 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CATEGORY ICONS PILL CAROUSEL ROW
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-start md:justify-center gap-3 sm:gap-6 overflow-x-auto py-2 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => setActiveCategory(c.name)}
              className="flex flex-col items-center group shrink-0 transition-transform hover:-translate-y-0.5"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl transition shadow-sm ${
                  activeCategory === c.name
                    ? 'bg-[#ea580c] text-white ring-4 ring-orange-500/20 shadow-orange-600/30'
                    : 'bg-white dark:bg-[#1a1411] border border-stone-200/90 text-stone-700 hover:border-orange-300'
                }`}
              >
                <span>{c.icon}</span>
              </div>
              <span
                className={`text-xs font-semibold mt-2 ${
                  activeCategory === c.name
                    ? 'text-[#ea580c] font-bold'
                    : 'text-stone-700 dark:text-stone-300'
                }`}
              >
                {c.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FILTER & SORT BAR
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
              {activeCategory === 'All' ? 'All Sacred Products' : activeCategory}
            </h2>
            <span className="text-xs text-stone-500 font-semibold bg-stone-100 px-2.5 py-0.5 rounded-full">
              {filteredProducts.length} items
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-stone-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="featured">Featured & Sacred</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRODUCTS GRID
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
            <p className="font-serif text-stone-600 text-base">
              No products found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="text-xs text-orange-600 underline font-semibold"
            >
              View all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Product Badge if any */}
                {p.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-[#ea580c] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {p.badge}
                  </span>
                )}

                <div>
                  {/* Product Image Container */}
                  <Link href={`/store/${p.slug}`} className="block">
                    <div className="w-full aspect-square relative rounded-2xl overflow-hidden bg-stone-50 mb-3 group-hover:scale-102 transition duration-300">
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setQuickViewProduct(p);
                        }}
                        className="absolute bottom-2 right-2 p-2 bg-white/90 hover:bg-white rounded-xl text-stone-700 shadow-sm opacity-0 group-hover:opacity-100 transition duration-200"
                        title="Quick View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md">
                        {p.category}
                      </span>
                      <div className="flex items-center space-x-1 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span className="font-bold text-stone-700 text-[10px]">
                          {p.rating}
                        </span>
                        <span className="text-stone-400 text-[10px]">
                          ({p.reviewsCount})
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-bold text-sm text-stone-900 line-clamp-2 leading-snug group-hover:text-[#ea580c] transition">
                      {p.title}
                    </h3>

                    {/* Price & MRP */}
                    <div className="flex items-baseline space-x-2 mt-2 mb-3">
                      <span className="text-base sm:text-lg font-bold text-stone-900 font-mono">
                        ₹ {p.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-400 line-through font-mono">
                        ₹ {p.mrp.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                        {Math.round(((p.mrp - p.price) / p.mrp) * 100)}% OFF
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Card Bottom Actions */}
                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <button
                    onClick={() => handleAddToCart(p)}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition shadow-sm ${
                      addedIds[p.id]
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#ea580c] hover:bg-[#c2410c] text-white shadow-orange-600/20'
                    }`}
                  >
                    {addedIds[p.id] ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          STORE TRUST GUARANTEES
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-stone-900">100% Authentic & Consecrated</h4>
              <p className="text-xs text-stone-500">Every sacred item is purified and consecrated with Vedic rites.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-stone-900">Free Sacred Shipping</h4>
              <p className="text-xs text-stone-500">Complimentary delivery across India with tamper-proof packaging.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-stone-900">Easy Temple Returns</h4>
              <p className="text-xs text-stone-500">Hassle-free 7-day replacement guarantee on non-perishable items.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-stone-900">Lab Certified Rudraksha</h4>
              <p className="text-xs text-stone-500">Includes x-ray certification and test report for natural beads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          QUICK VIEW MODAL
      ========================================================================= */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-44 h-44 relative rounded-2xl overflow-hidden bg-stone-50 shrink-0 border border-stone-100">
                <Image
                  src={quickViewProduct.img}
                  alt={quickViewProduct.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c]">
                  {quickViewProduct.category}
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                  {quickViewProduct.title}
                </h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-stone-900 font-mono">
                    ₹ {quickViewProduct.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-stone-400 line-through font-mono">
                    ₹ {quickViewProduct.mrp.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {quickViewProduct.shortDesc}
                </p>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl text-xs text-amber-900 font-serif border border-amber-200/80">
              <strong>Vedic Consecration:</strong> {quickViewProduct.consecrationNote}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <Link
                href={`/store/${quickViewProduct.slug}`}
                className="text-xs font-bold text-orange-600 hover:underline inline-flex items-center space-x-1"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => {
                  handleAddToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md transition"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
