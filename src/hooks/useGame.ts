'use client';

import { useContext, useMemo } from 'react';
import { GameContext } from '@/context/GameContext';

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }

  const { state, dispatch } = context;

  const actions = useMemo(() => ({
    startGame: () => dispatch({ type: 'START_GAME' }),
    selectAnswer: (index: number) => dispatch({ type: 'SELECT_ANSWER', index }),
    revealAnswer: () => dispatch({ type: 'REVEAL_ANSWER' }),
    nextQuestion: () => dispatch({ type: 'NEXT_QUESTION' }),
    endGame: () => dispatch({ type: 'END_GAME' }),
    resetGame: () => dispatch({ type: 'RESET_GAME' }),
  }), [dispatch]);

  return { state, ...actions };
}
