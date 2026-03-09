import type { AnswerStatus } from '@/types/game';

export const COLORS = {
  orange100: '#FF8B37',
  black100: '#1C1C21',
  black40: '#D0D0D8',
  green100: '#47D867',
  green5: '#E6FAEA',
  red100: '#EC6259',
  red5: '#FDEEED',
  orange5: '#FFF3EB',
  white: '#FFFFFF',
} as const;

export const ANSWER_STATE_COLORS: Record<AnswerStatus, { stroke: string; fill: string }> = {
  idle: { stroke: COLORS.black40, fill: COLORS.white },
  selected: { stroke: COLORS.orange100, fill: COLORS.orange5 },
  correct: { stroke: COLORS.green100, fill: COLORS.green5 },
  wrong: { stroke: COLORS.red100, fill: COLORS.red5 },
};

export type StepStatus = 'inactive' | 'current' | 'finished';

export const STEP_STATE_COLORS: Record<StepStatus, { stroke: string; text: string }> = {
  inactive: { stroke: COLORS.black40, text: COLORS.black100 },
  current: { stroke: COLORS.orange100, text: COLORS.orange100 },
  finished: { stroke: COLORS.black40, text: COLORS.black40 },
};
