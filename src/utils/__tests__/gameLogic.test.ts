import { describe, it, expect } from 'vitest';
import { isAnswerCorrect, calculateScore, getLetterPrefix, getAnswerDisplayStatus } from '../gameLogic';
import type { Question } from '@/types/game';

const mockQuestions: Question[] = [
  {
    id: 1,
    text: 'Question 1?',
    answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
    correctAnswers: [1],
    prize: 500,
  },
  {
    id: 2,
    text: 'Question 2?',
    answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
    correctAnswers: [0, 2],
    prize: 1000,
  },
  {
    id: 3,
    text: 'Question 3?',
    answers: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
    correctAnswers: [3],
    prize: 2000,
  },
];

describe('isAnswerCorrect', () => {
  it('returns true for a correct answer', () => {
    expect(isAnswerCorrect(mockQuestions[0], 1)).toBe(true);
  });

  it('returns false for an incorrect answer', () => {
    expect(isAnswerCorrect(mockQuestions[0], 0)).toBe(false);
  });

  it('handles multiple correct answers', () => {
    expect(isAnswerCorrect(mockQuestions[1], 0)).toBe(true);
    expect(isAnswerCorrect(mockQuestions[1], 2)).toBe(true);
    expect(isAnswerCorrect(mockQuestions[1], 1)).toBe(false);
  });
});

describe('calculateScore', () => {
  it('returns 0 when no questions answered correctly', () => {
    expect(calculateScore(mockQuestions, -1)).toBe(0);
  });

  it('returns the prize of the last correctly answered question', () => {
    expect(calculateScore(mockQuestions, 0)).toBe(500);
    expect(calculateScore(mockQuestions, 1)).toBe(1000);
    expect(calculateScore(mockQuestions, 2)).toBe(2000);
  });
});

describe('getLetterPrefix', () => {
  it('returns correct letter for index', () => {
    expect(getLetterPrefix(0)).toBe('A');
    expect(getLetterPrefix(1)).toBe('B');
    expect(getLetterPrefix(2)).toBe('C');
    expect(getLetterPrefix(3)).toBe('D');
  });

  it('handles indices beyond D', () => {
    expect(getLetterPrefix(4)).toBe('E');
    expect(getLetterPrefix(25)).toBe('Z');
  });
});

describe('getAnswerDisplayStatus', () => {
  const correctAnswers = [1];

  it('returns idle when answerStatus is idle', () => {
    expect(getAnswerDisplayStatus(0, null, 'idle', correctAnswers)).toBe('idle');
    expect(getAnswerDisplayStatus(1, null, 'idle', correctAnswers)).toBe('idle');
  });

  it('returns selected for the selected answer', () => {
    expect(getAnswerDisplayStatus(2, 2, 'selected', correctAnswers)).toBe('selected');
  });

  it('returns idle for non-selected answers during selection', () => {
    expect(getAnswerDisplayStatus(0, 2, 'selected', correctAnswers)).toBe('idle');
  });

  it('returns correct for the selected answer when correct', () => {
    expect(getAnswerDisplayStatus(1, 1, 'correct', correctAnswers)).toBe('correct');
  });

  it('returns wrong for the selected answer when wrong', () => {
    expect(getAnswerDisplayStatus(0, 0, 'wrong', correctAnswers)).toBe('wrong');
  });

  it('highlights correct answer when a wrong answer is selected', () => {
    expect(getAnswerDisplayStatus(1, 0, 'wrong', correctAnswers)).toBe('correct');
  });

  it('returns idle for non-selected non-correct answers when wrong', () => {
    expect(getAnswerDisplayStatus(2, 0, 'wrong', correctAnswers)).toBe('idle');
  });
});
