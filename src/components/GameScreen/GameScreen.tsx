'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useGame } from '@/hooks/useGame';
import { AnswerOption } from '@/components/AnswerOption/AnswerOption';
import { MoneyLadder } from '@/components/MoneyLadder/MoneyLadder';
import { MobileMenu } from '@/components/MobileMenu/MobileMenu';
import type { AnswerStatus } from '@/types/game';
import styles from './GameScreen.module.css';

export function GameScreen() {
  const { state, dispatch } = useGame();
  const [menuOpen, setMenuOpen] = useState(false);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    questions,
    currentQuestionIndex,
    selectedAnswerIndex,
    answerStatus,
  } = state;

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => () => {
    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
  }, []);

  const handleSelectAnswer = useCallback((index: number) => {
    if (answerStatus !== 'idle') return;

    dispatch({ type: 'SELECT_ANSWER', index });

    revealTimerRef.current = setTimeout(() => {
      dispatch({ type: 'REVEAL_ANSWER' });

      advanceTimerRef.current = setTimeout(() => {
        const question = questions[currentQuestionIndex];
        const isCorrect = question.correctAnswers.includes(index);
        if (isCorrect) {
          dispatch({ type: 'NEXT_QUESTION' });
        } else {
          dispatch({ type: 'END_GAME' });
        }
      }, 1500);
    }, 1000);
  }, [answerStatus, dispatch, questions, currentQuestionIndex]);

  const getAnswerStatus = (index: number): AnswerStatus => {
    if (answerStatus === 'idle') return 'idle';

    if (index === selectedAnswerIndex) {
      return answerStatus;
    }

    if (
      answerStatus === 'wrong'
      && currentQuestion.correctAnswers.includes(index)
    ) {
      return 'correct';
    }

    return 'idle';
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.questionSection}>
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open money ladder"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="#1C1C21" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <h2 className={styles.questionText}>{currentQuestion.text}</h2>
        </div>
        <div className={styles.answersGrid}>
          {currentQuestion.answers.map((answer, index) => (
            <AnswerOption
              key={answer.text}
              index={index}
              text={answer.text}
              status={getAnswerStatus(index)}
              disabled={answerStatus !== 'idle'}
              onClick={() => handleSelectAnswer(index)}
            />
          ))}
        </div>
      </div>
      <aside className={styles.sidebar}>
        <MoneyLadder
          questions={questions}
          currentIndex={currentQuestionIndex}
        />
      </aside>
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        questions={questions}
        currentIndex={currentQuestionIndex}
      />
    </div>
  );
}
