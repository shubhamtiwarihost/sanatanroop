'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft, Share2, Check, User } from 'lucide-react';
import PostShare from '@/components/PostShare';
import { useCMS } from '@/context/CMSContext';
import { useAuth } from '@/context/AuthContext';
import { ADMIN_ROLES } from '@/lib/adminAuth';
import { plainTextToHtml, postUrl, sanitizePostHtml } from '@/lib/posts';

export default function PostViewClient() {
  const { articles, cmsReady } = useCMS();
  const { user } = useAuth();
  const [slug, setSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // /articles/<slug>/ is served by this viewer for admin-written posts; ?slug= is the older link form
    const fromQuery = new URLSearchParams(window.location.search).get('slug');
    const fromPath = window.location.pathname.match(/^\/(?:articles|blog)\/([^/]+)\/?$/);
    setSlug(fromQuery || (fromPath && fromPath[1] !== 'post' ? decodeURIComponent(fromPath[1]) : ''));
  }, []);

  const isAdmin = !!user && ADMIN_ROLES.includes(user.role);
  const post = useMemo(
    () => articles.find((a) => a.slug === slug && (a.status === 'Published' || isAdmin)),
    [articles, slug, isAdmin]
  );
  const html = useMemo(() => (post ? sanitizePostHtml(plainTextToHtml(post.content || '')) : ''), [post]);

  // Search engines that run JavaScript pick these up for the rendered post
  useEffect(() => {
    if (!post) return;
    document.title = `${post.seoTitle || post.title} | SanatanRoop`;
    const description = post.seoDescription || post.excerpt;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://sanatanroop.com${encodeURI(postUrl(post))}`);
  }, [post]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    const loading = slug === null || !cmsReady;
    return (
      <div className="min-h-[70vh] bg-[#faf8f5] dark:bg-[#120d0a] flex flex-col items-center justify-center text-center px-4 space-y-4 font-serif">
        <span className="text-4xl">🕉️</span>
        <h1 className="text-xl font-bold text-stone-800 dark:text-stone-200">
          {loading ? 'लेख लोड हो रहा है…' : 'लेख उपलब्ध नहीं है (Article not found)'}
        </h1>
        {!loading && (
          <Link href="/articles" className="text-sm font-semibold text-[#c2410c] hover:underline">
            सभी लेख देखें →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] text-stone-900 dark:text-stone-100 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <Link
          href="/articles"
          className="inline-flex items-center space-x-1 text-xs font-semibold text-stone-500 hover:text-[#ea580c] transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-[#1a1411] border border-stone-200/90 dark:border-stone-800 rounded-3xl overflow-hidden shadow-sm">
          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt={post.title} className="w-full max-h-[420px] object-cover" />
          )}

          <div className="p-6 sm:p-10 space-y-6">
            {post.status !== 'Published' && (
              <p className="px-3 py-2 rounded-lg bg-amber-100 text-amber-900 text-xs font-semibold">
                Draft preview — only visible to you while logged in as admin.
              </p>
            )}
            <div className="space-y-3">
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-950/50 text-[#ea580c] text-xs font-bold rounded-md">
                {post.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold leading-[1.45] sm:leading-[1.4]">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {post.publishedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {post.readingTime}
                </span>
                <button onClick={handleShare} className="flex items-center gap-1 hover:text-[#ea580c] transition">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copied ? 'Link copied' : 'Share'}
                </button>
              </div>
            </div>

            <div className="post-content font-serif" dangerouslySetInnerHTML={{ __html: html }} />

            {!!post.tags?.length && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-200 dark:border-stone-800">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-xs text-stone-600 dark:text-stone-300">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <PostShare title={post.title} />
          </div>
        </div>
      </article>
    </div>
  );
}
