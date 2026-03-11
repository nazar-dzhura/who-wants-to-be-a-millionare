import { formatCurrency } from '@/utils/formatCurrency';
import type { Question, StepStatus } from '@/types/game';
import { STEP_STATE_COLORS } from '@/constants/colors';
import styles from './MoneyLadder.module.css';

interface MoneyLadderProps {
  questions: Question[];
  currentIndex: number;
  variant?: 'desktop' | 'mobile';
}

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

function MoneyStep({ prize, status }: { prize: number; status: StepStatus }) {
  const colors = STEP_STATE_COLORS[status];

  return (
    <li className={styles.step}>
      <StepSvg stroke={colors.stroke} />
      <span
        className={styles.stepText}
        style={{ color: colors.text }}
      >
        {formatCurrency(prize)}
      </span>
    </li>
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

        return (
          <MoneyStep
            key={question.id}
            prize={question.prize}
            status={status}
          />
        );
      })}
    </ul>
  );
}
