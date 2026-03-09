'use client';

import { useGame } from '@/hooks/useGame';
import { StartScreen } from '@/components/StartScreen/StartScreen';
import { GameScreen } from '@/components/GameScreen/GameScreen';
import { ResultScreen } from '@/components/ResultScreen/ResultScreen';

export default function Home() {
  const { state } = useGame();

  switch (state.screen) {
    case 'game':
      return <GameScreen />;
    case 'result':
      return <ResultScreen />;
    default:
      return <StartScreen />;
  }
}
