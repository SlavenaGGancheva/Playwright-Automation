import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductsPage } from '../../page-objects/ProductsPage';
import users from '../../testData/users.json';

test.describe('Products UI tests', () => {
    let loginPage, productsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        await loginPage.open();
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('Verify 6 product items are displayed', async ({ page }) => {
        await expect(productsPage.productItems).toHaveCount(6);
    });

    test('Verify product name is displayed for each product item', async ({page}) => {
        const count = await productsPage.productItems.count();

        for (let i = 0; i < count; i++) {
            const productName = productsPage.productName(i);
            await expect(productName).toBeVisible();

            const productNameText = await productName.textContent();
            expect(productNameText).not.toBe('');
        }
    });

    test('Verify product price is displayed for each product item', async ({page}) => {
        const count = await productsPage.productItems.count();

        for (let i = 0; i < count; i++) {
            const productPrice = productsPage.productPrice(i);
            await expect(productPrice).toBeVisible();

            const price = await productPrice.textContent();
            expect(price).toContain('$');
        }
    });

    test('Verify product description is displayed for each product item', async ({page}) => {
        const count = await productsPage.productItems.count();

        for (let i = 0; i < count; i++) {
            const productDescription = productsPage.productDescription(i);
            await expect(productDescription).toBeVisible();

            const productDescriptionText =
                await productDescription.textContent();
            expect(productDescriptionText).not.toBe('');
        }
    });

    test('Verify "Add to cart" button is displayed for each product item', async ({page}) => {
        const count = await productsPage.productItems.count();

        for (let i = 0; i < count; i++) {
            const productAddToCartButton =
                productsPage.productAddToCartButton(i);
            await expect(productAddToCartButton).toBeVisible();
        }
    });
});
