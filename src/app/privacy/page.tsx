'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Mail, MapPin } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 20, 2026';

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] text-stone-900 dark:text-stone-100 font-sans pb-24">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#2a170e] via-[#1c110b] to-[#120d0a] text-amber-50 pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-amber-900/40 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Legal & Data Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-amber-100">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-mono">
            Last Updated: {lastUpdated} • Sanatan Roop (sanatanroop.com)
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-amber-200/80 dark:border-stone-800 p-6 sm:p-12 shadow-xl space-y-10 leading-relaxed font-sans text-stone-700 dark:text-stone-300 text-sm sm:text-base">
          
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              1. Introduction & Consent
            </h2>
            <p>
              Welcome to <strong>Sanatan Roop</strong> (accessible at{' '}
              <Link href="https://sanatanroop.com" className="text-[#ea580c] font-semibold underline">
                https://sanatanroop.com
              </Link>
              ). Founded by <strong>Shubham Tiwari</strong>, Sanatan Roop is dedicated to providing authentic Vedic scriptures, mantras, panchang calculations, and spiritual articles.
            </p>
            <p>
              Your privacy is of paramount importance to us. This Privacy Policy document outlines the types of personal information that is received and collected by Sanatan Roop and how it is used. By accessing or using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </section>

          {/* Log Files */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              2. Log Files
            </h2>
            <p>
              Like almost all standard web servers, Sanatan Roop makes use of log files. The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and the number of clicks to analyze trends, administer the site, track user&apos;s movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.
            </p>
          </section>

          {/* Cookies & Web Beacons */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              3. Cookies and Web Beacons
            </h2>
            <p>
              Sanatan Roop uses cookies to store information about visitors&apos; preferences, to record user-specific information on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon visitors&apos; browser type or other information that the visitor sends via their browser.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. More detailed information about cookie management with specific web browsers can be found at the browsers&apos; respective websites.
            </p>
          </section>

          {/* Google DoubleClick DART Cookie & Google AdSense Policy (Mandatory for AdSense) */}
          <section className="space-y-4 p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950 dark:text-amber-100 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#ea580c]" />
              <span>4. Google DoubleClick DART Cookie & Google AdSense</span>
            </h2>
            <p className="text-stone-800 dark:text-stone-200">
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <strong>sanatanroop.com</strong> and other sites on the internet.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-stone-800 dark:text-stone-200 text-sm">
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
              </li>
              <li>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ea580c] font-semibold underline"
                >
                  Google Ads Settings
                </a>
                . Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ea580c] font-semibold underline"
                >
                  aboutads.info
                </a>
                .
              </li>
            </ul>
          </section>

          {/* Advertising Partners Privacy Policies */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              5. Advertising Partners & Third-Party Privacy Policies
            </h2>
            <p>
              Some of our advertising partners may use cookies and web beacons on our site. Third-party ad servers or ad networks use technology in their respective advertisements and links that appear on Sanatan Roop, which are sent directly to your browser. They automatically receive your IP address when this occurs. Other technologies (such as cookies, JavaScript, or Web Beacons) may also be used by our site&apos;s third-party ad networks to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on the site.
            </p>
            <p>
              Sanatan Roop has no access to or control over these cookies that are used by third-party advertisers. We advise you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
            </p>
          </section>

          {/* CCPA Privacy Rights */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              6. CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h2>
            <p>
              Under the California Consumer Privacy Act (CCPA), among other rights, California consumers have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>Request that a business disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
              <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
              <li>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data.</li>
            </ul>
            <p className="text-xs text-stone-500">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
            </p>
          </section>

          {/* GDPR Data Protection Rights */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              7. GDPR Data Protection Rights
            </h2>
            <p>
              We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or incomplete.</li>
              <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data under certain conditions.</li>
              <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</li>
            </ul>
          </section>

          {/* Children's Information (COPPA) */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 border-b border-amber-100 dark:border-stone-800 pb-2">
              8. Children&apos;s Information (COPPA Compliance)
            </h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              Sanatan Roop does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </section>

          {/* Contact Information & Data Controller */}
          <section className="space-y-4 p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
            <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              9. Contact Us Regarding Privacy
            </h2>
            <p className="text-sm">
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact our Data Controller and Founder:
            </p>
            <div className="space-y-1.5 text-sm font-mono text-stone-800 dark:text-stone-200 pt-1">
              <p><strong>Founder:</strong> Shubham Tiwari</p>
              <p><strong>Website:</strong> https://sanatanroop.com</p>
              <p><strong>Email:</strong> contact@sanatanroop.com / shubhamtiwarihost@gmail.com</p>
              <p><strong>Location:</strong> Varanasi, Uttar Pradesh, Bharat (India)</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
