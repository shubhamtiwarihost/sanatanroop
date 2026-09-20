'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Sparkles,
  Send,
  ShieldCheck,
  BookOpen,
  AlertCircle,
  HelpCircle,
  CheckCircle,
} from 'lucide-react';

interface Citation {
  source: string;
  reference: string;
  sanskrit?: string;
  translation: string;
}

interface AIAnswer {
  grounded: boolean;
  explanation: string;
  citations: Citation[];
  disclaimer: string;
}

export default function AIGuidePage() {
  const { t } = useLanguage();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<AIAnswer | null>(null);

  const sampleQuestions = [
    'What does the Bhagavad Gita say about Nishkama Karma and performing duty?',
    'What is the meaning and source of the Gayatri Mantra?',
    'What is the philosophical meaning of Om Purnamadah Purnamidam?',
    'Explain the immortal nature of the soul according to Gita Chapter 2',
    'Who is Bhagavan Shiva and what is the Mahamrityunjaya Mantra?',
    'What are the Four Purusharthas in human life?',
  ];

  const handleAsk = async (qText?: string) => {
    const query = qText || question;
    if (!query.trim()) return;

    setLoading(true);
    setAnswer(null);
    try {
      const res = await fetch('/api/v1/ai-dharma', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      });
      const data = await res.json();
      if (data.answer) {
        setAnswer(data.answer);
      }
    } catch (e) {
      console.error('AI query error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-amber-200 dark:border-amber-900/60 pb-6 text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-xs font-semibold border border-amber-300 dark:border-amber-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{t.ai.verifiedCanonOnly}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
          {t.ai.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
          {t.ai.subtitle}
        </p>
      </div>

      {/* Suggested Inquiries */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
          {t.ai.exampleQuestions}:
        </span>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((sq, i) => (
            <button
              key={i}
              onClick={() => {
                setQuestion(sq);
                handleAsk(sq);
              }}
              className="text-xs px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-stone-800 text-amber-950 dark:text-amber-200 border border-amber-200/80 dark:border-stone-700 text-left transition"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Question Input Form */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-amber-900/60 shadow-sm space-y-4">
        <textarea
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t.ai.askPrompt}
          className="w-full p-3.5 rounded-2xl border border-amber-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/60 text-sm font-medium text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center space-x-2 text-[11px] text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Anti-hallucination protection: Only answers from platform scriptures</span>
          </div>

          <button
            onClick={() => handleAsk()}
            disabled={loading || !question.trim()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold shadow-md transition flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Retrieving Scripture Canon...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>{t.ai.send}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Answer & Citations Box */}
      {answer && (
        <div className="rounded-3xl bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/60 p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-amber-100 dark:border-stone-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 flex items-center justify-center font-serif font-bold text-xs">
                ॐ
              </span>
              <span className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                Grounded Scriptural Guidance
              </span>
            </div>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                answer.grounded
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {answer.grounded ? 'Canonical Verification: Passed' : 'No Direct Canonical Match'}
            </span>
          </div>

          {/* Explanation Text */}
          <div className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans space-y-4">
            <p className="whitespace-pre-line">{answer.explanation}</p>
          </div>

          {/* Verified Citations List */}
          {answer.citations.length > 0 && (
            <div className="space-y-4 border-t border-amber-100 dark:border-stone-800 pt-5">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-800 dark:text-amber-300 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>{t.ai.sourceCitation} ({answer.citations.length})</span>
              </span>

              <div className="space-y-3">
                {answer.citations.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-amber-50/50 dark:bg-stone-800/50 border border-amber-200/60 dark:border-stone-700 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-900 dark:text-amber-200">
                        {c.source}
                      </span>
                      <span className="text-[11px] text-stone-500 font-medium font-mono">
                        {c.reference}
                      </span>
                    </div>

                    {c.sanskrit && (
                      <p className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-amber-100 whitespace-pre-line sanskrit-text leading-relaxed p-2.5 bg-white dark:bg-stone-800 rounded-lg border border-amber-100 dark:border-stone-700">
                        {c.sanskrit}
                      </p>
                    )}

                    <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                      Translation: &quot;{c.translation}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strict Platform Disclaimer */}
          <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700 text-[11px] text-stone-500 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p>{answer.disclaimer || t.ai.disclaimer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
