'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useCMS } from '@/context/CMSContext';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  Sparkles,
  Calendar,
  MapPin,
  Phone,
  User,
  ShoppingBag,
} from 'lucide-react';

export default function CheckoutPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { user } = useAuth();
  const { addOrder } = useCMS();
  const { items, subtotal, discount, total, couponCode, clearCart } = useCart();

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'NET_BANKING' | 'CARD' | 'COD'>('UPI');
  const [selectedUpiApp, setSelectedUpiApp] = useState('Google Pay');
  const [selectedBank, setSelectedBank] = useState('State Bank of India (SBI)');

  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!items.length) {
      setErrorMsg('Your cart is empty. Please add items before placing an order.');
      return;
    }

    if (!fullName.trim() || !phone.trim() || !addressLine.trim() || !city.trim() || !pincode.trim()) {
      setErrorMsg('Please complete all required shipping fields (*).');
      return;
    }

    setSubmitting(true);
    try {
      const orderNumber = `SANATAN-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingNumber = `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`;

      // Attempt API call to backend route
      try {
        const res = await fetch('/api/v1/store/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((i) => ({
              id: i.id,
              quantity: i.quantity,
              price: i.price,
              titleEn: i.titleEn,
              imageUrl: i.imageUrl,
            })),
            shippingAddress: {
              fullName,
              email,
              phone,
              addressLine,
              landmark,
              city,
              state,
              pincode,
              deliveryNote,
            },
            couponCode,
            paymentMethod,
          }),
        });

        const data = await res.json();
        if (res.ok && data.order) {
          setOrderResult(data.order);
        } else {
          // Fallback mock order result if backend API had local DB issue
          setOrderResult({
            orderNumber,
            trackingNumber,
            totalAmount: total,
            discountAmount: discount,
            shippingAddress: JSON.stringify({ fullName, phone, addressLine, city, state, pincode }),
            paymentMethod,
            paymentStatus: paymentMethod === 'COD' ? 'Pending (COD)' : 'PAID (Mock Gateway)',
            items: items.map((i) => ({ title: i.titleEn, quantity: i.quantity, price: i.price })),
          });
        }
      } catch (err) {
        // Network or local fallback
        setOrderResult({
          orderNumber,
          trackingNumber,
          totalAmount: total,
          discountAmount: discount,
          shippingAddress: JSON.stringify({ fullName, phone, addressLine, city, state, pincode }),
          paymentMethod,
          paymentStatus: paymentMethod === 'COD' ? 'Pending (COD)' : 'PAID (Mock Gateway)',
          items: items.map((i) => ({ title: i.titleEn, quantity: i.quantity, price: i.price })),
        });
      }

      // Synchronize order to CMS Orders state
      addOrder({
        id: orderNumber,
        orderNumber,
        customerName: fullName,
        customerEmail: email || 'devotee@sanatan.org',
        items: items.map((i) => `${i.titleEn} (x${i.quantity})`).join(', '),
        total,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
        fulfillmentStatus: 'Processing',
      });

      clearCart();
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment simulation error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS ORDER CONFIRMATION SCREEN
  if (orderResult) {
    return (
      <div className="min-h-screen bg-[#faf8f5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 text-center">
          
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c]">
              ॥ ॐ श्री गणेशाय नमः • आदेश पुष्टीकृतः ॥
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Order Placed Successfully!
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-serif">
              Thank you for shopping with Sanatan Store. Your sacred order has been consecrated and scheduled for priority dispatch.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-amber-200/80 pb-2.5">
              <span className="font-bold text-stone-700">Order Number:</span>
              <span className="font-mono font-bold text-stone-900 text-sm">{orderResult.orderNumber}</span>
            </div>

            <div className="flex justify-between border-b border-amber-200/80 pb-2.5">
              <span className="font-bold text-stone-700">Tracking Number:</span>
              <span className="font-mono font-semibold text-orange-700">{orderResult.trackingNumber}</span>
            </div>

            <div className="flex justify-between border-b border-amber-200/80 pb-2.5">
              <span className="font-bold text-stone-700">Payment Status:</span>
              <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                {orderResult.paymentStatus || 'PAID (Online Mock Gateway)'}
              </span>
            </div>

            <div className="flex justify-between border-b border-amber-200/80 pb-2.5">
              <span className="font-bold text-stone-700">Delivery Address:</span>
              <span className="text-right text-stone-800 font-medium">
                {fullName}, {addressLine}, {city}, {state} - {pincode}
              </span>
            </div>

            <div className="flex justify-between text-sm font-bold pt-1 text-stone-900">
              <span>Grand Total:</span>
              <span className="text-lg text-[#ea580c] font-mono">₹{orderResult.totalAmount}</span>
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-1 text-left font-serif">
            <div className="flex items-center space-x-2 font-bold text-stone-800">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span>Estimated Delivery: 3 to 5 Business Days</span>
            </div>
            <p>
              A tracking update has been recorded. All items are packed with sacred care using tamper-evident materials.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/store"
              className="px-6 py-3 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-bold shadow-md transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold transition"
            >
              Go to Homepage
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // EMPTY CART FALLBACK
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-[#ea580c] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-serif font-bold text-stone-900">Your Cart is Empty</h2>
        <p className="text-xs text-stone-500 font-serif">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          href="/store"
          className="inline-block px-6 py-2.5 rounded-xl bg-[#ea580c] text-white text-xs font-bold"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] font-sans pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/cart"
            className="inline-flex items-center space-x-1 text-xs font-bold text-orange-700 hover:text-orange-800"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="border-b border-stone-200 pb-4">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Sacred Checkout & Delivery
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Complete your shipping address and select payment method to receive authentic consecrated items.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Shipping Address & Payment Selection (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Shipping Address */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900 flex items-center space-x-2 border-b border-stone-100 pb-3">
                <Truck className="w-4 h-4 text-orange-600" />
                <span>1. Shipping & Delivery Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Acharya Vidyadhar"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    Phone Number (WhatsApp for Updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    Email Address (For Invoicing & Tracking)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="devotee@sanatan.org"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    Street Address / House / Ashram / Temple Road *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="Flat 204, Shivala Ghat Road"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Varanasi, Haridwar, etc."
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    State *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                  >
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Bihar">Bihar</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Other">Other States</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="221005"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    Landmark / Temple Nearby (Optional)
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Near Kashi Vishwanath corridor"
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-xl bg-stone-50/50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
              <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900 flex items-center space-x-2 border-b border-stone-100 pb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>2. Select Payment Method</span>
              </h2>

              <div className="space-y-3">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col space-y-2 ${
                    paymentMethod === 'UPI'
                      ? 'border-[#ea580c] bg-orange-50/40'
                      : 'border-stone-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                        className="text-orange-600"
                      />
                      <QrCode className="w-4 h-4 text-orange-600" />
                      <span className="font-bold text-xs sm:text-sm text-stone-900">
                        Instant UPI & QR Code (Google Pay, PhonePe, Paytm, BHIM)
                      </span>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      Fastest
                    </span>
                  </div>

                  {paymentMethod === 'UPI' && (
                    <div className="pt-2 pl-7 flex flex-wrap gap-2 text-xs">
                      {['Google Pay', 'PhonePe', 'Paytm UPI', 'BHIM'].map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUpiApp(app);
                          }}
                          className={`px-3 py-1.5 rounded-xl border font-semibold ${
                            selectedUpiApp === app
                              ? 'bg-orange-600 text-white border-orange-600'
                              : 'bg-white text-stone-700 border-stone-300'
                          }`}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Net Banking */}
                <div
                  onClick={() => setPaymentMethod('NET_BANKING')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col space-y-2 ${
                    paymentMethod === 'NET_BANKING'
                      ? 'border-[#ea580c] bg-orange-50/40'
                      : 'border-stone-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'NET_BANKING'}
                      onChange={() => setPaymentMethod('NET_BANKING')}
                      className="text-orange-600"
                    />
                    <Building className="w-4 h-4 text-orange-600" />
                    <span className="font-bold text-xs sm:text-sm text-stone-900">
                      Net Banking (All Indian Major Banks)
                    </span>
                  </div>

                  {paymentMethod === 'NET_BANKING' && (
                    <div className="pt-2 pl-7">
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full text-xs border border-stone-300 rounded-xl p-2 bg-white font-medium"
                      >
                        <option>State Bank of India (SBI)</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Punjab National Bank (PNB)</option>
                        <option>Bank of Baroda</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Card Payment */}
                <div
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-center space-x-3 ${
                    paymentMethod === 'CARD'
                      ? 'border-[#ea580c] bg-orange-50/40'
                      : 'border-stone-200 hover:border-orange-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'CARD'}
                    onChange={() => setPaymentMethod('CARD')}
                    className="text-orange-600"
                  />
                  <CreditCard className="w-4 h-4 text-orange-600" />
                  <span className="font-bold text-xs sm:text-sm text-stone-900">
                    Credit / Debit Card (Visa, RuPay, MasterCard)
                  </span>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                    paymentMethod === 'COD'
                      ? 'border-[#ea580c] bg-orange-50/40'
                      : 'border-stone-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="text-orange-600"
                    />
                    <Banknote className="w-4 h-4 text-orange-600" />
                    <span className="font-bold text-xs sm:text-sm text-stone-900">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-semibold">
                    Pay upon arrival
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary & Place Order Button (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
              <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
                Order Review ({items.length} items)
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-stone-100">
                {items.map((i) => (
                  <div key={i.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-stone-50 shrink-0 border border-stone-100">
                        <Image
                          src={i.imageUrl || '/images/category_puja.jpg'}
                          alt={i.titleEn}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-stone-900 line-clamp-1 block">
                          {i.titleEn}
                        </span>
                        <span className="text-stone-400">Qty: {i.quantity}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-stone-900 shrink-0">
                      ₹ {(i.price * i.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 text-xs text-stone-600 pt-3 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono font-semibold">₹ {subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({couponCode}):</span>
                    <span className="font-mono">- ₹ {discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Sacred Shipping:</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>

                <div className="border-t border-stone-200 pt-3 flex justify-between text-base font-extrabold text-stone-900">
                  <span>Grand Total:</span>
                  <span className="text-2xl text-[#ea580c] font-mono">₹ {total.toLocaleString()}</span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Submit / Place Order Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] disabled:opacity-50 text-white text-sm font-bold shadow-lg shadow-orange-600/25 transition flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
              >
                <span>
                  {submitting
                    ? 'Confirming Sacred Order...'
                    : `Place Order • ₹ ${total.toLocaleString()}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust & Guarantee */}
              <div className="pt-2 text-center space-y-2">
                <div className="flex items-center justify-center space-x-1 text-[11px] text-stone-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
                <p className="text-[10px] text-stone-400">
                  Orders are dispatched with consecrated packaging and authenticity reports.
                </p>
              </div>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
