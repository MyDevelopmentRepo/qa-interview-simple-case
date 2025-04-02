import { test, expect } from '@playwright/test'
import { existingUsers } from '../../../test-setup/localstorage.setup'
import loginPageObjects from '../../page-objects/loginPage.locator'
import homePageObjects from '../../page-objects/homePage.locator'
import { checkVisibleAndFill, checkBttnEnabledAndClick } from '../../utils/commonutil'

//updated locators to use page-objects and remove hardcoded strings
//updated element selector to fetch element based on ids and xpaths
//removed static wait as it is not a good practice to use static waits in tests and the button was loading without delay
//Update project folder structure, created reusable methods in commonutil.
//Removed serial execution of tests, as it is not needed in this case.
//updated baseUrl

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    const email = page.locator(loginPageObjects.email)
    const password = page.locator(loginPageObjects.password)
    const loginBttn = page.locator(loginPageObjects.loginBttn)
    const logoutBttn = page.locator(homePageObjects.logoutBttn)
    const existingUser = existingUsers[0]

    await page.goto('/login')

    await checkVisibleAndFill(email, existingUser.email)
    await checkVisibleAndFill(password, existingUser.password)
    await checkBttnEnabledAndClick(loginBttn)

    // Here in localHost, log out button appears immediately. hence no need to wait for it. 
    // however if needed, we can use timeouts and waitFor(), to wait for button to load.
    // we should avoid static waits.

    await expect(logoutBttn).toBeVisible()
  })
})
