import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { ProductsPage } from '../../page-objects/ProductsPage'
import users from '../../testData/users.json'

test.describe('Login tests - possitive scenarios', () => {

    test('Login with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page)
        const productsPage = new ProductsPage(page)

        await test.step('Navigate to Saucedemo login page', async () => {
            await page.goto('/')

            await expect(loginPage.pageTitle).toBeVisible()
            await expect(loginPage.usernameField).toBeVisible()
            await expect(loginPage.passwordField).toBeVisible()
        })

        await test.step('Enter valid username and valid password, click Login button', async () => {
            await loginPage.login()
        })

        await test.step('Verify user landed on the Products page', async () => {
            // Verify redirect to inventory page
            await expect(page).toHaveURL('/inventory.html')
            // Verify page title
            await expect(productsPage.pageTitle).toHaveText('Swag Labs')
            // Verify products catalog is displayed with 6 products
            await expect(productsPage.pageHeader).toBeVisible()
            await expect(productsPage.pageHeader).toHaveText('Products')
            await expect(productsPage.productItems).toHaveCount(6)
            // Verify cart icon is visible
            await expect(productsPage.cartIcon).toBeVisible()
            // Verify hamburger manu is visible
            await expect(productsPage.menuButton).toBeVisible()
        })
    })
})