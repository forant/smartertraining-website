import Link from 'next/link'
import type { PostMeta, TocItem } from '@/lib/blog/types'

export const meta: PostMeta = {
  slug: 'should-i-train-when-my-legs-still-feel-heavy',
  title: 'Should I train when my legs still feel heavy?',
  description:
    'How to tell whether heavy legs mean you should still ride — using a 10-minute warm-up test that separates residual fatigue from accumulated training cost.',
  excerpt:
    'Heavy legs the morning of a workout are common, and the right answer depends on which kind of heavy. Here is a 10-minute warm-up test that separates residual life fatigue from accumulated training fatigue — and the specific call to make in each case: keep the workout, dial it back, swap it, or skip it.',
  category: 'recovery-fatigue',
  tags: [
    'heavy legs',
    'recovery',
    'fatigue',
    'training decisions',
    'leg state',
  ],
  publishedAt: '2026-05-26',
  author: 'smartertraining',
  featured: false,
  relatedPosts: [
    'why-recovery-recommendations-matter-more-than-perfect-workouts',
    'why-consistency-beats-perfect-training-weeks',
    'why-am-i-exhausted-after-zone-2-rides',
  ],
  internalLinks: [
    {
      label: 'Recovery & Fatigue',
      href: '/blog/category/recovery-fatigue',
      description:
        'How to read your body, manage fatigue, sleep poorly without ruining a week, and decide when to skip or modify a workout.',
    },
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
  ],
  faqs: [
    {
      question: 'How long should I warm up before deciding?',
      answer:
        'Ten to fifteen minutes is usually enough. Most riders feel substantially different by minute eight than they did at minute one. If you are still uncertain at minute fifteen, the legs are telling you the answer — that is closer to a swap or skip than a keep.',
    },
    {
      question: 'Does it matter what kind of workout was planned?',
      answer:
        'Yes. Heavy legs going into a long zone 2 ride often loosen up within the first 20 minutes and the workout proceeds normally. Heavy legs going into VO2 work are a much bigger problem — there is almost no warm-up that turns dead legs into a quality VO2 session. The threshold for skipping is much lower for high-intensity days.',
    },
    {
      question: 'What if my legs feel heavy for several days in a row?',
      answer:
        'Three or more consecutive days of heavy legs is usually a load problem, not a recovery problem. Pull back the next week — drop one quality session, shorten the long ride if needed, and let two consecutive easier days happen. If the heaviness persists beyond that with no obvious explanation, it is worth talking to a clinician.',
    },
    {
      question: 'Is heavy legs the same as DOMS?',
      answer:
        'No. DOMS — delayed-onset muscle soreness — is point-specific muscle tenderness, usually peaking 24–48 hours after unfamiliar work. Heavy legs is a more diffuse fatigue feeling that affects how the pedals respond to effort. They can coexist, but they are different signals and the decisions they call for are different.',
    },
  ],
}

const TOC: TocItem[] = [
  {
    id: 'two-kinds-of-heavy-legs',
    title: 'Two kinds of heavy legs in cycling training',
    level: 2,
  },
  {
    id: 'the-warm-up-test',
    title: 'The warm-up test that tells you which is which',
    level: 2,
  },
  {
    id: 'what-to-do-based-on-the-test',
    title: 'What to do based on the test result',
    level: 2,
  },
  {
    id: 'when-heavy-legs-mean-stop-not-test',
    title: 'When heavy legs mean stop, not test',
    level: 2,
  },
  {
    id: 'how-smartertraining-thinks-about-this',
    title: 'How SmarterTraining thinks about this',
    level: 2,
  },
  { id: 'takeaway', title: 'Takeaway', level: 2 },
]

meta.toc = TOC

export default function Content() {
  return (
    <>
      <p className="lead">
        You wake up the morning of a workout and your legs feel heavy.
        The plan says intervals. The question is whether the right
        answer is to ride them anyway, dial the workout back, or skip
        it.
      </p>

      <div className="answer-box" role="note" aria-label="Warm-up test">
        <p>
          Usually yes, but with a test. Do a 10–15 minute warm-up.
          Spin gently for five minutes, then ride at the bottom of
          zone 2 for the next five to ten. If your legs open up and
          you can hold zone 2 power at zone 2 heart rate, the
          heaviness is residue from yesterday and you keep training —
          often at lower intensity than planned. If at minute fifteen
          the legs still feel heavy and you cannot hold the numbers,
          that is accumulated fatigue and the workout will cost more
          than it earns.
        </p>
      </div>

      <h2 id="two-kinds-of-heavy-legs">
        Two kinds of heavy legs in cycling training
      </h2>
      <p>
        &quot;Heavy legs&quot; is one feeling and at least two
        different signals. The distinction matters for the decision.
      </p>
      <p>
        <strong>Residual heaviness</strong> is the morning-after feel
        of yesterday&apos;s workout, a poor night of sleep, or a
        stressful day. It is local — the legs themselves feel slow —
        and it usually loosens up once you start pedaling. The
        cardiovascular system is fine; the muscles just need warming
        up.
      </p>
      <p>
        <strong>Accumulated heaviness</strong> is the residue of
        several harder-than-recovered days in a row, an early-season
        load spike, or a stretch of poor sleep. It does not loosen up
        with movement. Heart rate climbs faster than usual at the
        same power, perceived effort is high at endurance pace, and
        the workout feels like swimming through water rather than
        riding.
      </p>
      <p>
        Residual heaviness is normal and usually a keep. Accumulated
        heaviness is a load signal and is usually a swap or skip.
        The warm-up test is the cheapest way to tell which one you
        are dealing with.
      </p>

      <h2 id="the-warm-up-test">The warm-up test that tells you which is which</h2>
      <p>The protocol is short and deliberately boring:</p>
      <ul>
        <li>
          <strong>Minutes 0–5:</strong> Spin easy. Low cadence,
          almost no resistance. The point is to start moving, not to
          train.
        </li>
        <li>
          <strong>Minutes 5–10:</strong> Ride at the <em>bottom</em>{' '}
          of your zone 2 power range. For most amateurs that is
          roughly 55–65% of FTP. Cadence around 85–90 rpm. Keep it
          steady.
        </li>
        <li>
          <strong>Minutes 10–15:</strong> Hold the same power and
          watch what your heart rate does. The marker you are looking
          for is whether heart rate has settled into the normal zone
          2 range for you — typically the lower half of zone 2 — at
          the bottom-of-zone-2 power.
        </li>
      </ul>
      <p>
        If at minute fifteen your heart rate has settled and the legs
        have started turning over normally, the heaviness was
        residual. Keep going. If heart rate is still climbing, or
        sitting at the top of zone 2 to produce mid-zone-2 power, or
        the perceived effort feels like a tempo ride at endurance
        power, the heaviness is accumulated. Do not push past it
        today.
      </p>

      <h2 id="what-to-do-based-on-the-test">What to do based on the test result</h2>
      <p>
        The test gives you one of four calls, mapped to the standard
        keep / shorten / swap / skip framework:
      </p>
      <ul>
        <li>
          <strong>Test clean → Keep.</strong> Heart rate and power
          settled normally. Do the planned workout. If it was VO2,
          start the first interval and reassess — the warm-up does
          not always predict high-intensity response perfectly.
        </li>
        <li>
          <strong>Test marginal → Shorten.</strong> Numbers settled
          but the legs still feel slow. Do the planned workout with
          one fewer interval or 30 minutes less endurance. Most of
          the benefit, less of the cost.
        </li>
        <li>
          <strong>Test poor → Swap.</strong> Heart rate elevated or
          power below target at low effort. Drop the intensity tier:
          VO2 becomes sweet spot, sweet spot becomes zone 2,
          threshold becomes endurance. You get a real workout; you
          do not pay the recovery cost of forced quality work.
        </li>
        <li>
          <strong>Test bad → Skip.</strong> Heart rate climbing at
          low power, perceived effort high, legs not loosening at
          all. Stop the ride or convert it to 30 minutes of easy
          spinning. The session was going to be survival work
          anyway.
        </li>
      </ul>
      <p>
        The fuller version of this decision-making — and why the
        recovery call usually matters more than the workout call —
        is in{' '}
        <Link href="/blog/why-recovery-recommendations-matter-more-than-perfect-workouts">
          Why recovery recommendations matter more than perfect workouts
        </Link>
        .
      </p>

      <h2 id="when-heavy-legs-mean-stop-not-test">
        When heavy legs mean stop, not test
      </h2>
      <p>
        The warm-up test is for ordinary morning heaviness. There
        are situations where the right call is to not do the test at
        all:
      </p>
      <ul>
        <li>
          Sharp or localized pain in a joint, tendon, or muscle —
          rather than the diffuse heavy feeling. Pain is a different
          signal.
        </li>
        <li>
          Symptoms of illness — sore throat, chest tightness, elevated
          resting heart rate, fever, swollen glands.
        </li>
        <li>
          Unusually severe or persistent fatigue that does not match
          how the recent training week actually went — heaviness
          showing up after an easy week is worth taking seriously.
        </li>
        <li>
          Lightheadedness or dizziness on standing or during the
          warm-up itself.
        </li>
      </ul>
      <p>
        Any of those is a skip, not a test. If they persist or
        recur, treat that as a signal worth taking to a medical
        professional rather than something to train through.
      </p>

      <h2 id="how-smartertraining-thinks-about-this">
        How SmarterTraining thinks about this
      </h2>
      <p>
        SmarterTraining&apos;s daily check-in is built around exactly
        this decision. The system looks at how you say you are
        showing up today, what the last several days of training
        actually did, and what is coming later in the week. The
        recommendation that comes out is the keep / shorten / swap /
        skip call that an attentive coach would make from the same
        information.
      </p>
      <p>
        It will not replace the warm-up. Some mornings the only way
        to know what your legs are going to do is to start pedaling.
        But it removes the &quot;am I being lazy or am I cooked?&quot;
        question from being a daily judgment call.
      </p>

      <h2 id="takeaway">Takeaway</h2>
      <p className="takeaway">
        <strong>Takeaway:</strong> Heavy legs are not a decision; they
        are a question. Spend 10–15 minutes warming up at the bottom
        of zone 2 and see what your heart rate does. If it settles,
        keep training. If it does not, the workout is going to cost
        more than it earns — swap it or skip it.
      </p>
    </>
  )
}
