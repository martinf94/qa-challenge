import { type Page, type Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByRole('searchbox', { name: 'Search' });
  }

  async navigate() {
    await this.page.goto('/');
  }

  async searchForPost(term: string) {
    if (await this.searchBox.isVisible()) {
      await this.searchBox.fill(term);
      await this.searchBox.press('Enter');
    } else {
      console.log('Search bar not found, checking homepage list directly...');
    }
  }

  async clickPost(title: string) {
    // We use .first() here because the link might appear multiple times
    await this.page.getByRole('link', { name: title }).first().click();
  }
}