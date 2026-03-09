'use client';

import { useGame } from '@/hooks/useGame';
import { ScreenLayout } from '@/components/ScreenLayout/ScreenLayout';
import { Button } from '@/components/Button/Button';
import styles from './StartScreen.module.css';

export function StartScreen() {
  const { startGame } = useGame();

  return (
    <ScreenLayout variant="start">
      <h1 className={styles.title}>
        Who wants to be
        {' '}
        a&nbsp;millionaire?
      </h1>
      <Button onClick={startGame}>
        Start
      </Button>
    </ScreenLayout>
  );
}
