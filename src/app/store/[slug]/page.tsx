import type { Metadata } from 'next';
import { ALL_STORE_PRODUCTS } from '@/data/storeProducts';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return ALL_STORE_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = ALL_STORE_PRODUCTS.find((p) => p.slug === params.slug);
  return {
    title: product ? `${product.titleHi ? product.titleHi + ' — ' : ''}${product.title}` : undefined,
    alternates: { canonical: `https://sanatanroop.com/store/${params.slug}` },
  };
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
