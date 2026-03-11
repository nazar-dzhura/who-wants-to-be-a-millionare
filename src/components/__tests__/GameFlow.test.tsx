import { render, screen, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GameProvider } from '@/context/GameContext';
import Home from '@/app/page';

function renderApp() {
  return render(
    <GameProvider>
      <Home />
    </GameProvider>,
  );
}

describe('Game flow integration', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('renders start screen initially', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: /who wants to be/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('navigates from start to game screen', async () => {
    renderApp();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    await user.click(screen.getByRole('button', { name: /start/i }));

    expect(screen.getByText(/what is the chemical symbol for water/i)).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('H2O')).toBeInTheDocument();
  });

  it('shows correct answer highlight, then advances to next question', async () => {
    renderApp();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    await user.click(screen.getByRole('button', { name: /start/i }));

    // Click correct answer (H2O)
    await user.click(screen.getByText('H2O').closest('button')!);

    // Advance past reveal delay (1000ms)
    await act(() => { vi.advanceTimersByTime(1000); });

    // Advance past advance delay (1500ms)
    await act(() => { vi.advanceTimersByTime(1500); });

    // Should be on question 2
    expect(screen.getByText(/which planet is known as the red planet/i)).toBeInTheDocument();
  });

  it('wrong answer leads to result screen with $0', async () => {
    renderApp();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    await user.click(screen.getByRole('button', { name: /start/i }));

    // Click wrong answer (CO2)
    await user.click(screen.getByText('CO2').closest('button')!);

    await act(() => { vi.advanceTimersByTime(1000); });
    await act(() => { vi.advanceTimersByTime(1500); });

    // Result screen
    expect(screen.getByText(/total score/i)).toBeInTheDocument();
    expect(screen.getByText(/\$0/)).toBeInTheDocument();
  });

  it('try again returns to start screen', async () => {
    renderApp();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    await user.click(screen.getByRole('button', { name: /start/i }));
    await user.click(screen.getByText('CO2').closest('button')!);

    await act(() => { vi.advanceTimersByTime(1000); });
    await act(() => { vi.advanceTimersByTime(1500); });

    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(screen.getByRole('heading', { name: /who wants to be/i })).toBeInTheDocument();
  });
});
