import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blogPosts';
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

// Same posts are published under /articles/<slug>; point search engines there
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  return {
    title: post?.title,
    alternates: { canonical: `https://sanatanroop.com/articles/${params.slug}` },
  };
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
