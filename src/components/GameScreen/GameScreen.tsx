'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useGame } from '@/hooks/useGame';
import { AnswerOption } from '@/components/AnswerOption/AnswerOption';
import { MoneyLadder } from '@/components/MoneyLadder/MoneyLadder';
import { MobileMenu } from '@/components/MobileMenu/MobileMenu';
import { Icon } from '@/components/Icon/Icon';
import { isAnswerCorrect } from '@/utils/gameLogic';
import type { AnswerStatus } from '@/types/game';
import styles from './GameScreen.module.css';

export function GameScreen() {
  const {
    state,
    selectAnswer,
    revealAnswer,
    nextQuestion,
    endGame,
  } = useGame();
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

    selectAnswer(index);

    revealTimerRef.current = setTimeout(() => {
      revealAnswer();

      advanceTimerRef.current = setTimeout(() => {
        const question = questions[currentQuestionIndex];
        if (isAnswerCorrect(question, index)) {
          nextQuestion();
        } else {
          endGame();
        }
      }, 1500);
    }, 1000);
  }, [answerStatus, selectAnswer, revealAnswer, nextQuestion, endGame, questions, currentQuestionIndex]);

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
            <Icon name="hamburger" />
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
