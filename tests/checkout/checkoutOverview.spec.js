import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductsPage } from '../../page-objects/ProductsPage';
import { CartPage } from '../../page-objects/CartPage';
import { CheckoutInformationPage } from '../../page-objects/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../../page-objects/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../page-objects/CheckoutCompletePage'
import users from '../../testData/users.json';
import { faker } from '@faker-js/faker';

test.describe('Checkout Overview page tests', () => {

    let loginPage,
        productsPage,
        cartPage,
        checkoutInformationPage,
        checkoutOverviewPage,
        checkoutCompletePage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutInformationPage = new CheckoutInformationPage(page);
        checkoutOverviewPage = new CheckoutOverviewPage(page);
        checkoutCompletePage = new CheckoutCompletePage(page)

        await page.goto('/');
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );

        await productsPage.productAddToCartButton(0).click();
        await productsPage.cartIcon.click();
        await cartPage.checkoutButton.click();

        await checkoutInformationPage.completeInformationFormAndContinue(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.location.zipCode()
        )
    })

    test.describe('UI and Content', () => {
        test('Overview page displays correct sections and buttons', async () => {
            await expect(checkoutOverviewPage.pageHeader).toHaveText('Checkout: Overview')
            await expect(checkoutOverviewPage.paymentInformationSection).toBeVisible()
            await expect(checkoutOverviewPage.shippingInformationSection).toBeVisible()
            await expect(checkoutOverviewPage.priceTotalSection).toBeVisible()
            await expect(checkoutOverviewPage.total).toBeVisible()
            await expect(checkoutOverviewPage.finishButton).toBeVisible()
        })
    })

    test.describe('Price summary', () => {
        test('Item total and tax add up to total', async () => {
            const itemTotal = await checkoutOverviewPage.getItemTotal()
            const tax = await checkoutOverviewPage.getTax()
            const total = await checkoutOverviewPage.getTotal()

            expect(itemTotal + tax).toBe(total)
        }) 
    })

    test.describe('Navigation and behaviour', () => {
        test('Cancel navigates back to Products page and product in cart persists', async () => {
            await checkoutOverviewPage.cancelButton.click()

            await expect(productsPage.pageHeader).toHaveText('Products')
            const cartIconBadgeCount = await productsPage.getCartIconBadgeCount()
            expect(cartIconBadgeCount).toEqual(1)
        })

        test('Finish completes order and clears cart', async () => {
            await checkoutOverviewPage.finishButton.click()

            await expect(checkoutCompletePage.pageHeader).toHaveText('Checkout: Complete!')
            await expect(checkoutCompletePage.thankYouMessage).toBeVisible()
            await expect(checkoutCompletePage.confirmationMessage).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
            
            await checkoutCompletePage.backHomeButton.click()

            await expect(productsPage.pageHeader).toHaveText('Products')
            await expect(productsPage.cartIconBadge).not.toBeVisible()
        })
    })
})