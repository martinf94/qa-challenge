import { type Page, expect } from '@playwright/test';

export class PostPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertTitleVisible(title: string) {
    // Looks for the main <H1> title to avoid false positives in sidebars
    await expect(this.page.getByRole('heading', { name: title, level: 1 })).toBeVisible();
  }

  async assertContentExists(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }
}