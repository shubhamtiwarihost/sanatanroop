import BlogDetailClient from './BlogDetailClient';

export function generateStaticParams() {
  return [
    { slug: 'benefits-of-daily-mantra-meditation' },
    { slug: 'significance-of-ekadashi-vrat' },
    { slug: 'life-lessons-from-bhagavad-gita' },
    { slug: 'four-purusharthas' },
    { slug: 'ganesha-chaturthi-significance' },
    { slug: 'sharad-navratri-vidhi' },
    { slug: 'rudraksha-spiritual-benefits' },
    { slug: 'daily-sandhyavandanam-guide' },
    { slug: 'hanuman-chalisa-spiritual-power' },
  ];
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
