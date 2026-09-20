'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    subscribeUpdates: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const faqs = [
    {
      q: 'Are all scripture translations on the platform verified by scholars?',
      a: 'Yes. Every mantra, shloka, and translation is reviewed by traditional Sanskrit scholars and verified against authorized classical commentaries (Bhashyas) before publication.',
    },
    {
      q: 'How accurate are the Panchang calculations and Muhurats?',
      a: 'Our Panchang engine uses high-precision astronomical algorithms based on Surya Siddhanta and Drik Ganitha, calibrated for over 100 cities globally with precise local sunrise and sunset timings.',
    },
    {
      q: 'How do I place or track orders from the Sanatan Granth Store?',
      a: 'You can browse authenticated scriptures, puja samagri, and brass idols in our Store. Once placed, track your package directly under My Account or write to store@sanatan.org with your Order ID.',
    },
    {
      q: 'Can I request guidance on specific puja rituals or mantra japa?',
      a: 'Certainly! Use the contact form with the subject "Scripture & Ritual Guidance" or submit your question in the Community tab to receive responses from verified Vedic acharyas.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] pb-24">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-[#2a170e] via-[#1c110b] to-[#120d0a] text-amber-50 pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-900/40">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/images/temple_river_sunrise_1789306575821.jpg"
            alt="Sacred River Ghats"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>सनातन सेवा एवं संपर्क</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 tracking-tight">
            Contact & Seva Support
          </h1>
          <p className="text-sm sm:text-base text-amber-200/80 font-serif leading-relaxed max-w-2xl mx-auto">
            We are here to assist your spiritual journey. Reach out for shastric questions, order support, pilgrimage assistance, or platform suggestions.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Contact Details & Seva Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Get in Touch
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Our dedicated volunteer and acharya team typically responds within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-amber-200/50 dark:border-stone-700">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider">
                      Varanasi Research Ashram
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                      Assi Ghat Marg, Shivala, Kashi (Varanasi), Uttar Pradesh 221005, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-amber-200/50 dark:border-stone-700">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider">
                      Spiritual Helpline & WhatsApp
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                      +91 98765 43210 / +91 542 2345678
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-amber-200/50 dark:border-stone-700">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider">
                      Electronic Mail
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                      contact@sanatan.org / support@sanatan.org
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-amber-200/50 dark:border-stone-700">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider">
                      Service Timings
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                      Daily: 6:00 AM – 8:30 PM IST (Temple & Seva Hours)
                    </p>
                  </div>
                </div>
              </div>

              {/* Shloka Card on Seva */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-stone-800 border border-amber-200/60 dark:border-stone-700 text-center space-y-1">
                <p className="font-serif text-xs font-bold text-amber-900 dark:text-amber-300">
                  परोपकाराय वहन्ति नद्यः परोपकाराय दुहन्ति गावः।
                </p>
                <p className="text-[11px] text-stone-500 italic">
                  &quot;Rivers flow for the welfare of others, cows give milk for others, and this life is dedicated to noble service.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Send Us a Message
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Fill out the details below and an Acharya or support representative will reach out to you.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-emerald-900 dark:text-emerald-200">
                    Message Received with Gratitude!
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto leading-relaxed">
                    Thank you, {formState.name || 'devotee'}. Your inquiry regarding &quot;{formState.subject}&quot; has been recorded. Our team will get back to you shortly at {formState.email}.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Inquiry',
                        message: '',
                        subscribeUpdates: true,
                      });
                    }}
                    className="mt-3 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Full Name <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Aditya Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Email Address <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="aditya@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Mobile / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+91 98765 00000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Subject / Topic <span className="text-amber-600">*</span>
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-medium"
                      >
                        <option value="General Inquiry">General Platform Inquiry</option>
                        <option value="Scripture & Ritual Guidance">Scripture & Shloka Guidance</option>
                        <option value="Panchang & Muhurat">Panchang & Astrological Calculation</option>
                        <option value="Store Order Support">Store Order & Delivery</option>
                        <option value="Editorial Contribution">Volunteer or Editorial Contribution</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      Your Message or Query <span className="text-amber-600">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please write your questions, ritual requirements, or suggestions here..."
                      className="w-full p-3.5 rounded-xl border border-amber-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none font-sans"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="checkbox"
                      id="subscribe"
                      checked={formState.subscribeUpdates}
                      onChange={(e) =>
                        setFormState({ ...formState, subscribeUpdates: e.target.checked })
                      }
                      className="rounded border-amber-300 text-amber-600 focus:ring-amber-500 h-4 w-4"
                    />
                    <label htmlFor="subscribe" className="text-xs text-stone-600 dark:text-stone-400">
                      Receive weekly spiritual insights, festival notifications, and panchang updates.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions Section */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-stone-500">
              Quick answers regarding platform authenticity, ordering, and shastric support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 space-y-2 shadow-sm"
              >
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 font-serif flex items-start space-x-2">
                  <span className="text-amber-600 font-bold">Q.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pl-4">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
