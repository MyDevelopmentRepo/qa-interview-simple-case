import { Locator, expect } from '@playwright/test';

export async function checkVisibleAndFill(locator: Locator, value: string) {
    await expect(locator).toBeVisible();
    await locator.fill('');
    await locator.fill(value);
}
export async function checkBttnEnabledAndClick(locator: Locator) {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await locator.click();
}

