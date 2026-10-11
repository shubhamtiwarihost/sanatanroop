'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Youtube,
  Minus,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RemoveFormatting,
  Table,
  Upload,
  ExternalLink,
} from 'lucide-react';
import { uploadFile } from '@/lib/cmsSync';
import {
  estimateReadingTime,
  htmlToText,
  plainTextToHtml,
  postUrl,
  sanitizePostHtml,
  postSlug,
  youtubeId,
} from '@/lib/posts';

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  readingTime: string;
  image: string;
  status: 'Published' | 'Draft' | 'Scheduled';
  content: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

interface PostEditorProps {
  initial: PostFormData;
  isEditing: boolean;
  onSave: (post: PostFormData) => void;
  onClose: () => void;
}

const CATEGORIES = [
  ['Philosophy', 'Philosophy (दर्शन)'],
  ['Rituals', 'Rituals (कर्मकाण्ड)'],
  ['Meditation', 'Meditation (ध्यान)'],
  ['Festivals', 'Festivals (पर्व एवं उत्सव)'],
  ['Vrat & Upwas', 'Vrat & Upwas (व्रत एवं उपवास)'],
  ['Veda', 'Vedic Shastras (वेद व उपनिषद्)'],
  ['Spirituality', 'Spirituality (अध्यात्म)'],
  ['Lifestyle', 'Lifestyle (जीवनशैली)'],
];

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Uploads to the server; without it (local dev) embeds the image in the post
async function fileToUrl(file: File): Promise<string> {
  const uploaded = await uploadFile(file);
  if (uploaded) return uploaded;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ToolButton({ title, onClick, children }: { title: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      // Keep the text selection in the editor when a toolbar button is pressed
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="h-8 min-w-8 px-1.5 flex items-center justify-center gap-1 border border-[#c3c4c7] rounded bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-6 bg-stone-300 mx-0.5" />;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#c3c4c7] rounded">
      <h4 className="px-3 py-2 border-b border-[#dcdcde] font-bold text-[#1d2327] text-xs">{title}</h4>
      <div className="p-3 space-y-2">{children}</div>
    </div>
  );
}

export default function PostEditor({ initial, isEditing, onSave, onClose }: PostEditorProps) {
  const [form, setForm] = useState<PostFormData>(initial);
  const [mode, setMode] = useState<'visual' | 'html'>('visual');
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [tagInput, setTagInput] = useState('');
  const [busy, setBusy] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);
  const inlineImageInput = useRef<HTMLInputElement>(null);
  const featuredImageInput = useRef<HTMLInputElement>(null);

  const set = (patch: Partial<PostFormData>) => setForm((prev) => ({ ...prev, ...patch }));

  // The editable area owns its DOM; load content into it when it (re)appears
  useEffect(() => {
    if (mode === 'visual' && editorRef.current) {
      document.execCommand('defaultParagraphSeparator', false, 'p');
      editorRef.current.innerHTML = plainTextToHtml(form.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const syncContent = () => {
    if (editorRef.current) set({ content: editorRef.current.innerHTML });
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    const sel = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    if (savedRange.current) {
      sel.addRange(savedRange.current);
    } else {
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
      sel.addRange(range);
    }
  };

  const exec = (command: string, value?: string) => {
    restoreSelection();
    document.execCommand(command, false, value);
    saveSelection();
    syncContent();
  };

  const insertHtml = (html: string) => exec('insertHTML', html);

  const handleLink = () => {
    saveSelection();
    const url = window.prompt('Link URL (https://...)');
    if (!url) return;
    const selected = savedRange.current?.toString();
    if (selected) exec('createLink', url);
    else insertHtml(`<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>`);
  };

  const handleImageUrl = () => {
    saveSelection();
    const url = window.prompt('Image URL (https://...)');
    if (!url) return;
    const alt = window.prompt('Image description (alt text)') || '';
    insertHtml(`<img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}"><p><br></p>`);
  };

  const handleInlineImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    try {
      const url = await fileToUrl(file);
      const alt = file.name.replace(/\.[^.]+$/, '');
      insertHtml(`<img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}"><p><br></p>`);
    } catch {
      alert('Image could not be loaded.');
    }
    setBusy(false);
  };

  const handleFeaturedImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    try {
      set({ image: await fileToUrl(file) });
    } catch {
      alert('Image could not be loaded.');
    }
    setBusy(false);
  };

  const handleVideo = () => {
    saveSelection();
    const url = window.prompt('YouTube video link');
    if (!url) return;
    const id = youtubeId(url);
    if (!id) {
      alert('Could not read a YouTube video ID from that link.');
      return;
    }
    insertHtml(
      `<div class="video"><iframe src="https://www.youtube.com/embed/${id}" title="YouTube video" allowfullscreen></iframe></div><p><br></p>`
    );
  };

  const handleShloka = () => {
    saveSelection();
    const selected = savedRange.current?.toString();
    insertHtml(
      `<blockquote class="shloka">${escapeHtml(selected || 'यहाँ श्लोक / मन्त्र लिखें')}</blockquote><p><br></p>`
    );
  };

  const handleTable = () => {
    saveSelection();
    insertHtml(
      '<table><thead><tr><th>शीर्षक 1</th><th>शीर्षक 2</th></tr></thead><tbody><tr><td>—</td><td>—</td></tr><tr><td>—</td><td>—</td></tr></tbody></table><p><br></p>'
    );
  };

  const addTag = () => {
    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t && !form.tags.includes(t));
    if (tags.length) set({ tags: [...form.tags, ...tags] });
    setTagInput('');
  };

  const handleSave = (status: PostFormData['status']) => {
    if (!form.title.trim()) {
      alert('Please provide a title for the post.');
      return;
    }
    const content = sanitizePostHtml(mode === 'visual' && editorRef.current ? editorRef.current.innerHTML : form.content);
    const text = htmlToText(content);
    onSave({
      ...form,
      status,
      content,
      slug: postSlug(form.slug || form.title) || 'post',
      excerpt: form.excerpt.trim() || text.slice(0, 180),
      readingTime: estimateReadingTime(content),
    });
  };

  const wordCount = htmlToText(form.content).split(' ').filter(Boolean).length;
  const slugPreview = postSlug(form.slug || form.title) || 'post-title';

  const inputClass =
    'w-full border border-[#8c8f94] rounded px-2.5 py-1.5 text-xs bg-white focus:border-[#2271b1] focus:outline-none';

  return (
    <div className="fixed inset-0 z-[60] bg-[#f0f0f1] flex flex-col text-[13px] text-[#2c3338] font-sans">
      {/* Top bar */}
      <div className="h-12 shrink-0 bg-white border-b border-[#c3c4c7] flex items-center justify-between px-4">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onClose} title="Close editor" className="text-stone-500 hover:text-stone-900">
            <X className="w-5 h-5" />
          </button>
          <h3 className="font-bold text-[#1d2327] text-sm truncate">{isEditing ? 'Edit Post' : 'Add New Post'}</h3>
          {busy && <span className="text-xs text-amber-700">Uploading…</span>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave('Draft')}
            className="border border-[#2271b1] text-[#2271b1] hover:bg-stone-100 px-3 py-1.5 rounded font-semibold text-xs"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('Published')}
            className="bg-[#2271b1] hover:bg-[#135e96] text-white px-4 py-1.5 rounded font-semibold text-xs"
          >
            {isEditing && initial.status === 'Published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-4">
          {/* Main column */}
          <div className="space-y-3 min-w-0">
            <input
              type="text"
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                set(slugTouched ? { title } : { title, slug: postSlug(title) });
              }}
              placeholder="Add title"
              className="w-full text-xl font-semibold border border-[#8c8f94] rounded px-3 py-2.5 bg-white focus:border-[#2271b1] focus:outline-none"
            />

            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500">
              <span>Permalink: https://sanatanroop.com/articles/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set({ slug: e.target.value });
                }}
                placeholder={slugPreview}
                className="border border-[#8c8f94] rounded px-2 py-0.5 text-[11px] bg-white min-w-[220px] focus:border-[#2271b1] focus:outline-none"
              />
            </div>

            <div className="border border-[#c3c4c7] rounded bg-white">
              {/* Toolbar */}
              <div className="sticky top-0 z-10 bg-[#f6f7f7] border-b border-[#c3c4c7] p-2 flex flex-wrap gap-1 items-center rounded-t">
                {mode === 'visual' && (
                  <>
                    <select
                      title="Text style"
                      defaultValue=""
                      onChange={(e) => {
                        if (e.target.value) exec('formatBlock', e.target.value);
                        e.target.value = '';
                      }}
                      onMouseDown={saveSelection}
                      className="h-8 border border-[#c3c4c7] rounded bg-white text-xs px-1.5"
                    >
                      <option value="" disabled>
                        Style
                      </option>
                      <option value="P">Paragraph</option>
                      <option value="H2">Heading 2</option>
                      <option value="H3">Heading 3</option>
                      <option value="H4">Heading 4</option>
                    </select>
                    <Divider />
                    <ToolButton title="Bold" onClick={() => exec('bold')}>
                      <Bold className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Italic" onClick={() => exec('italic')}>
                      <Italic className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Underline" onClick={() => exec('underline')}>
                      <Underline className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Strikethrough" onClick={() => exec('strikeThrough')}>
                      <Strikethrough className="w-4 h-4" />
                    </ToolButton>
                    <Divider />
                    <ToolButton title="Bullet list" onClick={() => exec('insertUnorderedList')}>
                      <List className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Numbered list" onClick={() => exec('insertOrderedList')}>
                      <ListOrdered className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Quote" onClick={() => exec('formatBlock', 'BLOCKQUOTE')}>
                      <Quote className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Shloka / mantra block" onClick={handleShloka}>
                      <span className="px-0.5">ॐ श्लोक</span>
                    </ToolButton>
                    <Divider />
                    <ToolButton title="Align left" onClick={() => exec('justifyLeft')}>
                      <AlignLeft className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Align center" onClick={() => exec('justifyCenter')}>
                      <AlignCenter className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Align right" onClick={() => exec('justifyRight')}>
                      <AlignRight className="w-4 h-4" />
                    </ToolButton>
                    <Divider />
                    <ToolButton title="Insert link" onClick={handleLink}>
                      <LinkIcon className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Remove link" onClick={() => exec('unlink')}>
                      <Unlink className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton
                      title="Upload image"
                      onClick={() => {
                        saveSelection();
                        inlineImageInput.current?.click();
                      }}
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Image</span>
                    </ToolButton>
                    <ToolButton title="Image from URL" onClick={handleImageUrl}>
                      <ImageIcon className="w-4 h-4" />
                      <span>URL</span>
                    </ToolButton>
                    <ToolButton title="YouTube video" onClick={handleVideo}>
                      <Youtube className="w-4 h-4" />
                      <span>Video</span>
                    </ToolButton>
                    <ToolButton title="Table" onClick={handleTable}>
                      <Table className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Horizontal line" onClick={() => exec('insertHorizontalRule')}>
                      <Minus className="w-4 h-4" />
                    </ToolButton>
                    <Divider />
                    <ToolButton title="Clear formatting" onClick={() => exec('removeFormat')}>
                      <RemoveFormatting className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Undo" onClick={() => exec('undo')}>
                      <Undo2 className="w-4 h-4" />
                    </ToolButton>
                    <ToolButton title="Redo" onClick={() => exec('redo')}>
                      <Redo2 className="w-4 h-4" />
                    </ToolButton>
                  </>
                )}
                <div className="ml-auto flex">
                  {(['visual', 'html'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        if (mode === 'visual') syncContent();
                        savedRange.current = null;
                        setMode(m);
                      }}
                      className={`px-2.5 py-1 text-xs font-semibold rounded ${
                        mode === m ? 'bg-white border border-[#8c8f94] shadow-sm' : 'text-stone-600'
                      }`}
                    >
                      {m === 'visual' ? 'Visual' : 'HTML'}
                    </button>
                  ))}
                </div>
              </div>

              {mode === 'visual' ? (
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={syncContent}
                  onBlur={saveSelection}
                  onKeyUp={saveSelection}
                  onMouseUp={saveSelection}
                  data-placeholder="Start writing your post…"
                  className="post-content min-h-[420px] p-5 font-serif text-stone-900 focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-stone-400"
                />
              ) : (
                <textarea
                  value={form.content}
                  onChange={(e) => set({ content: e.target.value })}
                  spellCheck={false}
                  className="w-full min-h-[420px] p-4 font-mono text-xs text-stone-800 focus:outline-none"
                />
              )}

              <div className="bg-[#f6f7f7] border-t border-[#c3c4c7] px-3 py-1.5 text-[11px] text-stone-500 rounded-b">
                Word count: {wordCount} • {estimateReadingTime(form.content)}
              </div>
            </div>

            <Panel title="Excerpt (short summary shown on listing pages)">
              <textarea
                rows={3}
                value={form.excerpt}
                onChange={(e) => set({ excerpt: e.target.value })}
                placeholder="Leave empty to use the first lines of the post."
                className={inputClass}
              />
            </Panel>

            <Panel title="SEO (Google search result)">
              <label className="block font-semibold text-stone-700">SEO title</label>
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => set({ seoTitle: e.target.value })}
                placeholder={form.title || 'Defaults to the post title'}
                className={inputClass}
              />
              <span className="text-[10px] text-stone-500">{(form.seoTitle || form.title).length} / 60 characters</span>
              <label className="block font-semibold text-stone-700 pt-1">Meta description</label>
              <textarea
                rows={2}
                value={form.seoDescription}
                onChange={(e) => set({ seoDescription: e.target.value })}
                placeholder="Defaults to the excerpt"
                className={inputClass}
              />
              <span className="text-[10px] text-stone-500">
                {(form.seoDescription || form.excerpt).length} / 160 characters
              </span>
            </Panel>
          </div>

          {/* Sidebar */}
          <div className="space-y-3">
            <Panel title="Publish">
              <p>
                Status: <strong>{form.status}</strong>
              </p>
              {isEditing && (
                <a
                  href={postUrl({ slug: slugPreview, content: form.content || ' ' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#2271b1] hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View saved post
                </a>
              )}
              <p className="text-[11px] text-stone-500">
                Published posts appear on the Articles page and the homepage for all visitors.
              </p>
            </Panel>

            <Panel title="Featured image">
              {form.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.image} alt="" className="w-full h-36 object-cover rounded border border-[#dcdcde]" />
              )}
              <button
                type="button"
                onClick={() => featuredImageInput.current?.click()}
                className="w-full inline-flex items-center justify-center gap-1.5 border border-[#2271b1] text-[#2271b1] hover:bg-stone-100 px-3 py-1.5 rounded font-semibold text-xs"
              >
                <Upload className="w-3.5 h-3.5" /> Upload image
              </button>
              <input
                type="text"
                value={form.image.startsWith('data:') ? '' : form.image}
                onChange={(e) => set({ image: e.target.value })}
                placeholder="or paste an image URL"
                className={inputClass}
              />
            </Panel>

            <Panel title="Category">
              <select value={form.category} onChange={(e) => set({ category: e.target.value })} className={inputClass}>
                {!CATEGORIES.some(([value]) => value === form.category) && (
                  <option value={form.category}>{form.category}</option>
                )}
                {CATEGORIES.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </Panel>

            <Panel title="Tags">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Separate with commas"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="border border-[#2271b1] text-[#2271b1] hover:bg-stone-100 px-2.5 rounded font-semibold text-xs"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {form.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-stone-100 border border-stone-300 rounded-full px-2 py-0.5 text-[11px]">
                    {tag}
                    <button
                      type="button"
                      aria-label={`Remove tag ${tag}`}
                      onClick={() => set({ tags: form.tags.filter((t) => t !== tag) })}
                      className="text-stone-500 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </Panel>

            <Panel title="Author">
              <input type="text" value={form.author} onChange={(e) => set({ author: e.target.value })} className={inputClass} />
            </Panel>
          </div>
        </div>
      </div>

      <input ref={inlineImageInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={handleInlineImageFile} />
      <input ref={featuredImageInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={handleFeaturedImageFile} />
    </div>
  );
}
