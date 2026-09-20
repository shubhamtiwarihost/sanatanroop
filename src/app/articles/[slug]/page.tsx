import ArticleDetailClient from './ArticleDetailClient';

export function generateStaticParams() {
  return [
    { slug: 'four-purusharthas' },
    { slug: 'benefits-of-daily-mantra-meditation' },
    { slug: 'significance-of-ekadashi-vrat' },
    { slug: 'life-lessons-from-bhagavad-gita' },
  ];
}

export default function ArticleDetailPage() {
  return <ArticleDetailClient />;
}
