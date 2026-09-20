'use client';

import React from 'react';
import Link from 'next/link';
import { Scale, FileCheck, AlertCircle, Shield, CheckCircle2, Mail } from 'lucide-react';

export default function TermsPage() {
  const lastUpdated = 'September 20, 2026';

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] text-stone-900 dark:text-stone-100 font-sans pb-24">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#2a170e] via-[#1c110b] to-[#120d0a] text-amber-50 pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-amber-900/40 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-amber-100">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-mono">
            Last Updated: {lastUpdated} • Sanatan Roop (sanatanroop.com)
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-amber-200/80 dark:border-stone-800 p-6 sm:p-12 shadow-xl space-y-10 leading-relaxed font-sans text-stone-700 dark:text-stone-300 text-sm sm:text-base">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              1. Agreement to Terms
            </h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you and <strong>Sanatan Roop</strong> (accessible at{' '}
              <Link href="https://sanatanroop.com" className="text-[#ea580c] font-semibold underline">
                https://sanatanroop.com
              </Link>
              ), founded by <strong>Shubham Tiwari</strong>, concerning your access to and use of the website and related services.
            </p>
            <p>
              By accessing the Site, you confirm that you have read, understood, and agreed to be bound by all of these Terms of Service. If you do not agree with all of these terms, you are expressly prohibited from using the Site and must discontinue use immediately.
            </p>
          </section>

          {/* Section 2: Intellectual Property */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              2. Intellectual Property Rights & Shastric Heritage
            </h2>
            <p>
              The ancient Vedic texts, canonical Upanishads, Bhagavad Gita, and Sanskrit shlokas presented on Sanatan Roop belong to the eternal heritage of humanity (Public Domain).
            </p>
            <p>
              However, the proprietary compilations, digital transcriptions, modern commentary, UI designs, graphics, audio recordings, software code, and logo of Sanatan Roop are owned by or licensed to <strong>Shubham Tiwari</strong> and Sanatan Roop, protected by copyright and intellectual property laws. You may read, share, and study the content for non-commercial personal spiritual use with proper attribution.
            </p>
          </section>

          {/* Section 3: User Conduct */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              3. User Conduct & Acceptable Use
            </h2>
            <p>When interacting with our community, discussion forums, or contact forms, you agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>Post or transmit any content that is profane, hateful, defamatory, or derogatory toward any religious tradition or community.</li>
              <li>Attempt to bypass or tamper with any security-related features of the platform.</li>
              <li>Use any automated scripts, scrapers, or bots to harvest data from the website without prior written permission.</li>
              <li>Impersonate any individual, acharya, scholar, or representative of Sanatan Roop.</li>
            </ul>
          </section>

          {/* Section 4: Spiritual & Astronomical Disclaimer */}
          <section className="space-y-4 p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950 dark:text-amber-100 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-[#ea580c]" />
              <span>4. Spiritual, Astrological & Panchang Disclaimer</span>
            </h2>
            <p className="text-stone-800 dark:text-stone-200 text-sm">
              The information provided on Sanatan Roop, including Panchang calculations, Muhurats, festival dates, and shloka explanations, is published for cultural, religious, and spiritual educational purposes. While we employ rigorous astronomical calculations based on Surya Siddhanta, local geographical variations may occur. Seekers are advised to consult their local acharyas or pandits for specialized individual rituals (samskaras).
            </p>
          </section>

          {/* Section 5: Third-Party Advertising & Links */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              5. Third-Party Advertisements & External Links
            </h2>
            <p>
              Sanatan Roop displays advertisements served by third-party advertising networks, including Google AdSense. We do not endorse or assume responsibility for any products, services, or claims advertised by third parties. Your interactions with advertisers found on or through the site are solely between you and such third parties.
            </p>
          </section>

          {/* Section 6: Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              6. Limitation of Liability
            </h2>
            <p>
              In no event will Sanatan Roop, its founder <strong>Shubham Tiwari</strong>, or its editors and contributors be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the website or inability to access the platform.
            </p>
          </section>

          {/* Section 7: Governing Law */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of India, with jurisdiction in the courts of Uttar Pradesh, India, without regard to its conflict of law principles.
            </p>
          </section>

          {/* Section 8: Contact Information */}
          <section className="space-y-4 p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
            <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              8. Contact Us
            </h2>
            <p className="text-sm">
              For any questions regarding these Terms of Service, please contact:
            </p>
            <div className="space-y-1.5 text-sm font-mono text-stone-800 dark:text-stone-200 pt-1">
              <p><strong>Founder:</strong> Shubham Tiwari</p>
              <p><strong>Platform:</strong> Sanatan Roop (sanatanroop.com)</p>
              <p><strong>Email:</strong> contact@sanatanroop.com / shubhamtiwarihost@gmail.com</p>
              <p><strong>Address:</strong> Varanasi, Uttar Pradesh, Bharat (India)</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
