import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { ProductsPage } from '../../page-objects/ProductsPage'
import users from '../../testData/users.json'

test.describe('Products UI tests', () => {

    let loginPage, productsPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productsPage = new ProductsPage(page)
        await page.goto('/')
        await loginPage.login(users.standardUser.username, users.standardUser.password)
    })

    test('Should display 6 product items', async ({ page }) => {
        await expect(productsPage.productItems).toHaveCount(6)
    })

    test('Should display product name for each product item', async ({ page }) => {
        const count = await productsPage.productItems.count()

        for (let i = 0; i < count; i++) {
            await test.step(`Validate product ${i + 1} name`, async () => {
                const productName = productsPage.productName(i)
                await expect(productName).toBeVisible()

                const productNameText = await productName.textContent()
                expect(productNameText).not.toBe('')
            })
        }
    })

    test('Should display product price for each product item', async ({ page }) => {
        const count = await productsPage.productItems.count()

        for (let i = 0; i < count; i++) {
            const productPrice = productsPage.productPrice(i)
            await expect(productPrice).toBeVisible()

            const price = await productPrice.textContent()
            expect(price).toContain('$')
        }
    })

    test('Should display description for each product item', async ({ page }) => {
        const count = await productsPage.productItems.count()
        
        for (let i = 0; i < count; i++) {
            const productDescription = productsPage.productDescription(i)
            await expect(productDescription).toBeVisible()

            const productDescriptionText = await productDescription.textContent()
            expect(productDescriptionText).not.toBe('')
        }
    })

    test('Should display "Add to cart" for each product item', async ({ page }) => {
        const count = await productsPage.productItems.count()

        for (let i = 0; i < count; i++) {
            const productAddToCartButton = productsPage.productAddToCartButton(i)
            await expect(productAddToCartButton).toBeVisible()
        }
    })
})