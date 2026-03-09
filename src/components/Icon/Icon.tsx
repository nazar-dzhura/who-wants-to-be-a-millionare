import { COLORS } from '@/constants/colors';

interface IconProps {
  name: 'hamburger' | 'close';
  size?: number;
  color?: string;
}

export function Icon({ name, size = 24, color = COLORS.black100 }: IconProps) {
  switch (name) {
    case 'hamburger':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'close':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
