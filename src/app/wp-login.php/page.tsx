'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WpLoginPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/wp-admin');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0f1]">
      <p className="text-stone-600 font-sans">Redirecting to WordPress Admin...</p>
    </div>
  );
}
