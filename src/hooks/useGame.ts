'use client';

import { useContext, useCallback } from 'react';
import { GameContext } from '@/context/GameContext';

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }

  const { state, dispatch } = context;

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, [dispatch]);

  const selectAnswer = useCallback((index: number) => {
    dispatch({ type: 'SELECT_ANSWER', index });
  }, [dispatch]);

  const revealAnswer = useCallback(() => {
    dispatch({ type: 'REVEAL_ANSWER' });
  }, [dispatch]);

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, [dispatch]);

  const endGame = useCallback(() => {
    dispatch({ type: 'END_GAME' });
  }, [dispatch]);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, [dispatch]);

  return {
    state,
    startGame,
    selectAnswer,
    revealAnswer,
    nextQuestion,
    endGame,
    resetGame,
  };
}
