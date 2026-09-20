import { ALL_STORE_PRODUCTS } from '@/data/storeProducts';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return ALL_STORE_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
