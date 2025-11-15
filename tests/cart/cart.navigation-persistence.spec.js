import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductsPage } from '../../page-objects/ProductsPage';
import { CartPage } from '../../page-objects/CartPage';
import { CheckoutInformationPage } from '../../page-objects/CheckoutInformationPage';
import users from '../../testData/users.json';

test.describe('Cart - navigation and persistence', () => {
    let loginPage;
    let productsPage;
    let cartPage;
    let checkoutInformationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutInformationPage = new CheckoutInformationPage(page);

        await loginPage.open();
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('Verify navigating to Cart page from Products page', async ({page}) => {
        await productsPage.cartIcon.click();

        await expect(page).toHaveURL('/cart.html');
        await expect(cartPage.pageHeader).toHaveText('Your Cart');
    });

    test('Verify navigating from Cart page back to Products page', async ({page}) => {
        await productsPage.cartIcon.click();
        await cartPage.continueShoppingButton.click();

        await expect(page).toHaveURL('/inventory.html');
        await expect(productsPage.pageHeader).toHaveText('Products');
    });

    test('Verify navigating to Checkout page from Cart page', async ({page,}) => {
        await productsPage.cartIcon.click();
        await cartPage.checkoutButton.click();

        await expect(page).toHaveURL('/checkout-step-one.html');
        await expect(checkoutInformationPage.pageHeader).toHaveText(
            'Checkout: Your Information'
        );
    });

    test('Verify product persists in cart after Cart page refresh', async () => {
        await productsPage.productAddToCartButton(0).click();
        await productsPage.cartIcon.click();

        await cartPage.reload();
        await expect(cartPage.productItems).toHaveCount(1);
    });

    test('Verify product persist in cart after navigation between Cart and Product pages', async () => {
        await productsPage.productAddToCartButton(0).click();
        await productsPage.cartIcon.click();

        await expect(cartPage.productItems).toHaveCount(1);

        await cartPage.continueShoppingButton.click();
        await productsPage.cartIcon.click();

        await expect(cartPage.productItems).toHaveCount(1);
    });

    test('Verify product persist in cart after navigation between Cart and Checkout pages', async () => {
        await productsPage.productAddToCartButton(0).click();
        await productsPage.cartIcon.click();

        await expect(cartPage.productItems).toHaveCount(1);

        await cartPage.checkoutButton.click();
        await checkoutInformationPage.cancelButton.click();
        
        await expect(cartPage.productItems).toHaveCount(1);
    });
});
