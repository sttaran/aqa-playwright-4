import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');

    await page.getByPlaceholder('What needs to be done?').fill('learn codegen');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByPlaceholder('What needs to be done?').fill('playwright is super');
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.locator('li').filter({ hasText: 'learn codegen' }).getByLabel('Toggle Todo').check();
    await page.locator('li').filter({ hasText: 'playwright is super' }).getByLabel('Toggle Todo').check();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();

    await page.getByPlaceholder('What needs to be done?').fill('ttodo 1');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await expect(page.getByTestId('todo-title')).toBeVisible();
    await expect(page.getByTestId('todo-title')).toContainText('ttodo 1');
    await page.getByPlaceholder('What needs to be done?').click();
    await page.getByPlaceholder('What needs to be done?').fill('olololo');
    await expect(page.getByPlaceholder('What needs to be done?')).toHaveValue('olololo');
});


test("School", async({page})=>{
    await page.goto('https://qauto.forstudy.space/');
    await page.getByRole('button', { name: 'Guest log in' }).click();
    await page.getByRole('button', { name: 'Add car' }).click();
    await page.getByLabel('Brand').selectOption('1: 2');
    await page.getByLabel('Model').selectOption('12: 8');
    await page.getByLabel('Mileage').click();
    await page.getByLabel('Mileage').fill('1123');
    await page.getByRole('button', { name: 'Add' }).click();
})

