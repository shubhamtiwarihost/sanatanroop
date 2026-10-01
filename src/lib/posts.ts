// Helpers for posts written in the admin editor (stored in the CMS, rendered client-side).
import { BLOG_POSTS } from '@/data/blogPosts';
import type { CMSArticleItem } from '@/context/CMSContext';

// Slugs that have a pre-built page under /articles/<slug>
const STATIC_ARTICLE_SLUGS = BLOG_POSTS.map((p) => p.slug);

export function postUrl(post: Pick<CMSArticleItem, 'slug' | 'content'>): string {
  // A rewritten built-in article keeps the viewer URL, since /articles/<slug>/ is its pre-built page
  if (STATIC_ARTICLE_SLUGS.includes(post.slug) && post.content) {
    return `/articles/post/?slug=${encodeURIComponent(post.slug)}`;
  }
  return `/articles/${post.slug}/`;
}

// Published posts that only exist in the CMS (or whose content was rewritten there)
export function customPublishedPosts(articles: CMSArticleItem[] | undefined): CMSArticleItem[] {
  return (articles || []).filter(
    (a) => a.status === 'Published' && (!!a.content || !STATIC_ARTICLE_SLUGS.includes(a.slug))
  );
}

export function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    // Drop punctuation; keep letters of any script (Hindi titles make Hindi slugs)
    .replace(/[!-,.\/:-@\[-`{-~।॥…“”‘’—–]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function plainTextToHtml(text: string): string {
  if (!text || text.includes('<')) return text || '';
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return text
    .split(/\n{2,}/)
    .map((p) => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

export function htmlToText(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

export function estimateReadingTime(html: string): string {
  const words = htmlToText(html).split(' ').filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : /^[A-Za-z0-9_-]{11}$/.test(url.trim()) ? url.trim() : null;
}

const ALLOWED_TAGS = new Set([
  'P', 'BR', 'H2', 'H3', 'H4', 'STRONG', 'B', 'EM', 'I', 'U', 'S', 'A', 'UL', 'OL', 'LI', 'BLOCKQUOTE',
  'IMG', 'FIGURE', 'FIGCAPTION', 'HR', 'DIV', 'SPAN', 'IFRAME', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD',
]);
const ALLOWED_ATTRS: Record<string, string[]> = {
  A: ['href', 'target', 'rel'],
  IMG: ['src', 'alt'],
  IFRAME: ['src', 'allowfullscreen', 'title'],
  BLOCKQUOTE: ['class'],
  DIV: ['class', 'style'],
  P: ['style'],
  H2: ['style'],
  H3: ['style'],
};
const ALLOWED_CLASSES = ['shloka', 'video'];
const SAFE_URL = /^(https?:\/\/|\/|mailto:|#|data:image\/(png|jpe?g|webp|gif);)/i;
const SAFE_IFRAME = /^https:\/\/www\.youtube(-nocookie)?\.com\/embed\/[A-Za-z0-9_-]{11}/;

// Browser-only allowlist sanitizer for editor output
export function sanitizePostHtml(html: string): string {
  if (typeof window === 'undefined' || !html) return '';
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstElementChild as HTMLElement;

  const clean = (node: Element) => {
    for (const child of Array.from(node.children)) {
      if (!ALLOWED_TAGS.has(child.tagName)) {
        if (['SCRIPT', 'STYLE', 'OBJECT', 'EMBED', 'FORM', 'INPUT', 'LINK', 'META'].includes(child.tagName)) {
          child.remove();
        } else {
          // Keep the text, drop the wrapper (e.g. <font>, <h1>, pasted markup)
          clean(child);
          child.replaceWith(...Array.from(child.childNodes));
        }
        continue;
      }
      const allowed = ALLOWED_ATTRS[child.tagName] || [];
      for (const attr of Array.from(child.attributes)) {
        const name = attr.name.toLowerCase();
        const value = attr.value.trim();
        let keep = allowed.includes(name);
        if (keep && (name === 'href' || (name === 'src' && child.tagName === 'IMG'))) keep = SAFE_URL.test(value);
        if (keep && name === 'src' && child.tagName === 'IFRAME') keep = SAFE_IFRAME.test(value);
        if (keep && name === 'class') keep = ALLOWED_CLASSES.includes(value);
        if (keep && name === 'style') keep = /^text-align:\s*(left|center|right|justify);?$/i.test(value);
        if (!keep) child.removeAttribute(attr.name);
      }
      if (child.tagName === 'A') child.setAttribute('rel', 'noopener noreferrer');
      if (child.tagName === 'IMG') child.setAttribute('loading', 'lazy');
      if (child.tagName === 'IFRAME' && !child.getAttribute('src')) {
        child.remove();
        continue;
      }
      clean(child);
    }
  };
  clean(root);
  return root.innerHTML;
}
