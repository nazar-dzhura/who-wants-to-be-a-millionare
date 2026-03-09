import type { Question } from '@/types/game';
import { MoneyLadder } from '@/components/MoneyLadder/MoneyLadder';
import { Icon } from '@/components/Icon/Icon';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  currentIndex: number;
}

export function MobileMenu({
  isOpen,
  onClose,
  questions,
  currentIndex,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close menu"
      >
        <Icon name="close" />
      </button>
      <div className={styles.content}>
        <MoneyLadder
          questions={questions}
          currentIndex={currentIndex}
          variant="mobile"
        />
      </div>
    </div>
  );
}
