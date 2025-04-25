import { test, expect } from '@playwright/test'
import newUser from '../../test-data/newUser.json'
import { existingUsers } from '../../../test-setup/localstorage.setup'
import loginPageObjects from '../../page-objects/loginPage.locator'
import homePageObjects from '../../page-objects/homePage.locator'
import signUpPageLocator from '../../page-objects/signUpPage.locator'
import { checkVisibleAndFill, checkLinkVisibleAndClick, checkBttnEnabledAndClick } from '../../utils/commonutil'


test.describe('User Registration tests', () => {
  test('Verify that new user can be registered', async ({ page }) => {
    const firstName = page.locator(signUpPageLocator.firstName)
    const lastName = page.locator(signUpPageLocator.lastName)
    const email = page.locator(signUpPageLocator.email)
    const submitBttn = page.locator(signUpPageLocator.submitBttn)
    const password = page.locator(signUpPageLocator.password)
    const signupLink = page.locator(loginPageObjects.signupLink)
    const firstNameToReg = `${newUser.firstName}_${Date.now()}`
    const emailToReg = `${firstNameToReg}${newUser.email}`

    await page.goto('/login')

    // register the user
    await checkLinkVisibleAndClick(signupLink)
    await checkVisibleAndFill(firstName, firstNameToReg)
    await checkVisibleAndFill(lastName, newUser.lastName)
    await checkVisibleAndFill(password, newUser.password)
    await checkVisibleAndFill(email, emailToReg)
    await checkBttnEnabledAndClick(submitBttn)

    // Logout
    const logoutBttn = page.locator(homePageObjects.logoutBttn)
    await checkBttnEnabledAndClick(logoutBttn)

    // Verify that the registered user can login
    const loginBttn = page.locator(loginPageObjects.loginBttn)
    await checkVisibleAndFill(email, emailToReg)
    await checkVisibleAndFill(password, newUser.password)
    await checkBttnEnabledAndClick(loginBttn)
    await expect(logoutBttn).toBeVisible()
    console.log(`User ${emailToReg} is registered and logged in successfully`)
  })


  // it willl fail because currently it can accept duplicate emails
  test('Verify that user cannot register with existing email', async ({ page }) => {
    const firstName = page.locator(signUpPageLocator.firstName)
    const lastName = page.locator(signUpPageLocator.lastName)
    const email = page.locator(signUpPageLocator.email)
    const submitBttn = page.locator(signUpPageLocator.submitBttn)
    const password = page.locator(signUpPageLocator.password)
    const signupLink = page.locator(loginPageObjects.signupLink)
    const existingUser = existingUsers[0]

    await page.goto('/login')

    // register the user
    await checkLinkVisibleAndClick(signupLink)
    await checkVisibleAndFill(firstName, existingUser.firstName)
    await checkVisibleAndFill(lastName, existingUser.lastName)
    await checkVisibleAndFill(password, existingUser.password)
    await checkVisibleAndFill(email, existingUser.email)
    await expect(submitBttn).toBeDisabled()
  })

  test('Verify that new user cannot register with invalid email and password', async ({ page }) => {
    const firstName = page.locator(signUpPageLocator.firstName)
    const lastName = page.locator(signUpPageLocator.lastName)
    const email = page.locator(signUpPageLocator.email)
    const submitBttn = page.locator(signUpPageLocator.submitBttn)
    const password = page.locator(signUpPageLocator.password)
    const signupLink = page.locator(loginPageObjects.signupLink)
    const existingUser = existingUsers[0]

    await page.goto('/login')
    await checkLinkVisibleAndClick(signupLink)
    await checkVisibleAndFill(firstName, existingUser.firstName)
    await checkVisibleAndFill(lastName, existingUser.lastName)

    // when we pass password less than 9 characteers, submit should be disabled
    await checkVisibleAndFill(email, existingUser.email)
    await checkVisibleAndFill(password, "testPass")
    await expect(submitBttn).toBeDisabled()

    // when we email doesnt contain @, submit should be disabled
    await checkVisibleAndFill(password, existingUser.password)
    await checkVisibleAndFill(email, "test.com")
    await expect(submitBttn).toBeDisabled()

    // when we email is empty submit should be disabled
    await checkVisibleAndFill(email, "")
    await expect(submitBttn).toBeDisabled()
  })


  test('Verify that new user cannot register with invalid firstName and lastName', async ({ page }) => {
    const firstName = page.locator(signUpPageLocator.firstName)
    const lastName = page.locator(signUpPageLocator.lastName)
    const email = page.locator(signUpPageLocator.email)
    const submitBttn = page.locator(signUpPageLocator.submitBttn)
    const password = page.locator(signUpPageLocator.password)
    const signupLink = page.locator(loginPageObjects.signupLink)
    const existingUser = existingUsers[0]

    await page.goto('/login')
    await checkLinkVisibleAndClick(signupLink)
    await checkVisibleAndFill(email, existingUser.email)
    await checkVisibleAndFill(password, existingUser.password)

    // when we pass firstName as blank, submit should be disabled
    await checkVisibleAndFill(firstName, "")
    await checkVisibleAndFill(lastName, existingUser.lastName)
    await expect(submitBttn).toBeDisabled()

    // when we pass lastName as blank, submit should be disabled
    await checkVisibleAndFill(firstName, existingUser.firstName)
    await checkVisibleAndFill(lastName, "")
    await expect(submitBttn).toBeDisabled()
  })



})
