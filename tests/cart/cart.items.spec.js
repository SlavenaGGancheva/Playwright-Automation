import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductsPage } from '../../page-objects/ProductsPage';
import { CartPage } from '../../page-objects/CartPage';
import users from '../../testData/users.json';

test.describe('Cart - items add, remove and product details', () => {
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

    test('Verify adding a single product to cart from Products page', async () => {
        await productsPage.productAddToCartButton(0).click();
        await productsPage.cartIcon.click();

        await expect(cartPage.productItems).toHaveCount(1);
        const cartIconBadgeCount = await cartPage.getCartIconBadgeCount();
        expect(cartIconBadgeCount).toEqual(1);
    });

    test('Verify adding multiple products to cart from Products page', async () => {
        await productsPage.productAddToCartButton(0).click();
        await productsPage.productAddToCartButton(1).click();
        await productsPage.cartIcon.click();

        await expect(cartPage.productItems).toHaveCount(2);
        const cartIconBadgeCount = await cartPage.getCartIconBadgeCount();
        expect(cartIconBadgeCount).toEqual(2);
    });

    test('Verify product removed from Products page is not displayed in cart', async () => {
        await productsPage.productAddToCartButton(0).click();
        const cartIconBadgeCount = await productsPage.getCartIconBadgeCount();
        expect(cartIconBadgeCount).toEqual(1);

        await productsPage.productRemoveFromCartButton(0).click();
        await productsPage.cartIcon.click();

        await expect(cartPage.productItems).toHaveCount(0);
        await expect(productsPage.cartIconBadge).toHaveCount(0);
    });

    test('Verify product removed from Cart page is not displayed in cart on Cart page', async () => {
        await productsPage.productAddToCartButton(0).click();
        const cartIconBadgeCount = await productsPage.getCartIconBadgeCount();
        expect(cartIconBadgeCount).toEqual(1);

        await productsPage.cartIcon.click();
        await cartPage.productRemoveFromCartButton(0).click();

        await expect(cartPage.productItems).toHaveCount(0);
        await expect(productsPage.cartIconBadge).toHaveCount(0);
    });

    test('Verify removing multiple products from cart updates badge item count', async () => {
        await productsPage.productAddToCartButton(0).click();
        await productsPage.productAddToCartButton(1).click();
        await productsPage.productAddToCartButton(2).click();

        await productsPage.cartIcon.click();

        await cartPage.productRemoveFromCartButton(0).click();
        await cartPage.productRemoveFromCartButton(1).click();

        await expect(cartPage.productItems).toHaveCount(1);
    });

    test('Verify correct product name is displayed in Cart', async () => {
        await productsPage.productAddToCartButton(0).click();

        const productName = await productsPage.productName(0).textContent();

        await productsPage.cartIcon.click();

        const displayedProductName = await cartPage
            .productName(0)
            .textContent();

        expect(productName).toEqual(displayedProductName);
    });

    test('Verify correct product price is displayed in Cart', async () => {
        await productsPage.productAddToCartButton(0).click();

        const productPrice = await productsPage.productPrice(0).textContent();

        await productsPage.cartIcon.click();

        const displayedProductPrice = await cartPage
            .productPrice(0)
            .textContent();

        expect(productPrice).toEqual(displayedProductPrice);
    });

    test('Verify correct product description is displayed in Cart', async () => {
        await productsPage.productAddToCartButton(0).click();

        const productDescription = await productsPage
            .productDescription(0)
            .textContent();

        await productsPage.cartIcon.click();

        const displayedProductDescription = await cartPage
            .productDescription(0)
            .textContent();

        expect(productDescription).toEqual(displayedProductDescription);
    });
});
