'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  ShieldCheck,
  User,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (activeTab === 'signup') {
        if (password !== confirmPassword) {
          setErrorMsg('Passwords do not match');
          setLoading(false);
          return;
        }
        if (!agreeTerms) {
          setErrorMsg('Please accept the Terms of Service & Spiritual Community Guidelines');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/v1/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErrorMsg(data.error || 'Registration failed');
          setLoading(false);
          return;
        }
        await login(email, password);
        router.push('/account');
      } else {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMsg(res.error || 'Invalid email or password');
          setLoading(false);
          return;
        }
        router.push('/account');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error occurred');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (userEmail: string) => {
    setEmail(userEmail);
    setPassword('Sanatan@108');
    setLoading(true);
    setErrorMsg('');
    const res = await login(userEmail, 'Sanatan@108');
    setLoading(false);
    if (res.success) {
      router.push('/account');
    } else {
      setErrorMsg(res.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#120d0a] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Sacred Branding Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center font-serif text-3xl font-bold mx-auto shadow-lg border border-amber-300/40">
            ॐ
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
            {activeTab === 'signin' ? 'Welcome Back, Seeker' : 'Create Your Sacred Account'}
          </h1>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Access your sacred bookmarks, customized panchang, spiritual reading streaks, and temple orders.
          </p>
        </div>

        {/* Auth Container Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-xl space-y-6">
          {/* Dual Tabs matching Mockup */}
          <div className="flex p-1 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-amber-200/50 dark:border-stone-700">
            <button
              onClick={() => {
                setActiveTab('signin');
                setErrorMsg('');
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'signin'
                  ? 'bg-white dark:bg-stone-900 text-amber-800 dark:text-amber-300 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              Sign In (प्रवेश)
            </button>
            <button
              onClick={() => {
                setActiveTab('signup');
                setErrorMsg('');
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'signup'
                  ? 'bg-white dark:bg-stone-900 text-amber-800 dark:text-amber-300 shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              Register (नया खाता)
            </button>
          </div>

          {/* Error / Success Feedback */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-medium">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 text-xs font-medium">
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aditya Sharma"
                    className="w-full pl-9 pr-3 py-2.5 text-xs border border-amber-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seeker@sanatan.org"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-amber-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  Password
                </label>
                {activeTab === 'signin' && (
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Demo reset link: For testing, use password Sanatan@108');
                    }}
                    className="text-[11px] text-amber-700 dark:text-amber-400 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-xs border border-amber-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {activeTab === 'signup' && (
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 text-xs border border-amber-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>
            )}

            {/* Checkbox */}
            {activeTab === 'signin' ? (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-amber-300 text-amber-600 focus:ring-amber-500 h-4 w-4"
                />
                <label htmlFor="rememberMe" className="text-xs text-stone-600 dark:text-stone-400">
                  Remember this device for 30 days
                </label>
              </div>
            ) : (
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-amber-300 text-amber-600 focus:ring-amber-500 h-4 w-4 mt-0.5"
                />
                <label htmlFor="agreeTerms" className="text-xs text-stone-600 dark:text-stone-400 leading-tight">
                  I agree to the{' '}
                  <span className="text-amber-700 underline cursor-pointer">Terms of Service</span> and{' '}
                  <span className="text-amber-700 underline cursor-pointer">
                    Spiritual Community Guidelines
                  </span>
                  .
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition"
            >
              {loading
                ? 'Processing...'
                : activeTab === 'signin'
                ? 'Sign In to Account'
                : 'Create Devotee Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
