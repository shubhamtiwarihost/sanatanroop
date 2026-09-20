'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  Trash2,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Check,
  Tag,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    total,
    couponCode,
    applyCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    const ok = applyCoupon(inputCoupon);
    if (ok) {
      setCouponMsg({ text: `Coupon code '${inputCoupon.toUpperCase()}' applied successfully!`, success: true });
    } else {
      setCouponMsg({ text: 'Invalid coupon code. Try SANATAN10 or GITA20', success: false });
    }
  };

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#faf8f5] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 text-center space-y-5 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-amber-50 text-[#ea580c] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Your Sacred Cart is Empty
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-serif leading-relaxed">
              Explore our consecrated spiritual store to find authentic Rudraksha, sacred books, and puja samagri.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/store"
              className="inline-flex items-center space-x-2 bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition transform hover:-translate-y-0.5"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Explore Sacred Store</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans pb-20">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-stone-500 mb-1">
            <Link href="/store" className="hover:text-orange-600 flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Your Sacred Cart ({items.length} items)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-stone-500 hover:text-red-600 font-semibold underline self-start sm:self-auto"
        >
          Clear All Items
        </button>
      </div>

      {/* Main 2-Column Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items (8 Columns) */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
              Selected Devotional Items
            </h2>

            <div className="divide-y divide-stone-100">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 relative rounded-2xl overflow-hidden bg-stone-50 shrink-0 border border-stone-100">
                      <Image
                        src={item.imageUrl || '/images/category_puja.jpg'}
                        alt={item.titleEn}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 leading-snug">
                        {item.titleEn}
                      </h3>
                      {item.titleHi && (
                        <p className="text-xs text-stone-500 font-serif">
                          {item.titleHi}
                        </p>
                      )}
                      <div className="flex items-baseline space-x-2 mt-1">
                        <span className="text-base font-bold text-[#ea580c] font-mono">
                          ₹ {item.price.toLocaleString()}
                        </span>
                        {item.mrp && item.mrp > item.price && (
                          <span className="text-xs text-stone-400 line-through font-mono">
                            ₹ {item.mrp.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 self-end sm:self-center">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1.5 bg-stone-50 hover:bg-stone-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 font-bold font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 bg-stone-50 hover:bg-stone-100 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <span className="text-sm font-bold text-stone-900 font-mono block">
                        ₹ {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <div className="pt-6 border-t border-stone-100 space-y-3">
              <span className="text-xs font-bold text-stone-700 flex items-center space-x-1.5">
                <Tag className="w-3.5 h-3.5 text-orange-600" />
                <span>Apply Sacred Discount Coupon</span>
              </span>

              <form onSubmit={handleApplyCoupon} className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="Enter coupon (e.g. SANATAN10, GITA20)"
                  className="flex-1 px-4 py-2 text-xs border border-stone-300 rounded-xl uppercase font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition"
                >
                  Apply
                </button>
              </form>

              {couponMsg && (
                <p
                  className={`text-xs font-semibold ${
                    couponMsg.success ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {couponMsg.text}
                </p>
              )}

              {couponCode && (
                <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
                  <span>Coupon {couponCode} is active</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary (4 Columns) */}
          <div className="lg:col-span-4 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-stone-600">
              <div className="flex items-center justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-stone-900 font-mono">
                  ₹ {subtotal.toLocaleString()}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({couponCode})</span>
                  <span className="font-mono">- ₹ {discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Sacred Shipping (All India)</span>
                <span className="font-bold text-emerald-700">FREE</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-200 text-base font-bold text-stone-900">
                <span>Grand Total</span>
                <span className="text-2xl text-[#ea580c] font-mono font-extrabold">
                  ₹ {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => router.push('/checkout')}
              className="w-full py-4 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-sm shadow-lg shadow-orange-600/25 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security and Payment Logos */}
            <div className="pt-4 border-t border-stone-100 text-center space-y-2.5">
              <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-stone-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Safe & Secure Checkout</span>
              </div>
              <p className="text-[10px] text-stone-400 leading-tight">
                UPI • Net Banking • Debit & Credit Cards • Cash on Delivery
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
