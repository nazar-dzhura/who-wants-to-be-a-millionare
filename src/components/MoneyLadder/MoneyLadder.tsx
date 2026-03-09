import { formatCurrency } from '@/utils/formatCurrency';
import type { Question } from '@/types/game';
import styles from './MoneyLadder.module.css';

interface MoneyLadderProps {
  questions: Question[];
  currentIndex: number;
  variant?: 'desktop' | 'mobile';
}

type StepStatus = 'inactive' | 'current' | 'finished';

const STEP_COLORS: Record<StepStatus, { stroke: string; text: string }> = {
  inactive: { stroke: '#D0D0D8', text: '#1C1C21' },
  current: { stroke: '#FF8B37', text: '#FF8B37' },
  finished: { stroke: '#D0D0D8', text: '#D0D0D8' },
};

function StepSvg({ stroke }: { stroke: string }) {
  return (
    <svg
      className={styles.stepShape}
      viewBox="0 0 376 40"
      fill="none"
      preserveAspectRatio="none"
    >
      <line
        x1="0" y1="20" x2="68" y2="20"
        stroke={stroke}
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="308" y1="20" x2="376" y2="20"
        stroke={stroke}
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        points="68,20 80,0.5 296,0.5 308,20 296,39.5 80,39.5"
        fill="white"
        stroke={stroke}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function MoneyLadder({
  questions,
  currentIndex,
  variant = 'desktop',
}: MoneyLadderProps) {
  return (
    <ul className={`${styles.ladder} ${styles[variant]}`}>
      {[...questions].reverse().map((question, reverseIdx) => {
        const originalIdx = questions.length - 1 - reverseIdx;
        let status: StepStatus = 'inactive';
        if (originalIdx === currentIndex) status = 'current';
        else if (originalIdx < currentIndex) status = 'finished';

        const colors = STEP_COLORS[status];

        return (
          <li key={question.id} className={styles.step}>
            <StepSvg stroke={colors.stroke} />
            <span
              className={styles.stepText}
              style={{ color: colors.text }}
            >
              {formatCurrency(question.prize)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
