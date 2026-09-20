'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] dark:bg-[#121216] px-4">
      <div className="text-center space-y-4 max-w-md p-8 bg-white dark:bg-[#1a1411] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl">
        <span className="text-4xl block">🕉️</span>
        <h2 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-200">
          SanatanRoop
        </h2>
        <p className="text-sm text-stone-500 font-serif">
          मुख्य पृष्ठ पर पुनर्निर्देशित किया जा रहा है...
        </p>
      </div>
    </div>
  );
}
