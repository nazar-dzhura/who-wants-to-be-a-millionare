'use client';

import { useGame } from '@/hooks/useGame';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { Button } from '@/components/Button/Button';
import { formatCurrency } from '@/utils/formatCurrency';
import styles from './ResultScreen.module.css';

export function ResultScreen() {
  const { state, resetGame } = useGame();

  return (
    <ScreenLayout variant="result">
      <div className={styles.scoreBlock}>
        <p className={styles.label}>Total score:</p>
        <h2 className={styles.score}>
          {formatCurrency(state.score)}
          {' '}
          earned
        </h2>
      </div>
      <Button onClick={resetGame}>
        Try again
      </Button>
    </ScreenLayout>
  );
}
