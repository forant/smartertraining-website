import type { Category, CategorySlug } from './types'

export const CATEGORIES: Record<CategorySlug, Category> = {
  'adaptive-training': {
    slug: 'adaptive-training',
    name: 'Adaptive Training',
    title: 'Adaptive Training — coaching that adjusts to real life',
    description:
      'How adaptive coaching, flexible plans, and AI guidance keep your training on track when life keeps moving the goalposts.',
    intro:
      'Adaptive training means your plan reacts to your body and your week — not the other way around. Articles here cover how flexible coaching, AI-assisted decisions, and daily check-ins replace rigid blocks with something you can actually finish.',
    theme:
      'adaptive coaching, flexible plans, AI coaching, real-life scheduling',
    relatedCategories: ['training-philosophy', 'time-crunched-cycling'],
  },
  'time-crunched-cycling': {
    slug: 'time-crunched-cycling',
    name: 'Time-Crunched Cycling',
    title: 'Time-Crunched Cycling — training around a busy life',
    description:
      'Cycling training plans, tactics, and mindset for busy professionals, parents, and anyone with an unpredictable schedule.',
    intro:
      'You have a full life and a few hours a week. These articles focus on how to train productively when you can ride 3–5 times a week, your schedule changes mid-week, and "perfect blocks" are not on the table.',
    theme:
      'busy professionals, parents, limited time, inconsistent schedules',
    relatedCategories: ['adaptive-training', 'cycling-workouts'],
  },
  'indoor-cycling': {
    slug: 'indoor-cycling',
    name: 'Indoor Cycling',
    title: 'Indoor Cycling — smart trainers, ERG mode, and consistency',
    description:
      'Smart trainer setup, ERG vs. resistance, trainer workouts, and tips for staying consistent on the indoor bike.',
    intro:
      'Indoor riding is where consistency gets won or lost. Articles here cover smart trainer setup, how to use ERG mode well, structured trainer workouts, and how to stay engaged when you ride indoors year-round.',
    theme:
      'smart trainers, trainer workouts, ERG mode, indoor riding consistency',
    relatedCategories: ['cycling-workouts', 'adaptive-training'],
  },
  'recovery-fatigue': {
    slug: 'recovery-fatigue',
    name: 'Recovery & Fatigue',
    title: 'Recovery & Fatigue — when to push and when to back off',
    description:
      'How to read your body, manage fatigue, sleep poorly without ruining a week, and decide when to skip or modify a workout.',
    intro:
      'Most training mistakes happen in the gray zone between "I feel a bit off" and "I should rest." Articles here cover recovery, sleep, stress, soreness, and how to decide when to back off without losing momentum.',
    theme: 'recovery, soreness, sleep, stress, fatigue, when to skip workouts',
    relatedCategories: ['adaptive-training', 'training-philosophy'],
  },
  'cycling-workouts': {
    slug: 'cycling-workouts',
    name: 'Cycling Workouts',
    title: 'Cycling Workouts — zones, intervals, and sequencing',
    description:
      'Zone 2, sweet spot, threshold, VO2 max — how each cycling workout type works and when to use it in a real plan.',
    intro:
      'A workout is only useful in context. These articles break down zone 2, sweet spot, threshold, and VO2 max work — what each does, who it suits, and how to sequence them across a busy week.',
    theme: 'zone 2, sweet spot, threshold, VO2 max, workout sequencing',
    relatedCategories: ['indoor-cycling', 'time-crunched-cycling'],
  },
  'training-philosophy': {
    slug: 'training-philosophy',
    name: 'Training Philosophy',
    title: 'Training Philosophy — sustainable training for real life',
    description:
      'Consistency over perfection, sustainable training, and how to keep showing up when motivation, schedule, and energy keep changing.',
    intro:
      'How you think about training matters more than any single workout. Articles here are about consistency, sustainable habits, dropping perfectionism, and training for the long game.',
    theme:
      'consistency, sustainable training, avoiding perfectionism, training for real life',
    relatedCategories: ['adaptive-training', 'recovery-fatigue'],
  },
  comparisons: {
    slug: 'comparisons',
    name: 'Comparisons',
    title: 'Comparisons — cycling apps, plans, and coaching approaches',
    description:
      'Honest comparisons of cycling training apps, AI coaching vs. static plans, and how to choose the right tool for your training.',
    intro:
      'Cycling apps look more alike than they are. These articles compare TrainerRoad, Zwift, AI coaching, static plans, and other options against the kind of training real, busy riders actually do.',
    theme:
      'TrainerRoad alternatives, Zwift alternatives, AI coaching vs static plans, app comparisons',
    relatedCategories: ['adaptive-training', 'indoor-cycling'],
  },
}

export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as CategorySlug[]

export function getCategory(slug: CategorySlug): Category {
  return CATEGORIES[slug]
}

export function getAllCategories(): Category[] {
  return CATEGORY_SLUGS.map((slug) => CATEGORIES[slug])
}
