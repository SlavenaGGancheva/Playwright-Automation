import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductsPage } from '../../page-objects/ProductsPage';
import { CartPage } from '../../page-objects/CartPage';
import { CheckoutInformationPage } from '../../page-objects/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../../page-objects/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../page-objects/CheckoutCompletePage';
import users from '../../testData/users.json';
import { faker } from '@faker-js/faker';

test.describe('Checkout - end-to-end flow', () => {
    let loginPage;
    let productsPage;
    let cartPage;
    let checkoutInformationPage;
    let checkoutOverviewPage;
    let checkoutCompletePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutInformationPage = new CheckoutInformationPage(page);
        checkoutOverviewPage = new CheckoutOverviewPage(page);
        checkoutCompletePage = new CheckoutCompletePage(page);

        await loginPage.open();
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('Verify user can complete checkout flow for single product', async ({ page }) => {
        // Add single product to cart from Products page
        await productsPage.productAddToCartButton(0).click();

        // Verify cart badge updates
        const cartIconBadgeCountAfterAdd = await productsPage.getCartIconBadgeCount();
        expect(cartIconBadgeCountAfterAdd).toEqual(1);

        // Navigate to Cart page
        await productsPage.cartIcon.click();
        await expect(page).toHaveURL('/cart.html');
        await expect(cartPage.pageHeader).toHaveText('Your Cart');
        await expect(cartPage.productItems).toHaveCount(1);

        // Proceed to Checkout Information page
        await cartPage.checkoutButton.click();
        await expect(checkoutInformationPage.pageHeader).toHaveText('Checkout: Your Information');

        // Fill information and continue to Overview page
        await checkoutInformationPage.completeInformationFormAndContinue(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.location.zipCode()
        );

        await expect(checkoutOverviewPage.pageHeader).toHaveText(
            'Checkout: Overview'
        );
        await expect(page).toHaveURL('/checkout-step-two.html');

        // Optional sanity check: totals are present
        await expect(checkoutOverviewPage.total).toBeVisible();

        // Finish checkout and verify Complete page
        await checkoutOverviewPage.finishButton.click();

        await expect(checkoutCompletePage.pageHeader).toHaveText('Checkout: Complete!');
        await expect(checkoutCompletePage.thankYouMessage).toBeVisible();
        await expect(checkoutCompletePage.confirmationMessage).toHaveText(
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
        );

        // Navigate back home and verify cart is cleared
        await checkoutCompletePage.backHomeButton.click();

        await expect(productsPage.pageHeader).toHaveText('Products');
        const finalCartIconBadgeCount = await productsPage.getCartIconBadgeCount();
        expect(finalCartIconBadgeCount).toEqual(0);
    });

    test('Verify user can complete checkout flow for multiple products', async ({ page }) => {
        // Add multiple products to cart from Products page
        await productsPage.productAddToCartButton(0).click();
        await productsPage.productAddToCartButton(1).click();

        const cartIconBadgeCountAfterAdd =
            await productsPage.getCartIconBadgeCount();
        expect(cartIconBadgeCountAfterAdd).toEqual(2);

        // Navigate to Cart page
        await productsPage.cartIcon.click();
        await expect(page).toHaveURL('/cart.html');
        await expect(cartPage.productItems).toHaveCount(2);

        // Proceed to Checkout Information page
        await cartPage.checkoutButton.click();
        await expect(checkoutInformationPage.pageHeader).toHaveText('Checkout: Your Information');

        // Fill information and continue to Overview page
        await checkoutInformationPage.completeInformationFormAndContinue(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.location.zipCode()
        );

        await expect(checkoutOverviewPage.pageHeader).toHaveText(
            'Checkout: Overview'
        );

        // Basic price sanity: item total + tax = total
        const itemTotal = await checkoutOverviewPage.getItemTotal();
        const tax = await checkoutOverviewPage.getTax();
        const total = await checkoutOverviewPage.getTotal();
        expect(itemTotal + tax).toBe(total);

        // Finish checkout
        await checkoutOverviewPage.finishButton.click();

        await expect(checkoutCompletePage.pageHeader).toHaveText(
            'Checkout: Complete!'
        );

        await checkoutCompletePage.backHomeButton.click();

        // Verify we are back on Products page and cart is cleared
        await expect(productsPage.pageHeader).toHaveText('Products');
        const finalCartIconBadgeCount = await productsPage.getCartIconBadgeCount();
        expect(finalCartIconBadgeCount).toEqual(0);
    });
});
