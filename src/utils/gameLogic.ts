import type { Question } from '@/types/game';

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
