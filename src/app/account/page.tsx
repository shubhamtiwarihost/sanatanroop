'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAudio } from '@/context/AudioContext';
import {
  User,
  Package,
  Bookmark,
  BookOpen,
  Settings,
  LogOut,
  Sparkles,
  Play,
  Pause,
  ExternalLink,
  Flame,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Calendar,
  Heart,
  ChevronRight,
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { playAudio, pauseAudio, isPlaying, currentTrack } = useAudio();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'mantras' | 'history' | 'settings'>('dashboard');

  const [profileName, setProfileName] = useState(user?.name || 'Shubham Sharma');
  const [profileEmail, setProfileEmail] = useState(user?.email || 'shubham@sanatan.org');
  const [selectedCity, setSelectedCity] = useState('Varanasi');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const mockOrders = [
    {
      id: 'SG-9821',
      date: 'Sep 10, 2026',
      status: 'Delivered',
      items: [
        { name: 'Shrimad Bhagavad Gita (Gita Press Edition)', qty: 1, price: 599 },
        { name: 'Handcrafted Brass Diya & Kalash Set', qty: 1, price: 900 },
      ],
      total: 1499,
    },
    {
      id: 'SG-9844',
      date: 'Sep 12, 2026',
      status: 'In Transit',
      items: [
        { name: 'Authentic 5 Mukhi Rudraksha Mala (108 Beads)', qty: 1, price: 899 },
      ],
      total: 899,
    },
    {
      id: 'SG-9780',
      date: 'Aug 28, 2026',
      status: 'Delivered',
      items: [
        { name: 'Natural Sandalwood Champa Incense (Box of 6)', qty: 2, price: 300 },
      ],
      total: 300,
    },
  ];

  const savedMantras = [
    {
      id: 'gayatri',
      title: 'Gayatri Mantra',
      sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
      source: 'Rigveda 3.62.10',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=meditation-bell-chant-110077.mp3',
    },
    {
      id: 'mahamrityunjaya',
      title: 'Maha Mrityunjaya Mantra',
      sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्य pushyीय मामृतात्॥',
      source: 'Rigveda 7.59.12',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=tibetan-chanting-105232.mp3',
    },
    {
      id: 'shiva-tandava',
      title: 'Shiva Tandava Stotram',
      sanskrit: 'जटाटवीगलज्जलप्रवाहपावितस्थले गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्॥',
      source: 'Composed by Ravana',
      audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=meditation-bell-chant-110077.mp3',
    },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* User Greeting Bar */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#20140e] via-[#1a0f0a] to-[#120b08] text-amber-50 shadow-lg border border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-600/30 border-2 border-amber-400/50 flex items-center justify-center font-serif text-3xl text-amber-300 shadow-inner">
              ॐ
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
                  Namaste, {user?.name || profileName}
                </h1>
                <span className="text-[10px] font-bold text-amber-900 bg-amber-300 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {user?.role || 'Seeker'}
                </span>
              </div>
              <p className="text-xs text-amber-300/70 mt-0.5 font-serif">
                {user?.email || profileEmail} • Member of Sanatan Granth Parivar
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/calendar"
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Today&apos;s Panchang</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-950/60 border border-red-800/40 text-red-300 text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Navigation (1 Col) */}
          <div className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard (अवलोकन)', icon: Sparkles },
              { id: 'orders', label: 'My Orders (आदेश सूची)', icon: Package },
              { id: 'mantras', label: 'Saved Mantras (कण्ठस्थ मन्त्र)', icon: Bookmark },
              { id: 'history', label: 'Reading History (स्वाध्याय)', icon: BookOpen },
              { id: 'settings', label: 'Account Settings (सेटिंग्स)', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-amber-200/60 dark:border-stone-800 hover:bg-amber-50/70'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-600'}`} />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                </button>
              );
            })}

            {/* Panchang Quick Card */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 space-y-2 mt-6">
              <div className="flex items-center space-x-2 text-stone-800 dark:text-stone-200 font-serif font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Today in {selectedCity}</span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                Shukla Paksha Dashami • Abhijit Muhurat: 11:52 AM – 12:41 PM
              </p>
              <Link
                href="/calendar"
                className="text-[11px] font-bold text-amber-700 hover:underline inline-block pt-1"
              >
                View Full Panchang →
              </Link>
            </div>
          </div>

          {/* Right Main Content Area (3 Cols) */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500 font-medium">Orders Placed</span>
                      <Package className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      3 Orders
                    </span>
                    <p className="text-[11px] text-emerald-600 font-medium">1 in active transit</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500 font-medium">Saved Mantras</span>
                      <Bookmark className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      8 Shlokas
                    </span>
                    <p className="text-[11px] text-stone-400">Available offline</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500 font-medium">Sadhana Streak</span>
                      <Flame className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                      14 Days 🔥
                    </span>
                    <p className="text-[11px] text-orange-600 font-medium">Keep chanting daily</p>
                  </div>
                </div>

                {/* Recent Orders Section */}
                <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                      Recent Orders
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-amber-700 hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase text-[10px] tracking-wider">
                          <th className="pb-3">Order ID</th>
                          <th className="pb-3">Items</th>
                          <th className="pb-3">Date</th>
                          <th className="pb-3">Total</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                        {mockOrders.slice(0, 2).map((ord) => (
                          <tr key={ord.id} className="hover:bg-amber-50/40 dark:hover:bg-stone-800/40">
                            <td className="py-3.5 font-bold font-serif text-amber-800 dark:text-amber-400">
                              #{ord.id}
                            </td>
                            <td className="py-3.5 text-stone-700 dark:text-stone-300 font-medium">
                              {ord.items.map((i) => i.name).join(', ')}
                            </td>
                            <td className="py-3.5 text-stone-500">{ord.date}</td>
                            <td className="py-3.5 font-bold text-stone-900 dark:text-stone-100">
                              ₹{ord.total}
                            </td>
                            <td className="py-3.5">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  ord.status === 'Delivered'
                                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                                    : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                                }`}
                              >
                                {ord.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Saved Mantras Quick Chanting */}
                <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                      Saved Mantras for Daily Sadhana
                    </h3>
                    <button
                      onClick={() => setActiveTab('mantras')}
                      className="text-xs font-bold text-amber-700 hover:underline"
                    >
                      All Mantras ({savedMantras.length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {savedMantras.map((m) => {
                      const isCurrent = currentTrack?.id === m.id && isPlaying;
                      return (
                        <div
                          key={m.id}
                          className="p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-800/50 border border-amber-200/50 dark:border-stone-700 flex items-center justify-between gap-4"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                                {m.title}
                              </h4>
                              <span className="text-[10px] text-amber-700 font-medium">
                                ({m.source})
                              </span>
                            </div>
                            <p className="font-serif text-xs text-amber-900 dark:text-amber-300 truncate max-w-xl">
                              {m.sanskrit}
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              playAudio({
                                id: m.id,
                                title: m.title,
                                audioUrl: m.audioUrl,
                                subtitle: m.source,
                              })
                            }
                            className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow transition flex items-center space-x-1.5 flex-shrink-0"
                          >
                            {isCurrent ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            <span className="text-[11px] font-bold">
                              {isCurrent ? 'Pause' : 'Chant'}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Order History & Tracking
                </h3>

                <div className="space-y-4">
                  {mockOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-5 rounded-2xl border border-amber-200/80 dark:border-stone-800 space-y-3 bg-stone-50/50 dark:bg-stone-800/40"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-700 pb-3">
                        <div>
                          <span className="text-xs font-bold font-serif text-amber-800 dark:text-amber-400">
                            Order #{ord.id}
                          </span>
                          <span className="text-xs text-stone-400 ml-3">Placed on {ord.date}</span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            ord.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs">
                            <span className="text-stone-700 dark:text-stone-300 font-medium">
                              {item.name} × {item.qty}
                            </span>
                            <span className="font-bold text-stone-900 dark:text-stone-100">
                              ₹{item.price}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-stone-200 dark:border-stone-700 text-xs">
                        <span className="text-stone-500 font-medium">Order Total:</span>
                        <span className="font-serif font-bold text-base text-amber-700">
                          ₹{ord.total}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'mantras' && (
              <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Your Sacred Chanting Library
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedMantras.map((m) => (
                    <div
                      key={m.id}
                      className="p-5 rounded-2xl bg-amber-50/50 dark:bg-stone-800 border border-amber-200/70 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                            {m.title}
                          </h4>
                          <span className="text-[10px] text-amber-700 font-medium">{m.source}</span>
                        </div>
                        <button
                          onClick={() =>
                            playAudio({
                              id: m.id,
                              title: m.title,
                              audioUrl: m.audioUrl,
                              subtitle: m.source,
                            })
                          }
                          className="p-2 rounded-xl bg-amber-600 text-white shadow"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-serif text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                        {m.sanskrit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Sacred Reading History & Bookmarks
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex justify-between items-center">
                    <div>
                      <span className="font-serif font-bold text-stone-900 dark:text-stone-100 block">
                        Shrimad Bhagavad Gita — Chapter 2: Sankhya Yoga
                      </span>
                      <span className="text-[10px] text-stone-400">Completed 47 verses • Yesterday</span>
                    </div>
                    <Link
                      href="/scriptures/bhagavad-gita"
                      className="text-amber-700 font-bold hover:underline"
                    >
                      Resume →
                    </Link>
                  </div>
                  <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex justify-between items-center">
                    <div>
                      <span className="font-serif font-bold text-stone-900 dark:text-stone-100 block">
                        Isha Upanishad — Verse 1 (ईशा वास्यमिदं सर्वम्)
                      </span>
                      <span className="text-[10px] text-stone-400">Read 3 days ago</span>
                    </div>
                    <Link
                      href="/scriptures/isha-upanishad"
                      className="text-amber-700 font-bold hover:underline"
                    >
                      Resume →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm space-y-6">
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Account & Sadhana Preferences
                </h3>

                {saveSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Preferences successfully updated!</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Preferred City for Panchang
                      </label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-xs bg-white"
                      >
                        <option value="Varanasi">Varanasi (Kashi)</option>
                        <option value="New Delhi">New Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Haridwar">Haridwar</option>
                        <option value="Ujjain">Ujjain</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                        Default Scripture Language
                      </label>
                      <select className="w-full px-3.5 py-2 rounded-xl border border-amber-200 text-xs bg-white">
                        <option value="hi">हिन्दी (Hindi)</option>
                        <option value="en">English</option>
                        <option value="sa">संस्कृतम् (Sanskrit)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
