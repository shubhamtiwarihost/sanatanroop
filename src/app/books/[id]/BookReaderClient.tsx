'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import { BOOKS_DATA, BookItem } from '@/data/booksData';
import { BookOpen, ChevronLeft, FileText, Sparkles } from 'lucide-react';

// Dynamically import BookReader with SSR disabled to prevent Node/canvas issues during static export
const BookReader = dynamic(() => import('@/components/BookReader'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 bg-[#120d0a] flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#c5a059]/20" />
        <div className="absolute inset-0 rounded-full border-4 border-[#FF9933] border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-xl animate-pulse">
          🕉️
        </div>
      </div>
      <p className="text-amber-200 font-serif text-sm">डिजिटल ग्रंथालय प्रारंभ हो रहा है...</p>
    </div>
  ),
});

interface BookReaderClientProps {
  bookId: string;
}

export default function BookReaderClient({ bookId }: BookReaderClientProps) {
  const router = useRouter();
  const { books: cmsBooks } = useCMS();

  // Find book in CMS or fallback to static BOOKS_DATA
  const cmsBook = cmsBooks?.find((b) => b.id === bookId);
  const staticBook = BOOKS_DATA.find((b) => b.id === bookId);

  const book = cmsBook
    ? {
        id: cmsBook.id,
        titleHi: cmsBook.titleHi,
        titleEn: cmsBook.titleEn,
        author: cmsBook.author,
        description: cmsBook.shortSummary,
        pdfUrl: cmsBook.pdfUrl || staticBook?.pdfUrl || '',
        pdfFileName: cmsBook.pdfFileName || staticBook?.pdfFileName,
        pdfFileSize: cmsBook.pdfFileSize || staticBook?.pdfFileSize,
        categoryLabel: cmsBook.categoryLabel || staticBook?.categoryLabel,
        versesCount: cmsBook.versesCount || staticBook?.versesCount,
        readOnlineUrl: cmsBook.readOnlineUrl || staticBook?.readOnlineUrl,
      }
    : staticBook
    ? {
        id: staticBook.id,
        titleHi: staticBook.titleHi,
        titleEn: staticBook.titleEn,
        author: staticBook.author,
        description: staticBook.shortSummary,
        pdfUrl: staticBook.pdfUrl || '',
        pdfFileName: staticBook.pdfFileName,
        pdfFileSize: staticBook.pdfFileSize,
        categoryLabel: staticBook.categoryLabel,
        versesCount: staticBook.versesCount,
        readOnlineUrl: staticBook.readOnlineUrl,
      }
    : null;

  // If book not found statically, redirect to /books?read=bookId to allow CMS localStorage resolution
  React.useEffect(() => {
    if (!book && typeof window !== 'undefined') {
      router.replace(`/books?read=${bookId}`);
    }
  }, [book, bookId, router]);

  // Book not found
  if (!book) {
    return (
      <div className="min-h-screen bg-[#140e0b] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl mb-4">
          📖
        </div>
        <h1 className="text-2xl font-serif font-bold text-amber-200 mb-2">ग्रंथ प्राप्त नहीं हुआ</h1>
        <p className="text-stone-400 font-serif text-sm max-w-md mb-6">
          यह ग्रंथ हमारे अभिलेखागार में उपलब्ध नहीं है अथवा इसका लिंक परिवर्तित हो गया है।
        </p>
        <Link
          href="/books"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold px-6 py-3 rounded-2xl shadow-lg transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>सनातन ग्रंथालय पर लौटें</span>
        </Link>
      </div>
    );
  }

  // Book exists but has no PDF attached yet
  if (!book.pdfUrl) {
    return (
      <div className="min-h-screen bg-[#140e0b] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl mb-4">
          🕉️
        </div>
        <h1 className="text-2xl font-serif font-bold text-amber-200 mb-1">{book.titleHi}</h1>
        <p className="text-xs text-stone-400 font-mono mb-4">{book.titleEn}</p>
        
        <div className="bg-[#211611] border border-[#c5a059]/30 rounded-3xl p-6 max-w-lg mb-6 shadow-2xl">
          <p className="text-stone-300 font-serif text-sm leading-relaxed mb-4">
            इस ग्रंथ की मूल हस्तलिखित / पाण्डुलिपि PDF शीघ्र ही डिजिटल रूप में जोड़ी जा रही है।
            तब तक आप इसका सम्पूर्ण श्लोक पाठ, हिंदी भावार्थ एवं व्याख्या ऑनलाइन पढ़ सकते हैं।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={book.readOnlineUrl || `/scriptures/${book.id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold px-5 py-2.5 rounded-xl shadow-lg transition text-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>सम्पूर्ण श्लोक पाठ पढ़ें</span>
            </Link>

            <Link
              href="/books"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 border border-[#c5a059]/40 bg-[#2b1e17] text-amber-200 hover:text-white px-5 py-2.5 rounded-xl text-xs font-serif transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>ग्रंथ सूची देखें</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render the dedicated digital BookReader
  const bookInfo = {
    id: book.id,
    titleHi: book.titleHi,
    titleEn: book.titleEn,
    author: book.author,
    description: book.description,
    pdfUrl: book.pdfUrl,
    pdfFileName: book.pdfFileName,
    pdfFileSize: book.pdfFileSize,
    categoryLabel: book.categoryLabel,
    versesCount: book.versesCount,
  };

  return <BookReader book={bookInfo} onClose={() => router.push('/books')} />;
}
