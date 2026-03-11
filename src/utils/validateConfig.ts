import type { Question } from '@/types/game';

export function validateQuestions(questions: unknown): Question[] {
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('Game config must contain at least one question');
  }

  return questions.map((q, i) => {
    if (!q || typeof q !== 'object') {
      throw new Error(`Question ${i + 1}: must be an object`);
    }

    const question = q as Record<string, unknown>;

    if (typeof question.text !== 'string' || question.text.trim() === '') {
      throw new Error(`Question ${i + 1}: must have a non-empty text`);
    }

    if (!Array.isArray(question.answers) || question.answers.length < 2) {
      throw new Error(`Question ${i + 1}: must have at least 2 answers`);
    }

    for (const [j, answer] of question.answers.entries()) {
      if (!answer || typeof answer !== 'object' || typeof (answer as Record<string, unknown>).text !== 'string') {
        throw new Error(`Question ${i + 1}, Answer ${j + 1}: must have a text property`);
      }
    }

    if (!Array.isArray(question.correctAnswers) || question.correctAnswers.length === 0) {
      throw new Error(`Question ${i + 1}: must have at least one correct answer`);
    }

    for (const idx of question.correctAnswers) {
      if (typeof idx !== 'number' || idx < 0 || idx >= (question.answers as unknown[]).length) {
        throw new Error(`Question ${i + 1}: correctAnswers contains invalid index ${idx}`);
      }
    }

    if (typeof question.prize !== 'number' || question.prize <= 0) {
      throw new Error(`Question ${i + 1}: must have a positive prize`);
    }

    return {
      id: typeof question.id === 'number' ? question.id : i + 1,
      text: question.text as string,
      answers: (question.answers as { text: string }[]),
      correctAnswers: question.correctAnswers as number[],
      prize: question.prize as number,
    };
  });
}
