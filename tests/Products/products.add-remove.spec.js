import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductsPage } from '../../page-objects/ProductsPage';
import users from '../../testData/users.json';

test.describe('Products - add and remove from Products page', () => {
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

    test('Verify add single product to cart', async () => {
        await productsPage.productAddToCartButton(0).click();

        const cartIconBadgeCount = await productsPage.getCartIconBadgeCount();
        expect(cartIconBadgeCount).toEqual(1);
    });

    test('Verify add multiple products to cart', async () => {
        await productsPage.productAddToCartButton(0).click();
        await productsPage.productAddToCartButton(1).click();

        const cartIconBadgeCount = await productsPage.getCartIconBadgeCount();
        expect(cartIconBadgeCount).toEqual(2);
    });

    test('Verify button change to "Remove" after adding product to cart', async () => {
        await productsPage.productAddToCartButton(0).click();
        await expect(productsPage.productRemoveFromCartButton(0)).toHaveText(
            'Remove'
        );
    });

    test('Verify remove a single product from cart updates cart badge', async () => {
        await productsPage.productAddToCartButton(0).click();
        await productsPage.productAddToCartButton(1).click();

        const cartIconBadgeCount = await productsPage.getCartIconBadgeCount();
        expect(cartIconBadgeCount).toEqual(2);

        await productsPage.productRemoveFromCartButton(0).click();

        const updatedCartIconBadgeCount =
            await productsPage.getCartIconBadgeCount();
        expect(updatedCartIconBadgeCount).toEqual(1);
    });

    test('Verify cart badge disappears after removing all products', async ({}) => {
        await productsPage.productAddToCartButton(0).click();
        await productsPage.productAddToCartButton(1).click();

        const cartIconBadgeCount = await productsPage.getCartIconBadgeCount();
        expect(cartIconBadgeCount).toEqual(2);

        await productsPage.productRemoveFromCartButton(0).click();
        await productsPage.productRemoveFromCartButton(1).click();

        await expect(productsPage.cartIconBadge).toHaveCount(0);
    });
});
