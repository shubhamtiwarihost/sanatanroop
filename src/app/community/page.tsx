'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Users,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  Send,
  Sparkles,
  Search,
  Filter,
  TrendingUp,
  Award,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Image as ImageIcon,
  Smile,
} from 'lucide-react';

interface Post {
  id: string;
  author: {
    name: string;
    location: string;
    avatar: string;
    isScholar?: boolean;
    badge?: string;
  };
  time: string;
  category: string;
  title?: string;
  content: string;
  image?: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: {
      name: 'Aarti Sharma',
      location: 'Varanasi, Uttar Pradesh',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      badge: 'Dedicated Seeker',
    },
    time: '2 hours ago',
    category: 'Experience',
    title: 'How Mahamrityunjaya Mantra changed my mental peace in 40 days',
    content:
      'Pranam to all devotees 🙏 I recently concluded a 40-day anushthan chanting the sacred Mahamrityunjaya Mantra 108 times daily at Brahma Muhurat (around 4:45 AM). As someone who battled chronic anxiety and sleep disorders for over 3 years, the transformative calming vibration of this mantra has brought profound mental stillness. Has anyone else experienced this shift during their japa sadhana?',
    tags: ['#Mahamrityunjaya', '#MantraSadhana', '#InnerPeace', '#BrahmaMuhurat'],
    likes: 142,
    comments: 28,
    shares: 12,
  },
  {
    id: 'post-2',
    author: {
      name: 'Acharya Raghavan Vidyalankar',
      location: 'Rishikesh, Uttarakhand',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isScholar: true,
      badge: 'Vedic Scholar',
    },
    time: '4 hours ago',
    category: 'Philosophy',
    title: 'Gita Chintan: Surrendering the Anxiety of Results (कर्मण्येवाधिकारस्ते)',
    content:
      'In Bhagavad Gita 2.47, Bhagavan Krishna does NOT ask Arjuna to be indifferent to work. He says: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन". Focus 100% of your prana on the excellence of the sacred duty itself. When the mind dwells constantly on praise, victory, or failure, mental energy is dissipated. Act with purity, and offer the outcome at the lotus feet of Ishvara.',
    image: '/images/gita_krishna.jpg',
    tags: ['#BhagavadGita', '#KarmaYoga', '#KrishnaConsciousness', '#VedicWisdom'],
    likes: 384,
    comments: 52,
    shares: 89,
  },
  {
    id: 'post-3',
    author: {
      name: 'Rahul Verma',
      location: 'Bengaluru, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      badge: 'Practitioner',
    },
    time: '7 hours ago',
    category: 'Question',
    title: 'Sandhyavandanam timing for working professionals with early commute',
    content:
      'Namaste elders and seekers. I work in tech and leave home by 6:30 AM. In Bengaluru, sunrise varies between 6:05 to 6:25 AM. For Pratah Sandhyavandanam, is it permissible to begin arghya and gayatri japa slightly prior during the dawn twilight (Ushas kaal, around 5:45 AM)? Would appreciate guidance from knowledgeable practitioners on shastric accommodation.',
    tags: ['#Sandhyavandanam', '#NityaKarma', '#VedicRituals', '#AskScholars'],
    likes: 89,
    comments: 19,
    shares: 4,
  },
  {
    id: 'post-4',
    author: {
      name: 'Meera Joshi',
      location: 'Pune, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      badge: 'Community Volunteer',
    },
    time: '1 day ago',
    category: 'Experience',
    title: 'Divine Darshan from Somnath Mahadev Temple on Pradosham',
    content:
      'Sharing photographs from our family pilgrimage to the sacred Somnath Jyotirlinga. The evening sandhya aarti by the roar of the Arabian Sea fills the heart with pure bhakti. Truly, Har Har Mahadev! May Lord Shiva bless all members of our sacred Sanatan community.',
    image: '/images/hero_shiva.jpg',
    tags: ['#Somnath', '#Jyotirlinga', '#HarHarMahadev', '#Pradosham'],
    likes: 256,
    comments: 44,
    shares: 31,
  },
];

export default function CommunityPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeTab, setActiveTab] = useState('All');
  const [newPostText, setNewPostText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Experience');
  const [searchFilter, setSearchFilter] = useState('');

  const categories = ['All', 'Questions', 'Experiences', 'Philosophy', 'Rituals', 'Events'];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        name: 'You (Sadhak Seeker)',
        location: 'Devotee Member',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        badge: 'Devotee',
      },
      time: 'Just now',
      category: selectedCategory,
      content: newPostText,
      tags: ['#SanatanCommunity', `#${selectedCategory}`],
      likes: 1,
      comments: 0,
      shares: 0,
      isLiked: true,
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const toggleLike = (id: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            isLiked: !p.isLiked,
          };
        }
        return p;
      })
    );
  };

  const toggleSave = (id: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return { ...p, isSaved: !p.isSaved };
        }
        return p;
      })
    );
  };

  const filteredPosts = posts.filter((p) => {
    const matchesCategory =
      activeTab === 'All' ||
      p.category.toLowerCase().includes(activeTab.toLowerCase().replace('s', '')) ||
      (activeTab === 'Questions' && p.category === 'Question') ||
      (activeTab === 'Experiences' && p.category === 'Experience');

    const matchesSearch =
      !searchFilter ||
      p.content.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (p.title && p.title.toLowerCase().includes(searchFilter.toLowerCase())) ||
      p.author.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.tags.some((tag) => tag.toLowerCase().includes(searchFilter.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] pb-24">
      {/* Hero Banner with Spiritual Ghats Background */}
      <section className="relative bg-gradient-to-b from-[#2a170e] via-[#1a100a] to-[#120d0a] text-amber-50 pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-amber-900/40">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src="/images/community_banner.jpg"
            alt="Sacred Spiritual Community"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#120d0a] via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>सनातन सत्संग एवं साधक समाज</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100 tracking-tight">
            Our Spiritual Community
          </h1>
          <p className="text-sm sm:text-base text-amber-200/80 max-w-2xl mx-auto font-serif leading-relaxed">
            Connect with fellow seekers, share sacred experiences, ask shastric questions, and grow together in your journey of Sanatan Dharma.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6">
            <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-amber-500/20 backdrop-blur-md text-center">
              <span className="block text-2xl font-bold font-serif text-amber-400">50K+</span>
              <span className="text-[11px] text-amber-200/70 font-medium">Active Members</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-amber-500/20 backdrop-blur-md text-center">
              <span className="block text-2xl font-bold font-serif text-amber-400">1.2K+</span>
              <span className="text-[11px] text-amber-200/70 font-medium">Discussions</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-amber-500/20 backdrop-blur-md text-center">
              <span className="block text-2xl font-bold font-serif text-amber-400">100+</span>
              <span className="text-[11px] text-amber-200/70 font-medium">Daily Posts</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-amber-500/20 backdrop-blur-md text-center">
              <span className="block text-2xl font-bold font-serif text-amber-400">25+</span>
              <span className="text-[11px] text-amber-200/70 font-medium">Vedic Scholars</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Community Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-serif font-bold flex items-center justify-center border border-amber-300/40 text-lg">
                  ॐ
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    What would you like to share today?
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Share a sadhana experience, shastric query, or divine realization
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-3">
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Type your reflection, question, or shloka observation here..."
                  rows={3}
                  className="w-full p-4 rounded-2xl border border-amber-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-xs sm:text-sm text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none font-sans"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-stone-500 font-medium">Category:</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="text-xs bg-amber-50 dark:bg-stone-800 border border-amber-200/70 dark:border-stone-700 rounded-xl px-2.5 py-1 text-stone-700 dark:text-stone-300 font-semibold focus:outline-none"
                    >
                      <option value="Experience">Experience (अनुभव)</option>
                      <option value="Question">Question (जिज्ञासा)</option>
                      <option value="Philosophy">Philosophy (दर्शन)</option>
                      <option value="Rituals">Rituals (विधि)</option>
                      <option value="Events">Events (उत्सव)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={!newPostText.trim()}
                    className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold shadow-md hover:shadow-lg disabled:opacity-50 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Filter Navigation Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-stone-900 p-3 rounded-2xl border border-amber-200/70 dark:border-stone-800 shadow-sm">
              <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      activeTab === cat
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-amber-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search community..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-amber-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm hover:border-amber-400/60 transition space-y-4"
                >
                  {/* Author Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-amber-200 bg-amber-50">
                        {post.author.avatar.startsWith('http') ? (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-serif text-lg font-bold text-amber-700">
                            ॐ
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 font-serif">
                            {post.author.name}
                          </h4>
                          {post.author.isScholar && (
                            <span className="inline-flex items-center text-[10px] text-amber-700 dark:text-amber-400 font-bold bg-amber-100 dark:bg-amber-950/70 px-2 py-0.5 rounded-md border border-amber-200">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Scholar
                            </span>
                          )}
                          {post.author.badge && !post.author.isScholar && (
                            <span className="text-[10px] text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-md">
                              {post.author.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400">
                          {post.author.location} • {post.time}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-stone-800 px-2.5 py-1 rounded-full border border-amber-200/50">
                      {post.category}
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-2">
                    {post.title && (
                      <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">
                        {post.title}
                      </h3>
                    )}
                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                      {post.content}
                    </p>
                  </div>

                  {/* Post Image if available */}
                  {post.image && (
                    <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-amber-200/60">
                      <Image
                        src={post.image}
                        alt="Community post attachment"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium text-amber-700 dark:text-amber-400 bg-amber-50/80 dark:bg-stone-800/80 px-2 py-0.5 rounded-md hover:underline cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-amber-100 dark:border-stone-800 text-stone-500 text-xs">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition ${
                        post.isLiked
                          ? 'text-red-600 bg-red-50 dark:bg-red-950/40 font-bold'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments} Comments</span>
                    </button>

                    <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition">
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </button>

                    <button
                      onClick={() => toggleSave(post.id)}
                      className={`p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition ${
                        post.isSaved ? 'text-amber-600 fill-amber-600' : ''
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Sidebar Column (1 Col) */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-serif font-bold text-sm">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Trending Topics</span>
              </div>

              <div className="space-y-3">
                {[
                  { tag: '#Mahamrityunjaya', count: '1,420 seekers chanting', category: 'Sadhana' },
                  { tag: '#BhagavadGitaChapter2', count: '3,890 active discussions', category: 'Wisdom' },
                  { tag: '#Shivratri2026', count: '5,120 posts and photos', category: 'Festivals' },
                  { tag: '#Sandhyavandanam', count: '890 ritual guides', category: 'Nitya Karma' },
                  { tag: '#VedicChanting', count: '670 audio recordings', category: 'Mantras' },
                ].map((item) => (
                  <div
                    key={item.tag}
                    className="p-2.5 rounded-xl hover:bg-amber-50/60 dark:hover:bg-stone-800 transition cursor-pointer border border-transparent hover:border-amber-200/40"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-amber-800 dark:text-amber-400 font-serif">
                        {item.tag}
                      </span>
                      <span className="text-[10px] text-stone-400">{item.category}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">{item.count}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50/60 dark:from-stone-900 dark:to-stone-800/80 border border-amber-200/80 dark:border-stone-700 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-serif font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Community Guidelines</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                <li className="flex items-start space-x-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Honor sacred traditions with mutual reverence and respect.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Cite authentic Shastras or Acharyas when discussing philosophy.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Strict zero-tolerance for commercial spam or sectarian hostility.</span>
                </li>
              </ul>
            </div>

            {/* Top Vedic Scholars Card */}
            <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-stone-900 dark:text-stone-100 font-serif font-bold text-sm">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Featured Mentors & Scholars</span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: 'Dr. S. K. Ramanathan',
                    field: 'Advaita Vedanta & Upanishads',
                    answers: '450+ answered queries',
                  },
                  {
                    name: 'Vidushi Sunita Shastri',
                    field: 'Sanskrit Grammar & Shloka Recitation',
                    answers: '320+ answered queries',
                  },
                  {
                    name: 'Pandit Rameshwar Jha',
                    field: 'Panchang & Karmakanda Vidhi',
                    answers: '610+ answered queries',
                  },
                ].map((scholar) => (
                  <div
                    key={scholar.name}
                    className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 font-serif">
                        {scholar.name}
                      </h4>
                      <p className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                        {scholar.field}
                      </p>
                      <p className="text-[10px] text-stone-400">{scholar.answers}</p>
                    </div>
                    <button className="text-[11px] font-bold text-amber-700 hover:text-amber-800 px-2.5 py-1 rounded-lg border border-amber-300 hover:bg-amber-50 transition">
                      Ask
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Satsang Banner */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-700 to-amber-900 text-white shadow-md space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-200">
                Daily Online Satsang
              </span>
              <h4 className="font-serif font-bold text-base text-amber-100">
                Join Evening Bhagavad Gita Chanting
              </h4>
              <p className="text-xs text-amber-200/80">
                Every evening at 7:00 PM IST. Over 2,000 devotees chant together live with verse-by-verse commentary.
              </p>
              <button className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-bold shadow transition">
                Register for Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
