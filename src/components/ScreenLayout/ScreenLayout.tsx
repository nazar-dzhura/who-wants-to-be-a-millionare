import Image from 'next/image';
import type { ReactNode } from 'react';
import styles from './ScreenLayout.module.css';

interface ScreenLayoutProps {
  children: ReactNode;
  variant: 'start' | 'result';
}

export function ScreenLayout({ children, variant }: ScreenLayoutProps) {
  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      {variant === 'start' && <div className={styles.background} />}
      <div className={styles.content}>
        <div className={styles.illustration}>
          <Image
            src="/images/hand1.png"
            alt="Thumbs up"
            width={624}
            height={367}
            priority={variant === 'start'}
            className={styles.handImage}
          />
        </div>
        <div className={styles.info}>
          {children}
        </div>
      </div>
    </div>
  );
}
