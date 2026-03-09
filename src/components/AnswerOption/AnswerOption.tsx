import type { AnswerStatus } from '@/types/game';
import { getLetterPrefix } from '@/utils/gameLogic';
import { ANSWER_STATE_COLORS, COLORS } from '@/constants/colors';
import styles from './AnswerOption.module.css';

interface AnswerOptionProps {
  index: number;
  text: string;
  status: AnswerStatus;
  disabled: boolean;
  onClick: () => void;
}

function HexSvg({ stroke, fill }: { stroke: string; fill: string }) {
  return (
    <svg
      className={styles.shape}
      viewBox="0 0 421 72"
      fill="none"
      preserveAspectRatio="none"
    >
      <line
        x1="0" y1="36" x2="17" y2="36"
        stroke={stroke}
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="404" y1="36" x2="421" y2="36"
        stroke={stroke}
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        points="17,36 37,0.5 384,0.5 404,36 384,71.5 37,71.5"
        fill={fill}
        stroke={stroke}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function AnswerOption({
  index,
  text,
  status,
  disabled,
  onClick,
}: AnswerOptionProps) {
  const colors = ANSWER_STATE_COLORS[status];
  const hoverClass = status === 'idle' && !disabled ? styles.hoverable : '';

  return (
    <button
      type="button"
      className={`${styles.option} ${hoverClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      <HexSvg stroke={colors.stroke} fill={colors.fill} />
      <span className={styles.hoverShape}>
        <HexSvg stroke={COLORS.orange100} fill={COLORS.white} />
      </span>
      <span className={styles.content}>
        <span className={styles.letter}>{getLetterPrefix(index)}</span>
        <span className={styles.text}>{text}</span>
      </span>
    </button>
  );
}
