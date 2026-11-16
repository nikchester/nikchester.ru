import { expect, test, type Page } from '@playwright/test';

const ruHint = 'Язык выбран автоматически';
const enHint = 'Language chosen automatically';

async function expectRussian(page: Page) {
  await expect(page.getByRole('heading', { name: 'Никита Чатуров' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
}

async function expectEnglish(page: Page) {
  await expect(page.getByRole('heading', { name: 'Nikita Chaturov' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
}

for (const { locale, timezoneId } of [
  { locale: 'ru-RU', timezoneId: 'Europe/Moscow' },
  { locale: 'en-US', timezoneId: 'Asia/Yekaterinburg' },
  { locale: 'ru-RU', timezoneId: 'Europe/Berlin' },
]) {
  test.describe(`auto language ${locale} ${timezoneId}`, () => {
    test.use({ locale, timezoneId });

    test('picks Russian on the first visit and shows the hint', async ({ page }) => {
      await page.goto('/');
      await expectRussian(page);
      await expect(page.locator('.titlebar-controls .lang-hint')).toHaveText(ruHint);
    });
  });
}

for (const { locale, timezoneId } of [
  { locale: 'en-US', timezoneId: 'America/New_York' },
  { locale: 'kk-KZ', timezoneId: 'Asia/Almaty' },
]) {
  test.describe(`auto language ${locale} ${timezoneId}`, () => {
    test.use({ locale, timezoneId });

    test('keeps English without the hint', async ({ page }) => {
      await page.goto('/');
      await expectEnglish(page);
      await expect(page.locator('.lang-hint')).toHaveCount(0);
      await expect(page.getByText(enHint)).toHaveCount(0);
    });
  });
}

test.describe('auto language in Russia', () => {
  test.use({ locale: 'ru-RU', timezoneId: 'Europe/Moscow' });

  test('renders Russian from the first paint without an English flash', async ({ page }) => {
    await page.addInitScript(() => {
      const seen: string[] = [];
      Object.assign(window, { seenHeroTitles: seen });
      new MutationObserver(() => {
        const title = document.getElementById('hero-title')?.textContent;
        if (title && seen.at(-1) !== title) seen.push(title);
      }).observe(document, { childList: true, subtree: true, characterData: true });
    });
    await page.goto('/');
    await expectRussian(page);
    const seen = await page.evaluate(() => (window as unknown as { seenHeroTitles: string[] }).seenHeroTitles);
    expect(seen).toEqual(['Никита Чатуров']);
  });

  test('remembers an explicit English choice over the auto choice', async ({ page }) => {
    await page.goto('/');
    await expectRussian(page);

    await page.getByRole('button', { name: 'EN' }).click();
    await expectEnglish(page);
    await expect(page.locator('.lang-hint')).toHaveCount(0);

    await page.reload();
    await expectEnglish(page);
    await expect(page.locator('.lang-hint')).toHaveCount(0);
  });

  test('hides the hint once Russian is chosen explicitly', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.lang-hint')).toHaveText(ruHint);

    await page.getByRole('button', { name: 'RU' }).click();
    await expectRussian(page);
    await expect(page.locator('.lang-hint')).toHaveCount(0);

    await page.reload();
    await expectRussian(page);
    await expect(page.locator('.lang-hint')).toHaveCount(0);
  });

  for (const width of [360, 768, 1366]) {
    test(`fits the hint without horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await expect(page.locator('.lang-hint')).toBeVisible();
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(hasOverflow).toBe(false);
    });
  }
});

test.describe('auto language outside Russia', () => {
  test.use({ locale: 'en-US', timezoneId: 'America/New_York' });

  test('remembers an explicit Russian choice between visits', async ({ page }) => {
    await page.goto('/');
    await expectEnglish(page);

    await page.getByRole('button', { name: 'RU' }).click();
    await expectRussian(page);

    await page.reload();
    await expectRussian(page);
    await expect(page.locator('.lang-hint')).toHaveCount(0);
  });

  test('ignores an unknown stored value and falls back to detection', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.setItem('lang', 'de'));
    await page.goto('/');
    await expectEnglish(page);
  });
});
