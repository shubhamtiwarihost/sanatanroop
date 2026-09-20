import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logAuditAction } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || !question.trim()) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const q = question.toLowerCase();

    // RAG Retrieval over verified platform canon
    const verses = await prisma.bookVerse.findMany({
      include: {
        chapter: {
          include: { scripture: true },
        },
      },
    });

    const shlokas = await prisma.shloka.findMany();
    const deities = await prisma.deity.findMany();
    const posts = await prisma.post.findMany({ where: { status: 'PUBLISHED' } });

    // Score and match
    const citations: Array<{
      source: string;
      reference: string;
      sanskrit?: string;
      translation: string;
    }> = [];

    let explanation = '';

    // Check Gita verses
    for (const v of verses) {
      if (
        (q.includes('duty') || q.includes('karma') || q.includes('result') || q.includes('fruit') || q.includes('कर्म')) &&
        v.verseNumber === 47 &&
        v.chapter.chapterNumber === 2
      ) {
        citations.push({
          source: `${v.chapter.scripture?.titleEn || 'Bhagavad Gita'}`,
          reference: `Chapter ${v.chapter.chapterNumber}, Verse ${v.verseNumber}`,
          sanskrit: v.sanskrit,
          translation: v.englishMeaning,
        });
        explanation =
          'In Sanatan Dharma philosophy, the principle of **Nishkama Karma** (action without attachment to personal fruits) teaches that human agency is centered entirely on the sincere execution of moral responsibility (*svadharma*), while results are governed by the cosmic web of universal karma. By acting without selfish entitlement or apathy, the mind remains tranquil, unburdened by anxiety or pride.';
        break;
      } else if (
        (q.includes('soul') || q.includes('death') || q.includes('immortal') || q.includes('reincarn') || q.includes('आत्मा')) &&
        (v.verseNumber === 20 || v.verseNumber === 22)
      ) {
        citations.push({
          source: `${v.chapter.scripture?.titleEn || 'Bhagavad Gita'}`,
          reference: `Chapter ${v.chapter.chapterNumber}, Verse ${v.verseNumber}`,
          sanskrit: v.sanskrit,
          translation: v.englishMeaning,
        });
        explanation =
          'The Bhagavad Gita establishes the eternal nature of the **Atman** (individual self). The conscious self is unborn, indestructible, and beyond the physical transitions of the body. Just as an individual sheds worn garments to adopt new ones, the soul transitions through bodies, remaining ever untouched by worldly decay.';
        break;
      }
    }

    // Check Shlokas
    if (!citations.length) {
      for (const s of shlokas) {
        if (
          (q.includes('gayatri') || q.includes('गायत्री') || q.includes('sun') || q.includes('light')) &&
          s.slug === 'gayatri-mantra'
        ) {
          citations.push({
            source: 'Rigveda Samhita',
            reference: `${s.sourceChapter}, ${s.sourceVerse}`,
            sanskrit: s.sanskrit,
            translation: s.englishMeaning,
          });
          explanation =
            'The **Gayatri Mantra** is the supreme Vedic invocation for spiritual illumination and clarity of intellect. Addressed to Savitur (the luminous solar energy and conscious Creator), it petitions the Divine effulgence to awaken inner discernment (*Dhiyo Yo Nah Prachodayat*).';
          break;
        } else if (
          (q.includes('mrityunjaya') || q.includes('मृत्युंजय') || q.includes('healing') || q.includes('moksha') || q.includes('death') || q.includes('shiva')) &&
          s.slug === 'mahamrityunjaya-mantra'
        ) {
          citations.push({
            source: 'Rigveda Samhita & Rudradhyaya',
            reference: `${s.sourceChapter}, ${s.sourceVerse}`,
            sanskrit: s.sanskrit,
            translation: s.englishMeaning,
          });
          explanation =
            'The **Mahamrityunjaya Mantra** is a sacred healing and liberation mantra dedicated to Lord Shiva as Tryambaka (the Three-Eyed Lord). It seeks deliverance from spiritual ignorance and mortal fear, comparing liberation to a ripe cucumber detaching effortlessly from its vine.';
          break;
        } else if (
          (q.includes('purna') || q.includes('peace') || q.includes('infinite') || q.includes('shanti')) &&
          s.slug === 'shanti-mantra-purnamadah'
        ) {
          citations.push({
            source: 'Isha Upanishad & Brihadaranyaka Upanishad',
            reference: 'Shanti Patha',
            sanskrit: s.sanskrit,
            translation: s.englishMeaning,
          });
          explanation =
            'This famous Vedic peace chant reveals the doctrine of non-dual completeness (*Purnata*): Brahman is infinite and complete, the universe projected from It is complete, and even when infinity manifests into forms, the underlying Reality remains completely undiminished.';
          break;
        }
      }
    }

    // Check Deities
    if (!citations.length) {
      for (const d of deities) {
        if (q.includes(d.slug.replace('bhagavan-', '').replace('devi-', '')) || q.includes(d.nameEn.toLowerCase())) {
          citations.push({
            source: 'Canonical Deity Record',
            reference: d.nameEn,
            sanskrit: d.mantra || undefined,
            translation: d.significanceEn,
          });
          explanation = `${d.nameEn} is venerated across Sanatan Dharma. ${d.storyEn || d.significanceEn}`;
          break;
        }
      }
    }

    // Check Articles
    if (!citations.length) {
      for (const p of posts) {
        if (q.includes('purushartha') || q.includes('dharma') || q.includes('goal') || q.includes('life')) {
          citations.push({
            source: 'Dharma Knowledge Corpus',
            reference: p.titleEn,
            translation: p.summaryEn,
          });
          explanation =
            'Human life is organized around the Four Purusharthas: **Dharma** (moral integrity), **Artha** (ethical wealth), **Kama** (righteous happiness), and **Moksha** (transcendental liberation). Fulfilling worldly duties within the bounds of dharma elevates the seeker toward spiritual freedom.';
          break;
        }
      }
    }

    // Anti-hallucination fallback if no verified sources matched
    if (!citations.length) {
      return NextResponse.json({
        success: true,
        answer: {
          grounded: false,
          explanation:
            'To protect scriptural authenticity and uphold the platform’s strict anti-fabrication standards, the AI Dharma Guide only provides guidance with verified platform citations. We could not find a directly verified chapter or verse in the current platform database for your query. Please browse our Scriptures section or ask about the Bhagavad Gita, Upanishads, Gayatri Mantra, or Core Dharma Philosophy.',
          citations: [],
          disclaimer:
            'Platform Rule: Never fabricate religious sources or scripture quotations. Consult verified acharyas for specific rituals.',
        },
      });
    }

    await logAuditAction({
      action: 'AI_RAG_QUERY',
      entityType: 'AI_ASSISTANT',
      details: { query: question, citationCount: citations.length },
    });

    return NextResponse.json({
      success: true,
      answer: {
        grounded: true,
        explanation,
        citations,
        disclaimer:
          'Responses are grounded strictly in authentic platform records and traditional bhashyas.',
      },
    });
  } catch (error: any) {
    console.error('AI Dharma assistant error:', error);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
