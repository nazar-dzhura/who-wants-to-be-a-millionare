export interface Answer {
  text: string;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
  correctAnswers: number[];
  prize: number;
}

export interface GameConfig {
  questions: Question[];
}

export type Screen = 'start' | 'game' | 'result';

export type AnswerStatus = 'idle' | 'selected' | 'correct' | 'wrong';

export interface GameState {
  screen: Screen;
  currentQuestionIndex: number;
  selectedAnswerIndex: number | null;
  answerStatus: AnswerStatus;
  score: number;
  questions: Question[];
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'SELECT_ANSWER'; index: number }
  | { type: 'REVEAL_ANSWER' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' };
