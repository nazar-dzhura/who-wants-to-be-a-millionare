'use client';

import Image from 'next/image';
import { useGame } from '@/hooks/useGame';
import { Button } from '@/components/Button/Button';
import { formatCurrency } from '@/utils/formatCurrency';
import styles from './ResultScreen.module.css';

export function ResultScreen() {
  const { state, resetGame } = useGame();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.illustration}>
          <Image
            src="/images/hand1.png"
            alt="Thumbs up"
            width={624}
            height={367}
            className={styles.handImage}
          />
        </div>
        <div className={styles.info}>
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
        </div>
      </div>
    </div>
  );
}
