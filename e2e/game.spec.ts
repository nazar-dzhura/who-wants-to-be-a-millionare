import { test, expect } from '@playwright/test';

test('plays a full game: start → answer → result → restart', async ({ page }) => {
  await page.goto('/');

  // Start screen
  await expect(page.getByRole('heading', { name: /who wants to be/i })).toBeVisible();
  await page.getByRole('button', { name: 'Start' }).click();

  // Game screen — first question visible
  await expect(page.getByRole('heading', { level: 2 })).toBeVisible();

  // Answer the first question (click the second option — index 1)
  const answers = page.getByRole('button').filter({ hasNot: page.locator('[aria-label]') });
  await answers.nth(1).click();

  // Wait for reveal + advance (1s + 1.5s + buffer)
  await page.waitForTimeout(3000);

  // Should either be on question 2 (correct) or result screen (wrong)
  const isGameOver = await page.getByText(/earned/i).isVisible().catch(() => false);

  if (isGameOver) {
    // Result screen — verify score and restart
    await expect(page.getByText(/total score/i)).toBeVisible();
    await page.getByRole('button', { name: /try again/i }).click();
    await expect(page.getByRole('heading', { name: /who wants to be/i })).toBeVisible();
  } else {
    // Still in game — second question is showing
    await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
  }
});

test('wrong answer leads to result screen with $0', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Start' }).click();

  // First question: "What is the chemical symbol for water?"
  // Correct answer is index 1 (H2O). Click index 0 (CO2) to get it wrong.
  await page.getByRole('button', { name: /CO2/i }).click();

  // Wait for reveal + advance
  await page.waitForTimeout(3000);

  // Should be on result screen with $0
  await expect(page.getByText(/total score/i)).toBeVisible();
  await expect(page.getByText(/\$0/)).toBeVisible();
  await expect(page.getByText(/earned/i)).toBeVisible();
});
