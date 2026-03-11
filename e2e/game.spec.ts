import { test, expect } from '@playwright/test';

test('correct answer advances to next question', async ({ page }) => {
  await page.goto('/');

  // Start screen
  await expect(page.getByRole('heading', { name: /who wants to be/i })).toBeVisible();
  await page.getByRole('button', { name: 'Start' }).click();

  // First question visible
  await expect(page.getByText(/chemical symbol for water/i)).toBeVisible();

  // Click correct answer (H2O)
  await page.getByRole('button', { name: /H2O/i }).click();

  // Wait for reveal + advance
  await page.waitForTimeout(3000);

  // Should advance to question 2
  await expect(page.getByText(/which planet is known as the red planet/i)).toBeVisible();
});

test('wrong answer leads to result screen with $0', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Start' }).click();

  // Click wrong answer (CO2) for first question
  await page.getByRole('button', { name: /CO2/i }).click();

  // Wait for reveal + advance
  await page.waitForTimeout(3000);

  // Result screen with $0
  await expect(page.getByText(/total score/i)).toBeVisible();
  await expect(page.getByText(/\$0/)).toBeVisible();

  // Try again returns to start
  await page.getByRole('button', { name: /try again/i }).click();
  await expect(page.getByRole('heading', { name: /who wants to be/i })).toBeVisible();
});
