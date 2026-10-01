'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle, Facebook, Twitter, Send, Linkedin, Mail, Link2, Check, Pin } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';

interface PostShareProps {
  title: string;
}

// wa.me needs the number with country code and digits only; a bare 10-digit number is treated as Indian
function whatsappNumber(raw: string): string {
  const digits = (raw || '').replace(/\D/g, '');
  return digits.length === 10 ? `91${digits}` : digits;
}

export default function PostShare({ title }: PostShareProps) {
  const { siteIdentity } = useCMS();
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const networks = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}`, Icon: MessageCircle, color: 'bg-[#25D366] hover:bg-[#1ebe5b]' },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: Facebook, color: 'bg-[#1877F2] hover:bg-[#1466d6]' },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${t}&url=${u}`, Icon: Twitter, color: 'bg-black hover:bg-stone-800' },
    { label: 'Telegram', href: `https://t.me/share/url?url=${u}&text=${t}`, Icon: Send, color: 'bg-[#229ED9] hover:bg-[#1c8bc0]' },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: Linkedin, color: 'bg-[#0A66C2] hover:bg-[#0957a6]' },
    { label: 'Pinterest', href: `https://pinterest.com/pin/create/button/?url=${u}&description=${t}`, Icon: Pin, color: 'bg-[#E60023] hover:bg-[#c7001e]' },
    { label: 'Email', href: `mailto:?subject=${t}&body=${t}%0A${u}`, Icon: Mail, color: 'bg-stone-600 hover:bg-stone-700' },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chatNumber = whatsappNumber(siteIdentity?.contactPhone);

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `${name.trim() ? `नमस्ते, मैं ${name.trim()} हूँ।\n` : ''}${message.trim()}\n\n— ${title}\n${url}`;
    window.open(`https://wa.me/${chatNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  return (
    <section className="space-y-6 pt-6 border-t border-stone-200 dark:border-stone-800">
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200">इस लेख को साझा करें (Share this article)</h3>
        <div className="flex flex-wrap gap-2">
          {networks.map(({ label, href, Icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${label}`}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-white text-xs font-semibold transition ${color}`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </a>
          ))}
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-semibold transition"
          >
            {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            <span>{copied ? 'Link copied' : 'Copy link'}</span>
          </button>
        </div>
      </div>

      {chatNumber && (
        <form
          onSubmit={sendWhatsApp}
          className="rounded-2xl border border-[#25D366]/40 bg-[#25D366]/5 p-4 sm:p-5 space-y-3"
        >
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">WhatsApp पर हमसे बात करें</h3>
              <p className="text-xs text-stone-500">अपना प्रश्न या संदेश लिखें — यह सीधे हमारे WhatsApp पर पहुँचेगा।</p>
            </div>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="आपका नाम (Your name)"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
          />
          <textarea
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="अपना संदेश लिखें (Type your message)…"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] text-white text-sm font-bold transition"
          >
            <Send className="w-4 h-4" />
            <span>WhatsApp पर भेजें</span>
          </button>
        </form>
      )}
    </section>
  );
}
