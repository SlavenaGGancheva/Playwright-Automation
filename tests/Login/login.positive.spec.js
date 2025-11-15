import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductsPage } from '../../page-objects/ProductsPage';
import users from '../../testData/users.json';

test.describe('Login - positive scenarios', () => {
    let loginPage;
    let productsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        await loginPage.open();
    });

    test('Verify login successfully with valid credentials and land on Products page', async ({page}) => {
        await loginPage.assertOnLoginPage()

        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );

        await expect(page).toHaveURL('/inventory.html');
        await expect(productsPage.pageTitle).toHaveText('Swag Labs');
        await expect(productsPage.pageHeader).toBeVisible();
        await expect(productsPage.pageHeader).toHaveText('Products');
        await expect(productsPage.productItems).toHaveCount(6);
        await expect(productsPage.cartIcon).toBeVisible();
        await expect(productsPage.menuButton).toBeVisible();
    });

    test('Verify logout after successful login', async ({page}) => {
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
        await productsPage.logout();
        await loginPage.assertOnLoginPage();
    })
});
