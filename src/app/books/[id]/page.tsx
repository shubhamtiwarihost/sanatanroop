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
  return <BookReaderClient bookId={params.id} />;
}