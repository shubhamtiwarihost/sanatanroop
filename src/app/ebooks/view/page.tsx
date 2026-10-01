import ProductViewClient from './ProductViewClient';

// One viewer for every e-book; .htaccess serves it for /ebooks/<slug>/
export default function EbookProductPage() {
  return <ProductViewClient />;
}
