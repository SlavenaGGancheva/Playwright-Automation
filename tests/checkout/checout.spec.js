import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { ProductsPage } from '../../page-objects/ProductsPage'
import { CartPage } from '../../page-objects/CartPage'
import { CheckoutPage } from '../../page-objects/CheckoutPage'
import users from '../../testData/users.json'


test.describe('Checkout Tets', () => {

    let loginPage, productsPage, cartPage, checkoutPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productsPage = new ProductsPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)

        await page.goto('/')
        await loginPage.login(users.standardUser.username, users.standardUser.password)
    })

    test('', () => {
        
    })
})