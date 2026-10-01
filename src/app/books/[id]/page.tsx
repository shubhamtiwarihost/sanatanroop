import type { Metadata } from 'next';
import { BOOKS_DATA } from '@/data/booksData';
import BookReaderClient from './BookReaderClient';

interface BookPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return BOOKS_DATA.map((book) => ({
    id: book.id,
  }));
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const book = BOOKS_DATA.find((b) => b.id === params.id);

  if (!book) {
    return {
      title: 'ग्रंथ उपलब्ध नहीं (Book Not Found) | SanatanRoop',
      description: 'अनुरोधित ग्रंथ उपलब्ध नहीं है।',
    };
  }

  return {
    title: `${book.titleHi} (${book.titleEn}) - डिजिटल ग्रंथालय | SanatanRoop`,
    description: book.shortSummary,
    alternates: {
      canonical: `https://sanatanroop.com/books/${params.id}/`,
    },
    openGraph: {
      title: `${book.titleHi} • डिजिटल ग्रंथालय | SanatanRoop`,
      description: book.shortSummary,
      url: `https://sanatanroop.com/books/${params.id}/`,
      siteName: 'SanatanRoop',
      images: [{ url: '/images/hero_shiva.jpg', width: 1200, height: 630 }],
      locale: 'hi_IN',
      type: 'book',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${book.titleHi} • SanatanRoop`,
      description: book.shortSummary,
      images: ['/images/hero_shiva.jpg'],
    },
  };
}

export default function BookPage({ params }: BookPageProps) {
  const book = BOOKS_DATA.find((b) => b.id === params.id);

  return (
    <>
      <BookReaderClient bookId={params.id} />
      {book && (
        <section className="bg-[#140e0b] text-stone-300 border-t border-[#c5a059]/20 px-4 sm:px-6 lg:px-8 py-12 font-serif">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-2xl font-bold text-amber-200">
              {book.titleHi} ({book.titleEn}) — परिचय
            </h2>
            <p className="text-xs text-stone-400">
              {book.categoryLabel} • {book.author} • {book.versesCount}
            </p>
            <p className="text-sm leading-relaxed">{book.shortSummary}</p>
            <p className="text-sm leading-relaxed">{book.fullOverview}</p>
            <div className="space-y-2 border-l-2 border-[#c5a059]/50 pl-4">
              <h3 className="text-sm font-bold text-amber-300">{book.sampleChapterTitle}</h3>
              <p lang="sa" className="text-base text-stone-100 whitespace-pre-line leading-relaxed">
                {book.sampleVerseSanskrit}
              </p>
              <p className="text-sm leading-relaxed">{book.sampleVerseHindi}</p>
              <p lang="en" className="text-sm text-stone-400 leading-relaxed">
                {book.sampleVerseEnglish}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}