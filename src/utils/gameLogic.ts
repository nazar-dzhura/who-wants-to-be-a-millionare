import type { Question, AnswerStatus } from '@/types/game';

export function isAnswerCorrect(
  question: Question,
  selectedIndex: number,
): boolean {
  return question.correctAnswers.includes(selectedIndex);
}

export function calculateScore(
  questions: Question[],
  lastCorrectIndex: number,
): number {
  if (lastCorrectIndex < 0) return 0;
  return questions[lastCorrectIndex].prize;
}

export function getLetterPrefix(index: number): string {
  return String.fromCharCode(65 + index);
}

export function getAnswerDisplayStatus(
  index: number,
  selectedIndex: number | null,
  answerStatus: AnswerStatus,
  correctAnswers: number[],
): AnswerStatus {
  if (answerStatus === 'idle') return 'idle';
  if (index === selectedIndex) return answerStatus;
  if (answerStatus === 'wrong' && correctAnswers.includes(index)) return 'correct';
  return 'idle';
}
