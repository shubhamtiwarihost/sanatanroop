'use client';

import React, { useState } from 'react';
import {
  X,
  Download,
  Check,
  Copy,
  QrCode,
  Smartphone,
  Globe,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  FileText,
  Heart,
} from 'lucide-react';

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

export default function BookPayModal({ isOpen, onClose, book }: BookPayModalProps) {
  const [activeTab, setActiveTab] = useState<'qr' | 'upi' | 'international'>('qr');
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !book) return null;

  const upiId = 'sanatanroop@upi';
  const priceInr = 20;
  const priceUsd = 5;

  // Standard UPI intent URL for QR code & mobile direct launch
  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    'SanatanRoop Granth'
  )}&am=${priceInr}&cu=INR&tn=${encodeURIComponent(`${book.titleEn || book.titleHi} PDF Download`)}`;

  // High-res QR code image URL generated dynamically via public QR API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(
    upiPayUrl
  )}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerPdfDownload = () => {
    if (!book.pdfUrl) {
      alert('इस ग्रंथ की PDF फाइल वर्तमान में उपलब्ध नहीं है।');
      return;
    }

    setIsProcessing(true);

    // Record unlocked book in localStorage
    try {
      const unlocked = JSON.parse(localStorage.getItem('sanatan_unlocked_books') || '[]');
      if (!unlocked.includes(book.id)) {
        unlocked.push(book.id);
        localStorage.setItem('sanatan_unlocked_books', JSON.stringify(unlocked));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    setTimeout(() => {
      setIsProcessing(false);
      setDownloadSuccess(true);

      // Trigger file download
      const link = document.createElement('a');
      link.href = book.pdfUrl!;
      link.download = book.pdfFileName || `${book.titleEn || book.id}.pdf`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Close modal after download
      setTimeout(() => {
        setDownloadSuccess(false);
        onClose();
      }, 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1b120c] border border-[#c5a059]/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col text-stone-200 animate-scale-up">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#2c1a11] via-[#3d2417] to-[#2c1a11] px-5 py-4 border-b border-[#c5a059]/30 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-amber-100 leading-tight">
                ग्रंथ PDF डाउनलोड (Book Download)
              </h3>
              <p className="text-[11px] text-amber-300/80 font-serif">
                डिजिटल ग्रंथालय संरक्षण सेवा सहयोग
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-stone-700 hover:border-amber-500/50 text-stone-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Book Summary Bar */}
        <div className="bg-[#241710] px-5 py-3 border-b border-[#c5a059]/20 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-serif font-bold text-amber-200 text-sm truncate">
              {book.titleHi}
            </h4>
            <p className="text-[11px] text-stone-400 font-serif truncate">
              रचयिता: {book.author}
              {book.pdfFileSize && <span className="ml-2 font-mono text-[10px] text-stone-500">• {book.pdfFileSize}</span>}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-bold font-mono text-amber-300">
              ₹{priceInr} <span className="text-[11px] text-stone-400">/ ${priceUsd}</span>
            </div>
            <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
              एकमुश्त सेवा (One-time)
            </span>
          </div>
        </div>

        {/* Tabs: QR Code / UPI ID / International */}
        <div className="grid grid-cols-3 border-b border-[#c5a059]/20 text-xs font-serif font-bold text-center bg-[#170f0a]">
          <button
            onClick={() => setActiveTab('qr')}
            className={`py-2.5 px-2 flex items-center justify-center space-x-1 transition border-b-2 ${
              activeTab === 'qr'
                ? 'border-amber-500 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR कोड</span>
          </button>
          <button
            onClick={() => setActiveTab('upi')}
            className={`py-2.5 px-2 flex items-center justify-center space-x-1 transition border-b-2 ${
              activeTab === 'upi'
                ? 'border-amber-500 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>UPI ऐप्स</span>
          </button>
          <button
            onClick={() => setActiveTab('international')}
            className={`py-2.5 px-2 flex items-center justify-center space-x-1 transition border-b-2 ${
              activeTab === 'international'
                ? 'border-amber-500 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>International</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-5 space-y-4 max-h-[55vh] overflow-y-auto">
          {/* TAB 1: QR CODE */}
          {activeTab === 'qr' && (
            <div className="flex flex-col items-center space-y-3">
              <div className="relative p-2.5 bg-white rounded-2xl shadow-xl border-4 border-amber-600/60">
                <img
                  src={qrCodeUrl}
                  alt="UPI QR Code"
                  className="w-44 h-44 sm:w-48 sm:h-48 rounded-lg object-contain"
                />
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#2d1b12] text-amber-300 border border-amber-500/60 text-[10px] font-bold px-3 py-0.5 rounded-full shadow whitespace-nowrap">
                  ₹{priceInr} स्कैन करें
                </div>
              </div>

              <div className="text-center space-y-1 pt-1">
                <p className="text-xs font-serif text-amber-200 font-bold">
                  Google Pay • PhonePe • Paytm • BHIM
                </p>
                <p className="text-[11px] text-stone-400 font-serif">
                  किसी भी UPI ऐप से यह QR कोड स्कैन करके ₹{priceInr} का सहयोग भेजें।
                </p>
              </div>

              {/* Mobile Quick Intent Button */}
              <a
                href={upiPayUrl}
                className="sm:hidden w-full inline-flex items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition"
              >
                <Smartphone className="w-4 h-4" />
                <span>फोन में UPI ऐप खोलें (Pay ₹{priceInr})</span>
              </a>
            </div>
          )}

          {/* TAB 2: UPI ID & APPS */}
          {activeTab === 'upi' && (
            <div className="space-y-3">
              <div className="bg-[#241710] border border-[#c5a059]/30 rounded-2xl p-4 space-y-2.5">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold font-mono">
                  आधिकारिक UPI ID:
                </span>
                <div className="flex items-center justify-between bg-[#150d08] border border-amber-500/40 rounded-xl px-3 py-2">
                  <span className="font-mono text-sm font-bold text-amber-300 tracking-wide select-all">
                    {upiId}
                  </span>
                  <button
                    onClick={handleCopyUpi}
                    className="inline-flex items-center space-x-1 text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 px-2.5 py-1 rounded-lg border border-amber-500/30 transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">कॉपी हो गया!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>कॉपी करें</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Supported UPI Apps Badges */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-serif text-stone-400">समर्थित भुगतान माध्यम:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] font-serif font-bold text-stone-300">
                  <div className="p-2 rounded-xl bg-[#241710] border border-stone-800">
                    🟢 Google Pay
                  </div>
                  <div className="p-2 rounded-xl bg-[#241710] border border-stone-800">
                    🟣 PhonePe
                  </div>
                  <div className="p-2 rounded-xl bg-[#241710] border border-stone-800">
                    🔵 Paytm
                  </div>
                  <div className="p-2 rounded-xl bg-[#241710] border border-stone-800">
                    🇮🇳 BHIM / Cred
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 font-serif leading-relaxed">
                अपने UPI ऐप में यह ID दर्ज करें, राशि <strong className="text-amber-300 font-mono">₹{priceInr}</strong> प्रेषित करें, और नीचे डाउनलोड बटन दबाएं।
              </p>
            </div>
          )}

          {/* TAB 3: INTERNATIONAL ($5) */}
          {activeTab === 'international' && (
            <div className="space-y-3 text-center">
              <div className="bg-[#241710] border border-[#c5a059]/30 rounded-2xl p-4 space-y-2">
                <div className="text-2xl">🌐</div>
                <h4 className="font-serif font-bold text-sm text-amber-200">
                  International Devotees ($5 USD)
                </h4>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  Support the preservation and global digitization of Vedic and Sanatan scriptures with a modest $5 contribution.
                </p>
                <div className="inline-block bg-amber-500/15 border border-amber-500/40 text-amber-300 font-mono font-bold px-3 py-1 rounded-xl text-sm mt-1">
                  Amount: $5.00 USD
                </div>
              </div>

              <div className="bg-[#170f0a] border border-stone-800 rounded-xl p-3 text-[11px] text-stone-400 font-serif">
                Accepted globally via International Cards, PayPal, or Global UPI. If paying via international card/PayPal, proceed with payment and click download below.
              </div>
            </div>
          )}

          {/* Optional UTR / Reference ID Field */}
          <div className="pt-2 border-t border-[#c5a059]/20 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-serif text-stone-400">
              <label htmlFor="utr_input">UPI संदर्भ / UTR नंबर (वैकल्पिक):</label>
              <span className="text-[10px] text-stone-500">Optional</span>
            </div>
            <input
              id="utr_input"
              type="text"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              placeholder="उदा. 12-अंकों का UPI Transaction ID (वैकल्पिक)"
              className="w-full bg-[#120a06] border border-stone-700 focus:border-amber-500 rounded-xl px-3 py-2 text-xs font-mono text-amber-200 focus:outline-none"
            />
          </div>

          {/* Success Banner */}
          {downloadSuccess && (
            <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 p-3 rounded-2xl text-xs font-serif text-center space-y-1 animate-fade-in">
              <p className="font-bold flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>धन्यवाद! आपका ग्रंथ सफलतापूर्वक डाउनलोड हो रहा है।</span>
              </p>
              <p className="text-[10px] text-emerald-300/80">हर हर महादेव • जय श्री राम</p>
            </div>
          )}
        </div>

        {/* Modal Footer / Action CTA */}
        <div className="bg-[#170f0a] px-5 py-3.5 border-t border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-1.5 text-[11px] font-serif text-stone-400">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>सुरक्षित एवं प्रामाणिक सनातन ग्रंथ</span>
          </div>

          <button
            onClick={triggerPdfDownload}
            disabled={isProcessing}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs shadow-lg shadow-amber-600/30 transition transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                <span>तैयार किया जा रहा है...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>भुगतान सम्पन्न • PDF डाउनलोड करें</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
