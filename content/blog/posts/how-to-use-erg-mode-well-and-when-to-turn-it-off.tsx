import Link from 'next/link'
import type { PostMeta, TocItem } from '@/lib/blog/types'

export const meta: PostMeta = {
  slug: 'how-to-use-erg-mode-well-and-when-to-turn-it-off',
  title: 'How to use ERG mode well (and when to turn it off)',
  description:
    'When ERG mode helps your indoor cycling workout and when it actively hurts it — a practical guide for sustained efforts, VO2 work, sprints, and the spiral of death.',
  excerpt:
    'ERG mode is the indoor trainer’s killer feature for some workouts and an active liability for others. Here is when to use it — steady zone 2, sweet spot, threshold — and when to switch it off — VO2 max, sprints, and any session where natural pacing variation is part of the training.',
  category: 'indoor-cycling',
  tags: [
    'erg mode',
    'smart trainer',
    'indoor cycling',
    'intervals',
    'indoor training',
  ],
  publishedAt: '2026-05-26',
  author: 'smartertraining',
  featured: true,
  relatedPosts: [
    'why-am-i-exhausted-after-zone-2-rides',
    'cycling-training-for-parents-with-limited-time',
    'should-i-train-when-my-legs-still-feel-heavy',
  ],
  internalLinks: [
    {
      label: 'Indoor Cycling',
      href: '/blog/category/indoor-cycling',
      description:
        'Smart trainer setup, ERG mode, and how the indoor environment changes the ride.',
    },
    {
      label: 'Cycling Workouts',
      href: '/blog/category/cycling-workouts',
      description:
        'Zone 2, sweet spot, threshold, VO2 max — how each cycling workout type works and when to use it in a real plan.',
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
      question: 'Does ERG mode let me train cadence?',
      answer:
        'Not really. ERG holds your target power across any cadence, which means there is no consequence to letting cadence drift. If cadence is part of what you want to train — high-rpm work, low-rpm strength endurance — switch to resistance or slope mode where cadence and power are coupled the way they are outdoors.',
    },
    {
      question: 'What is the "spiral of death" in ERG mode?',
      answer:
        'When your cadence drops in ERG mode, the trainer adds resistance to maintain target power. The added resistance makes cadence drop further, the trainer adds more resistance, and within ten to twenty seconds you are grinding to a stop at the target wattage. It happens most often on VO2 intervals and on tired legs late in a session. The fix is to either pause the interval and reset, or get used to switching out of ERG before high-intensity work.',
    },
    {
      question: 'Should I do my whole workout in ERG mode?',
      answer:
        'For most sustained sessions, yes. Zone 2 rides, sweet spot work, and threshold intervals all benefit from ERG. For workouts that contain VO2 efforts, sprints, or any varied effort pattern, switching ERG off for the hard intervals — and back on for the recoveries — is usually the right move.',
    },
    {
      question: 'Does using ERG mode mean I am a worse rider?',
      answer:
        'No. ERG is a tool. It is excellent at one thing — holding you at a specified power — and that is genuinely useful for steady-state training. The only "skill" it removes is pacing during sustained efforts, which is the part of riding most amateurs need to train least. Outdoor pacing skills are trained outdoors and on group rides, not on the trainer.',
    },
  ],
}

const TOC: TocItem[] = [
  {
    id: 'what-erg-mode-actually-does',
    title: 'What ERG mode actually does',
    level: 2,
  },
  {
    id: 'when-erg-is-the-right-call',
    title: 'When ERG mode is the right call',
    level: 2,
  },
  {
    id: 'when-to-turn-erg-off',
    title: 'When to turn ERG off',
    level: 2,
  },
  {
    id: 'the-spiral-of-death-and-how-to-avoid-it',
    title: 'The spiral of death and how to avoid it',
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
        ERG mode is the indoor trainer&apos;s killer feature — and on
        the wrong workout, it is also the reason your session falls
        apart at interval three.
      </p>

      <div className="answer-box" role="note" aria-label="When to use ERG mode">
        <p>
          Use ERG mode for sustained, steady-state work — zone 2 rides,
          sweet spot intervals, threshold sets. The trainer holds your
          target power and removes pacing as a variable, which is
          almost always what you want for those workouts. Switch ERG
          off for VO2 max intervals, sprint work, and any session where
          natural pacing variation matters. The wrong mode can turn a
          5x4 at VO2 into a grinding stall on interval three — the
          well-known &quot;spiral of death.&quot;
        </p>
      </div>

      <h2 id="what-erg-mode-actually-does">What ERG mode actually does</h2>
      <p>
        ERG mode is the smart-trainer feature that holds your power
        output constant regardless of cadence. You set a target — say
        220 watts — and the trainer continuously adjusts resistance to
        keep your wattage there. If you pedal slower, the resistance
        increases; if you pedal faster, it decreases. The number on
        the screen barely moves.
      </p>
      <p>
        That sounds simple. In practice it changes how the workout
        feels in two important ways.
      </p>
      <ul>
        <li>
          <strong>Pacing is removed as a variable.</strong> You cannot
          accidentally drift over target by 10 watts. You also cannot
          back off slightly when an interval is hurting more than
          expected.
        </li>
        <li>
          <strong>Cadence becomes the only thing you control.</strong>{' '}
          Power is fixed by the trainer; the only variable left for the
          rider is how fast the pedals are turning. That is often fine.
          Sometimes it is the problem.
        </li>
      </ul>

      <h2 id="when-erg-is-the-right-call">When ERG mode is the right call</h2>
      <p>
        ERG shines on sustained, steady-state work where holding a
        specific power for a long time is the entire point. The
        clearest cases:
      </p>
      <ul>
        <li>
          <strong>Zone 2 rides.</strong> 60–120 minutes at, say, 60% of
          FTP. ERG keeps you from drifting up into high zone 2 or
          tempo, which is one of the most common reasons indoor zone 2
          rides leave riders flat. (See{' '}
          <Link href="/blog/why-am-i-exhausted-after-zone-2-rides">
            Why am I exhausted after Zone 2 rides
          </Link>
          {' '}for the longer version of that failure mode.)
        </li>
        <li>
          <strong>Sweet spot work.</strong> 2x20, 3x15, or 4x10 at
          ~88–94% of FTP. ERG removes the temptation to ride the
          intervals at threshold, and that matters — sweet spot done
          too hard usually becomes a worse threshold workout, not a
          better sweet spot one.
        </li>
        <li>
          <strong>Steady threshold intervals.</strong> 3x10 or 2x20 at
          FTP. ERG holds you honest, which is what you want when the
          target is the steady stress, not the dynamic effort.
        </li>
      </ul>
      <p>
        For these workouts ERG is the better tool. It produces a
        cleaner stimulus, removes pacing fatigue, and makes the
        cognitive load of the workout low enough that you can actually
        focus on cadence, breathing, and finishing intervals strong.
      </p>

      <h2 id="when-to-turn-erg-off">When to turn ERG off</h2>
      <p>
        ERG is a bad fit anywhere the workout is supposed to feel
        dynamic. The most common cases:
      </p>
      <ul>
        <li>
          <strong>VO2 max intervals.</strong> 5x4, 6x3, or 30/30s
          above FTP. VO2 work depends on producing peak power early
          in each interval and holding it as long as possible. ERG
          delivers the target wattage from second one regardless of
          how hard you press — which removes the over-and-back effort
          pattern that makes VO2 work effective, and sets you up for
          the spiral of death when fatigue arrives.
        </li>
        <li>
          <strong>Sprint work.</strong> 10–20 second maximal efforts.
          ERG cannot respond fast enough to a real sprint — the
          resistance lags, the power reading is unreliable, and
          peak-power numbers will be lower than what your legs
          actually produced. Sprints need resistance or slope mode.
        </li>
        <li>
          <strong>Outdoor-style group efforts.</strong> Race
          simulations, surges, or any workout where varying effort is
          part of the training. ERG flattens that on purpose, which
          is the opposite of what you want.
        </li>
        <li>
          <strong>Cadence-specific work.</strong> If the goal is
          training high-rpm spinning at 110+ rpm or low-rpm strength
          endurance at 60 rpm, ERG decouples cadence from effort and
          undermines the whole point.
        </li>
      </ul>
      <p>
        The practical pattern most experienced indoor cyclists use:
        ERG on for the warm-up and any sustained intervals, ERG off
        for VO2 and sprint intervals, ERG back on for recoveries
        between intervals.
      </p>

      <h2 id="the-spiral-of-death-and-how-to-avoid-it">
        The spiral of death and how to avoid it
      </h2>
      <p>
        The spiral of death is the most-discussed ERG mode failure
        mode for a reason — every indoor cyclist runs into it
        eventually, almost always during VO2 work on tired legs.
      </p>
      <p>
        The mechanism is straightforward. You are doing a 5x4 at VO2,
        target 340 watts. Halfway through interval three your cadence
        starts dropping from 95 rpm to 85. ERG holds 340 watts by
        adding resistance. The added resistance makes cadence drop
        further — 75, then 65 rpm. ERG adds more resistance. Within
        ten to twenty seconds you are at 50 rpm grinding through a
        wall of resistance, your form falls apart, and the interval
        ends in a hard stop. The trainer was doing exactly what it
        was designed to do.
      </p>
      <p>Three reliable ways to avoid it:</p>
      <ul>
        <li>
          <strong>Turn ERG off for VO2 and sprint intervals.</strong>{' '}
          This is the easiest fix and the one most coaches recommend
          for high-intensity work specifically.
        </li>
        <li>
          <strong>Pause-resume.</strong> If you feel the spiral
          starting, pause the workout, soft-pedal for ten seconds,
          then resume. Most training apps handle this gracefully.
        </li>
        <li>
          <strong>Adjust target power downward.</strong> If you are
          spiraling on the third interval of every VO2 session, your
          target is too high for your current state. Drop it by 10–15
          watts and the workout becomes productive again.
        </li>
      </ul>

      <h2 id="how-smartertraining-thinks-about-this">
        How SmarterTraining thinks about this
      </h2>
      <p>
        SmarterTraining is built around the idea that the right
        workout for today depends on how you are showing up. ERG mode
        is a related decision — the right <em>mode</em> for the
        workout depends on whether the stimulus is steady or dynamic.
        The same VO2 set is a different workout in ERG vs. resistance,
        and a coach worth their fee would tell you which one fits the
        session.
      </p>
      <p>
        The bias, as with the workouts themselves, is toward the
        version you will actually complete cleanly. A 2x20 sweet spot
        in ERG that you finish on target is worth more than a 2x20
        sweet spot in resistance mode that drifts ten watts high and
        costs you tomorrow.
      </p>

      <h2 id="takeaway">Takeaway</h2>
      <p className="takeaway">
        <strong>Takeaway:</strong> Use ERG mode for steady-state work
        — zone 2, sweet spot, threshold. Turn it off for VO2 max,
        sprints, and anything where natural pacing variation matters.
        The mode is a tool, not a tier — knowing when to switch is
        the difference between a clean indoor session and one that
        ends in a spiral on interval three.
      </p>
    </>
  )
}
