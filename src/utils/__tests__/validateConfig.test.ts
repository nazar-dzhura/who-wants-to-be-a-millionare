import { describe, it, expect } from 'vitest';
import { validateQuestions } from '../validateConfig';

const validQuestion = {
  id: 1,
  text: 'What is 2+2?',
  answers: [{ text: '3' }, { text: '4' }, { text: '5' }, { text: '6' }],
  correctAnswers: [1],
  prize: 500,
};

describe('validateQuestions', () => {
  it('accepts a valid config and returns typed questions', () => {
    const result = validateQuestions([validQuestion]);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(validQuestion);
  });

  it('assigns auto-incremented id when id is missing', () => {
    const { text, answers, correctAnswers, prize } = validQuestion;
    const result = validateQuestions([{ text, answers, correctAnswers, prize }]);
    expect(result[0].id).toBe(1);
  });

  it('throws on empty array', () => {
    expect(() => validateQuestions([])).toThrow(
      'Game config must contain at least one question',
    );
  });

  it('throws on non-array input', () => {
    expect(() => validateQuestions('not an array')).toThrow(
      'Game config must contain at least one question',
    );
  });

  it('throws when question is not an object', () => {
    expect(() => validateQuestions([null])).toThrow(
      'Question 1: must be an object',
    );
    expect(() => validateQuestions([42])).toThrow(
      'Question 1: must be an object',
    );
  });

  it('throws when text is missing', () => {
    const q = { ...validQuestion, text: undefined };
    expect(() => validateQuestions([q])).toThrow(
      'Question 1: must have a non-empty text',
    );
  });

  it('throws when text is empty', () => {
    const q = { ...validQuestion, text: '   ' };
    expect(() => validateQuestions([q])).toThrow(
      'Question 1: must have a non-empty text',
    );
  });

  it('throws when there are fewer than 2 answers', () => {
    const q = { ...validQuestion, answers: [{ text: 'A' }] };
    expect(() => validateQuestions([q])).toThrow(
      'Question 1: must have at least 2 answers',
    );
  });

  it('throws when an answer lacks a text property', () => {
    const q = { ...validQuestion, answers: [{ text: 'A' }, { label: 'B' }] };
    expect(() => validateQuestions([q])).toThrow(
      'Question 1, Answer 2: must have a text property',
    );
  });

  it('throws when correctAnswers is missing', () => {
    const q = { ...validQuestion, correctAnswers: undefined };
    expect(() => validateQuestions([q])).toThrow(
      'Question 1: must have at least one correct answer',
    );
  });

  it('throws when correctAnswers is empty', () => {
    const q = { ...validQuestion, correctAnswers: [] };
    expect(() => validateQuestions([q])).toThrow(
      'Question 1: must have at least one correct answer',
    );
  });

  it('throws when correctAnswers contains an out-of-bounds index', () => {
    const q = { ...validQuestion, correctAnswers: [10] };
    expect(() => validateQuestions([q])).toThrow(
      'Question 1: correctAnswers contains invalid index 10',
    );
  });

  it('throws when correctAnswers contains a negative index', () => {
    const q = { ...validQuestion, correctAnswers: [-1] };
    expect(() => validateQuestions([q])).toThrow(
      'Question 1: correctAnswers contains invalid index -1',
    );
  });

  it('throws when prize is missing', () => {
    const q = { ...validQuestion, prize: undefined };
    expect(() => validateQuestions([q])).toThrow(
      'Question 1: must have a positive prize',
    );
  });

  it('throws when prize is zero', () => {
    const q = { ...validQuestion, prize: 0 };
    expect(() => validateQuestions([q])).toThrow(
      'Question 1: must have a positive prize',
    );
  });

  it('throws when prize is negative', () => {
    const q = { ...validQuestion, prize: -100 };
    expect(() => validateQuestions([q])).toThrow(
      'Question 1: must have a positive prize',
    );
  });
});
