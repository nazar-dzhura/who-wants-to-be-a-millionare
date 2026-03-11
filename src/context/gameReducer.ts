import type { GameState, GameAction } from '@/types/game';
import { isAnswerCorrect, calculateScore } from '@/utils/gameLogic';
import { validateQuestions } from '@/utils/validateConfig';
import gameData from '@/data/questions.json';

const questions = validateQuestions(gameData.questions);

export const initialState: GameState = {
  screen: 'start',
  currentQuestionIndex: 0,
  selectedAnswerIndex: null,
  answerStatus: 'idle',
  score: 0,
  questions,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        screen: 'game',
      };

    case 'SELECT_ANSWER':
      if (state.answerStatus !== 'idle') return state;
      return {
        ...state,
        selectedAnswerIndex: action.index,
        answerStatus: 'selected',
      };

    case 'REVEAL_ANSWER': {
      if (state.selectedAnswerIndex === null) return state;
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const correct = isAnswerCorrect(currentQuestion, state.selectedAnswerIndex);
      return {
        ...state,
        answerStatus: correct ? 'correct' : 'wrong',
      };
    }

    case 'NEXT_QUESTION': {
      const nextIndex = state.currentQuestionIndex + 1;
      const newScore = calculateScore(state.questions, state.currentQuestionIndex);
      if (nextIndex >= state.questions.length) {
        return {
          ...state,
          screen: 'result',
          score: newScore,
          answerStatus: 'idle',
          selectedAnswerIndex: null,
        };
      }
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        selectedAnswerIndex: null,
        answerStatus: 'idle',
        score: newScore,
      };
    }

    case 'END_GAME': {
      const earnedScore = calculateScore(state.questions, state.currentQuestionIndex - 1);
      return {
        ...state,
        screen: 'result',
        score: earnedScore,
        answerStatus: 'idle',
        selectedAnswerIndex: null,
      };
    }

    case 'RESET_GAME':
      return { ...initialState };

    default:
      return state;
  }
}
