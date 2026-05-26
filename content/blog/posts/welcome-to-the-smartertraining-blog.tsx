import Link from 'next/link'
import type { PostMeta, TocItem } from '@/lib/blog/types'

export const meta: PostMeta = {
  slug: 'welcome-to-the-smartertraining-blog',
  title: 'Welcome to the SmarterTraining blog',
  description:
    'A short introduction to the SmarterTraining blog — what we write about, who it is for, and why adaptive training is the through-line.',
  excerpt:
    'A quick tour of what the SmarterTraining blog will cover — adaptive training, time-crunched cycling, recovery, and how to keep training on the rails when life keeps shifting under it.',
  category: 'training-philosophy',
  tags: [
    'adaptive training',
    'consistency',
    'cycling',
    'real-life training',
  ],
  publishedAt: '2026-05-26',
  author: 'smartertraining',
  featured: true,
  internalLinks: [
    {
      label: 'Training Philosophy',
      href: '/blog/category/training-philosophy',
      description:
        'Consistency over perfection, sustainable training, and how to keep showing up when motivation, schedule, and energy keep changing.',
    },
    {
      label: 'Adaptive Training',
      href: '/blog/category/adaptive-training',
      description:
        'How adaptive coaching keeps your plan responsive to fatigue, schedule, and life.',
    },
    {
      label: 'Time-Crunched Cycling',
      href: '/blog/category/time-crunched-cycling',
      description: 'Training tactics for riders with limited, unpredictable hours.',
    },
    {
      label: 'Recovery & Fatigue',
      href: '/blog/category/recovery-fatigue',
      description:
        'When to push, when to back off, and how to read your body without overreacting.',
    },
  ],
  faqs: [
    {
      question: 'What is the SmarterTraining blog about?',
      answer:
        'Adaptive indoor cycling training for busy amateur cyclists — how to train productively when your schedule, energy, and motivation change week to week.',
    },
    {
      question: 'Who is this blog for?',
      answer:
        'Amateur cyclists balancing training with work, family, stress, travel, and inconsistent schedules. If a rigid 12-week plan has never survived contact with your real life, the blog is written with you in mind.',
    },
    {
      question: 'How often will you publish?',
      answer:
        'We publish as we have something useful to say. We would rather skip a week than ship filler.',
    },
  ],
}

const TOC: TocItem[] = [
  { id: 'who-this-is-for', title: 'Who this is for', level: 2 },
  { id: 'what-we-write-about', title: 'What we write about', level: 2 },
  { id: 'our-bias', title: 'Our bias: consistency over perfection', level: 2 },
  { id: 'where-to-start', title: 'Where to start', level: 2 },
]

meta.toc = TOC

export default function Content() {
  return (
    <>
      <p className="lead">
        SmarterTraining exists for cyclists with real lives. This blog will be
        the same — practical, honest writing about training that survives a
        bad night of sleep, a missed workout, a work trip, and a 7 a.m. kid
        wake-up.
      </p>

      <div className="answer-box" role="note" aria-label="Quick answer">
        <p className="answer-box__label">In short</p>
        <p>
          The SmarterTraining blog is about adaptive cycling training for busy
          amateurs — how to keep making progress when your schedule and energy
          keep changing. Expect articles on adaptive coaching, time-crunched
          training, indoor cycling, recovery, and the philosophy of training
          for real life rather than for a textbook.
        </p>
      </div>

      <h2 id="who-this-is-for">Who this is for</h2>
      <p>
        If you have ever finished a hard week of life and felt like a
        carefully planned training block was suddenly aspirational fiction,
        you are the reader we have in mind. Most riders we talk to are
        balancing training with a job, a family, stress they did not order,
        and the occasional 5 a.m. flight.
      </p>
      <p>
        That does not mean training has to be soft. It just has to be
        realistic — and a realistic plan, executed consistently, beats an
        ambitious plan you keep starting over.
      </p>

      <h2 id="what-we-write-about">What we write about</h2>
      <p>
        We organize writing into a handful of categories. Each is a category
        hub you can subscribe to mentally and return to over time:
      </p>
      <ul>
        <li>
          <Link href="/blog/category/adaptive-training">Adaptive Training</Link>{' '}
          — how coaching adjusts to fatigue, schedule, and goals.
        </li>
        <li>
          <Link href="/blog/category/time-crunched-cycling">
            Time-Crunched Cycling
          </Link>{' '}
          — training tactics for limited, unpredictable hours.
        </li>
        <li>
          <Link href="/blog/category/indoor-cycling">Indoor Cycling</Link> —
          smart trainer setup, ERG mode, and indoor consistency.
        </li>
        <li>
          <Link href="/blog/category/recovery-fatigue">Recovery &amp; Fatigue</Link>{' '}
          — sleep, stress, soreness, and when to skip.
        </li>
        <li>
          <Link href="/blog/category/cycling-workouts">Cycling Workouts</Link>{' '}
          — zone 2, sweet spot, threshold, VO2, and sequencing.
        </li>
        <li>
          <Link href="/blog/category/training-philosophy">Training Philosophy</Link>{' '}
          — sustainable training and the cost of perfectionism.
        </li>
        <li>
          <Link href="/blog/category/comparisons">Comparisons</Link> — honest
          looks at TrainerRoad, Zwift, and other tools versus adaptive
          coaching.
        </li>
      </ul>

      <h2 id="our-bias">Our bias: consistency over perfection</h2>
      <p>
        The same bias runs through the SmarterTraining app and this blog:
        consistency beats intensity, and a plan that adapts to you beats a
        plan you have to adapt to. If you have to choose between a perfect
        workout and a workout that actually happens, the workout that
        actually happens almost always wins.
      </p>
      <p>
        Expect that point of view in everything we publish.
      </p>

      <h2 id="where-to-start">Where to start</h2>
      <p>
        If you are new here, pick the category that sounds most like the
        problem you are sitting with this week. Articles cross-link to
        related posts and category hubs so you can wander into the parts of
        training you care about most.
      </p>
      <p className="takeaway">
        <strong>Takeaway:</strong> If your current training plan does not
        leave room for a bad week, it is not really a plan — it is a
        wish-list. The point of adaptive training is to keep the wish-list,
        and still have a plan when life intervenes.
      </p>
    </>
  )
}
