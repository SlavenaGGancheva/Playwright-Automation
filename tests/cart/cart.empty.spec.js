import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductsPage } from '../../page-objects/ProductsPage';
import { CartPage } from '../../page-objects/CartPage';
import users from '../../testData/users.json';

test.describe('Cart - empty state', () => {
    let loginPage;
    let productsPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        await loginPage.open();
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('Verify empty cart shows no items, labels are visible and no badge', async () => {
            await productsPage.cartIcon.click()

            await expect(cartPage.productItems).toHaveCount(0)
            await expect(cartPage.productQuantityLabel).toBeVisible()
            await expect(cartPage.productDescriptionLabel).toBeVisible()
            await expect(cartPage.cartIconBadge).toHaveCount(0)
            await expect(cartPage.continueShoppingButton).toBeEnabled()
        })
})