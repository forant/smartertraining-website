import type { Author } from './types'

export const AUTHORS: Record<string, Author> = {
  smartertraining: {
    id: 'smartertraining',
    name: 'SmarterTraining',
    bio: 'Adaptive indoor cycling coaching for busy amateur cyclists. Training that adjusts to your fatigue, schedule, and goals.',
    url: 'https://smartertraining.ai',
  },
}

export const DEFAULT_AUTHOR_ID = 'smartertraining'

export function getAuthor(id: string): Author {
  return AUTHORS[id] ?? AUTHORS[DEFAULT_AUTHOR_ID]
}
