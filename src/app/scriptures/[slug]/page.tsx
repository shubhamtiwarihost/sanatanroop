import { Suspense } from 'react';
import ScriptureReaderClient from './ScriptureReaderClient';

export function generateStaticParams() {
  return [
    { slug: 'bhagavad-gita' },
    { slug: 'isha-upanishad' },
    { slug: 'mandukya-upanishad' },
    { slug: 'rigveda-samhita' },
  ];
}

export default function ScriptureReaderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f5] p-8 text-center font-serif text-stone-600">Loading Scripture...</div>}>
      <ScriptureReaderClient />
    </Suspense>
  );
}
