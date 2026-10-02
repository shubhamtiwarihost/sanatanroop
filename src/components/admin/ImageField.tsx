'use client';

import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadFile } from '@/lib/cmsSync';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

interface ImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

// Image picker for admin forms: upload from the computer or paste a URL
export default function ImageField({ value, onChange, label = 'चित्र (Image)' }: ImageFieldProps) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('कृपया केवल चित्र (JPG, PNG, WebP, GIF) चुनें।');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError('चित्र 5 MB से छोटा होना चाहिए।');
      return;
    }
    setBusy(true);
    const url = await uploadFile(file);
    setBusy(false);
    if (url) onChange(url);
    else setError('अपलोड नहीं हो सका। कृपया दोबारा लॉगिन करके प्रयास करें या नीचे चित्र का URL डालें।');
  };

  return (
    <div>
      <label className="block font-bold text-stone-800 mb-1">{label}</label>
      <div className="flex items-start gap-3">
        {value && (
          <div className="relative flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="w-24 h-24 object-cover rounded border border-[#dcdcde] bg-stone-100" />
            <button
              type="button"
              onClick={() => onChange('')}
              title="चित्र हटाएँ (Remove image)"
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        <div className="flex-1 space-y-1.5">
          <button
            type="button"
            disabled={busy}
            onClick={() => input.current?.click()}
            className="inline-flex items-center gap-1.5 border border-[#2271b1] text-[#2271b1] hover:bg-stone-100 px-3 py-1.5 rounded font-semibold disabled:opacity-60"
          >
            <Upload className="w-3.5 h-3.5" />
            {busy ? 'अपलोड हो रहा है…' : value ? 'चित्र बदलें (Change image)' : 'चित्र अपलोड करें (Upload image)'}
          </button>
          <input ref={input} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="या चित्र का URL यहाँ डालें (or paste an image URL)"
            className="w-full border border-[#8c8f94] rounded px-3 py-1.5 font-mono focus:border-[#2271b1] focus:outline-none"
          />
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
