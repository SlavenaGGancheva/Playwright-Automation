import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { ProductsPage } from '../../page-objects/ProductsPage'
import { CartPage } from '../../page-objects/CartPage'
import users from '../../testData/users.json'

test.describe('Cart Trsts', () => {

    let loginPage, productsPage, cartPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productsPage = new ProductsPage(page)
        cartPage = new CartPage(page)

        await page.goto('/')
        await loginPage.login()
        await loginPage.login(users.standardUser.username, users.standardUser.password)
    })

    test('', () => {
        
    })
})