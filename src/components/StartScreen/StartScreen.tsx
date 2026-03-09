'use client';

import Image from 'next/image';
import { useGame } from '@/hooks/useGame';
import { Button } from '@/components/Button/Button';
import styles from './StartScreen.module.css';

export function StartScreen() {
  const { dispatch } = useGame();

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.content}>
        <div className={styles.illustration}>
          <Image
            src="/images/hand1.png"
            alt="Thumbs up"
            width={624}
            height={367}
            priority
            className={styles.handImage}
          />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>
            Who wants to be
            {' '}
            a&nbsp;millionaire?
          </h1>
          <Button onClick={() => dispatch({ type: 'START_GAME' })}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}
