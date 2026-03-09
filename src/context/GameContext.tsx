'use client';

import {
  createContext,
  useReducer,
  useMemo,
  type ReactNode,
  type Dispatch,
} from 'react';
import type { GameState, GameAction } from '@/types/game';
import { isAnswerCorrect } from '@/utils/gameLogic';
import gameData from '@/data/questions.json';

const { questions } = gameData;

const initialState: GameState = {
  screen: 'start',
  currentQuestionIndex: 0,
  selectedAnswerIndex: null,
  answerStatus: 'idle',
  score: 0,
  questions,
};

function gameReducer(state: GameState, action: GameAction): GameState {
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
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (nextIndex >= state.questions.length) {
        return {
          ...state,
          screen: 'result',
          score: currentQuestion.prize,
          answerStatus: 'idle',
          selectedAnswerIndex: null,
        };
      }
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        selectedAnswerIndex: null,
        answerStatus: 'idle',
        score: currentQuestion.prize,
      };
    }

    case 'END_GAME': {
      const prevIndex = state.currentQuestionIndex - 1;
      const earnedScore = prevIndex >= 0 ? state.questions[prevIndex].prize : 0;
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

export const GameContext = createContext<{
  state: GameState;
  dispatch: Dispatch<GameAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}
