import type { Question } from '@/types/game';
import { MoneyLadder } from '@/components/MoneyLadder/MoneyLadder';
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6L6 18" stroke="#1C1C21" strokeWidth="2" strokeLinecap="round" />
        </svg>
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
