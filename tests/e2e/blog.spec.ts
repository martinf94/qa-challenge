import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { PostPage } from '../pages/PostPage';

test('Verify QA Automation Challenge Post Exists', async ({ page }) => {
  // Initialize the Page Objects
  const homePage = new HomePage(page);
  const postPage = new PostPage(page);

  // 1. Navigate
  await test.step('Navigate to Home Page', async () => {
    try {
      await homePage.navigate();
    } catch (error) {
      throw new Error(`FAILURE: Could not navigate to the Home Page.\n\nOriginal Error: ${error}`);
    }
  });

  // 2. Interact (With Custom Error Handling)
  await test.step('Find and Click the Post', async () => {
    try {
      await homePage.clickPost('QA Automation Challenge');
    } catch (error) {
      throw new Error(`FAILURE: The 'QA Automation Challenge' post was not found.\n\nOriginal Error: ${error}`);
    }
  });

  // 3. Verify
  await test.step('Verify Post Content', async () => {
    try {
      await postPage.assertTitleVisible('QA Automation Challenge');
      await postPage.assertContentExists('Dockerized testing is the future.');
    } catch (error) {
      throw new Error(`FAILURE: The post content verification failed.\n\nOriginal Error: ${error}`);
    }
  });
});