import { describe, it, expect } from 'vitest';
import { gameReducer } from '../gameReducer';
import type { GameState, Question } from '@/types/game';

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

function createState(overrides?: Partial<GameState>): GameState {
  return {
    screen: 'start',
    currentQuestionIndex: 0,
    selectedAnswerIndex: null,
    answerStatus: 'idle',
    score: 0,
    questions: mockQuestions,
    ...overrides,
  };
}

describe('gameReducer', () => {
  describe('START_GAME', () => {
    it('sets screen to game', () => {
      const state = createState();
      const result = gameReducer(state, { type: 'START_GAME' });
      expect(result.screen).toBe('game');
    });

    it('resets state when starting from result screen', () => {
      const state = createState({
        screen: 'result',
        currentQuestionIndex: 2,
        score: 1000,
        selectedAnswerIndex: 3,
        answerStatus: 'correct',
      });
      const result = gameReducer(state, { type: 'START_GAME' });
      expect(result.screen).toBe('game');
      expect(result.currentQuestionIndex).toBe(0);
      expect(result.selectedAnswerIndex).toBeNull();
      expect(result.answerStatus).toBe('idle');
      expect(result.score).toBe(0);
    });
  });

  describe('SELECT_ANSWER', () => {
    it('sets selectedAnswerIndex and answerStatus to selected', () => {
      const state = createState({ screen: 'game' });
      const result = gameReducer(state, { type: 'SELECT_ANSWER', index: 2 });
      expect(result.selectedAnswerIndex).toBe(2);
      expect(result.answerStatus).toBe('selected');
    });

    it('does not change state when answerStatus is not idle (selected)', () => {
      const state = createState({
        screen: 'game',
        answerStatus: 'selected',
        selectedAnswerIndex: 1,
      });
      const result = gameReducer(state, { type: 'SELECT_ANSWER', index: 3 });
      expect(result).toBe(state);
      expect(result.selectedAnswerIndex).toBe(1);
    });

    it('does not change state when answerStatus is correct', () => {
      const state = createState({
        screen: 'game',
        answerStatus: 'correct',
        selectedAnswerIndex: 1,
      });
      const result = gameReducer(state, { type: 'SELECT_ANSWER', index: 0 });
      expect(result).toBe(state);
    });

    it('does not change state when answerStatus is wrong', () => {
      const state = createState({
        screen: 'game',
        answerStatus: 'wrong',
        selectedAnswerIndex: 0,
      });
      const result = gameReducer(state, { type: 'SELECT_ANSWER', index: 1 });
      expect(result).toBe(state);
    });
  });

  describe('REVEAL_ANSWER', () => {
    it('sets answerStatus to correct when answer is correct', () => {
      const state = createState({
        screen: 'game',
        currentQuestionIndex: 0,
        selectedAnswerIndex: 1,
        answerStatus: 'selected',
      });
      const result = gameReducer(state, { type: 'REVEAL_ANSWER' });
      expect(result.answerStatus).toBe('correct');
    });

    it('sets answerStatus to wrong when answer is incorrect', () => {
      const state = createState({
        screen: 'game',
        currentQuestionIndex: 0,
        selectedAnswerIndex: 0,
        answerStatus: 'selected',
      });
      const result = gameReducer(state, { type: 'REVEAL_ANSWER' });
      expect(result.answerStatus).toBe('wrong');
    });

    it('handles multiple correct answers', () => {
      const state = createState({
        screen: 'game',
        currentQuestionIndex: 1,
        selectedAnswerIndex: 2,
        answerStatus: 'selected',
      });
      const result = gameReducer(state, { type: 'REVEAL_ANSWER' });
      expect(result.answerStatus).toBe('correct');
    });

    it('returns same state when selectedAnswerIndex is null', () => {
      const state = createState({
        screen: 'game',
        selectedAnswerIndex: null,
        answerStatus: 'idle',
      });
      const result = gameReducer(state, { type: 'REVEAL_ANSWER' });
      expect(result).toBe(state);
    });
  });

  describe('NEXT_QUESTION', () => {
    it('advances to the next question and updates score', () => {
      const state = createState({
        screen: 'game',
        currentQuestionIndex: 0,
        selectedAnswerIndex: 1,
        answerStatus: 'correct',
      });
      const result = gameReducer(state, { type: 'NEXT_QUESTION' });
      expect(result.currentQuestionIndex).toBe(1);
      expect(result.score).toBe(500);
      expect(result.selectedAnswerIndex).toBeNull();
      expect(result.answerStatus).toBe('idle');
    });

    it('goes to result screen on last question', () => {
      const state = createState({
        screen: 'game',
        currentQuestionIndex: 2,
        selectedAnswerIndex: 3,
        answerStatus: 'correct',
      });
      const result = gameReducer(state, { type: 'NEXT_QUESTION' });
      expect(result.screen).toBe('result');
      expect(result.score).toBe(2000);
      expect(result.selectedAnswerIndex).toBeNull();
      expect(result.answerStatus).toBe('idle');
    });

    it('accumulates score based on current question prize', () => {
      const state = createState({
        screen: 'game',
        currentQuestionIndex: 1,
        selectedAnswerIndex: 0,
        answerStatus: 'correct',
        score: 500,
      });
      const result = gameReducer(state, { type: 'NEXT_QUESTION' });
      expect(result.currentQuestionIndex).toBe(2);
      expect(result.score).toBe(1000);
    });
  });

  describe('END_GAME', () => {
    it('goes to result screen with score from previous question', () => {
      const state = createState({
        screen: 'game',
        currentQuestionIndex: 2,
        selectedAnswerIndex: 0,
        answerStatus: 'wrong',
      });
      const result = gameReducer(state, { type: 'END_GAME' });
      expect(result.screen).toBe('result');
      expect(result.score).toBe(1000);
      expect(result.selectedAnswerIndex).toBeNull();
      expect(result.answerStatus).toBe('idle');
    });

    it('returns score 0 when failing on the first question', () => {
      const state = createState({
        screen: 'game',
        currentQuestionIndex: 0,
        selectedAnswerIndex: 0,
        answerStatus: 'wrong',
      });
      const result = gameReducer(state, { type: 'END_GAME' });
      expect(result.screen).toBe('result');
      expect(result.score).toBe(0);
    });

    it('calculates score correctly from second question', () => {
      const state = createState({
        screen: 'game',
        currentQuestionIndex: 1,
        selectedAnswerIndex: 1,
        answerStatus: 'wrong',
      });
      const result = gameReducer(state, { type: 'END_GAME' });
      expect(result.screen).toBe('result');
      expect(result.score).toBe(500);
    });
  });

  describe('RESET_GAME', () => {
    it('returns to initial state', () => {
      const state = createState({
        screen: 'result',
        currentQuestionIndex: 2,
        score: 2000,
        selectedAnswerIndex: 3,
        answerStatus: 'correct',
      });
      const result = gameReducer(state, { type: 'RESET_GAME' });
      expect(result.screen).toBe('start');
      expect(result.currentQuestionIndex).toBe(0);
      expect(result.selectedAnswerIndex).toBeNull();
      expect(result.answerStatus).toBe('idle');
      expect(result.score).toBe(0);
    });

    it('returns a new object (not the same reference)', () => {
      const state = createState();
      const result = gameReducer(state, { type: 'RESET_GAME' });
      expect(result).not.toBe(state);
    });
  });

  describe('unknown action', () => {
    it('returns the current state for unknown action types', () => {
      const state = createState({ screen: 'game' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = gameReducer(state, { type: 'UNKNOWN' } as any);
      expect(result).toBe(state);
    });
  });
});
