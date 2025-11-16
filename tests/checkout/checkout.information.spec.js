import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductsPage } from '../../page-objects/ProductsPage';
import { CartPage } from '../../page-objects/CartPage';
import { CheckoutInformationPage } from '../../page-objects/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../../page-objects/CheckoutOverviewPage';
import users from '../../testData/users.json';
import errorMessages from '../../testData/checkoutValidationMessages.json';
import { faker } from '@faker-js/faker';

test.describe('Checkout - Information page', () => {
    let loginPage,
        productsPage,
        cartPage,
        checkoutInformationPage,
        checkoutOverviewPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutInformationPage = new CheckoutInformationPage(page);
        checkoutOverviewPage = new CheckoutOverviewPage(page);

        await loginPage.open();
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );

        await productsPage.productAddToCartButton(0).click();
        await productsPage.cartIcon.click();
        await cartPage.checkoutButton.click();

        await expect(checkoutInformationPage.pageHeader).toBeVisible();
    });

    test('Verify entering valid information moves user to Checkout Overview page', async ({ page }) => {
        await checkoutInformationPage.completeInformationForm(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.location.zipCode()
        )

        await checkoutInformationPage.continueButton.click()

        await expect(checkoutOverviewPage.pageHeader).toBeVisible()
        await expect(checkoutOverviewPage.pageHeader).toHaveText('Checkout: Overview')
        await expect(page).toHaveURL('/checkout-step-two.html')
    })

    test('Verify Cancel returns user to Cart page and product persists in cart', async () => {
        await checkoutInformationPage.cancelButton.click()

        await expect(cartPage.pageHeader).toBeVisible()
        await expect(cartPage.pageHeader).toHaveText('Your Cart')
        await expect(cartPage.productItems).toHaveCount(1)
    })

    test('Verify error disappears after filling missing field and resubmitting', async () => {
        await checkoutInformationPage.completeInformationForm(
            '',
            faker.person.lastName(),
            faker.location.zipCode()
        )
        await checkoutInformationPage.continueButton.click()
        await checkoutInformationPage.assertErrorMessage(errorMessages.missingFirstNameError)
    
        await checkoutInformationPage.firstNameField.fill(faker.person.firstName())
        await checkoutInformationPage.continueButton.click()

        await expect(checkoutOverviewPage.pageHeader).toBeVisible()
    })

    test.describe('Information Form Validation - required fields', () => {
        const requiredFieldScenarios = [
            {
                name: 'Missing first name shows error',
                formData: {
                    firstName: '',
                    lastName: faker.person.lastName(),
                    zipCode: faker.location.zipCode(),
                },
                expectedError: errorMessages.missingFirstNameError,
            },
            {
                name: 'Missing last name shows error',
                formData: {
                    firstName: faker.person.firstName(),
                    lastName: '',
                    zipCode: faker.location.zipCode(),
                },
                expectedError: errorMessages.missingLastNameError,
            },
            {
                name: 'Missing zip code shows error',
                formData: {
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    zipCode: '',
                },
                expectedError: errorMessages.missingZipCodeError,
            },
        ];

        requiredFieldScenarios.forEach((scenario) => {
            test(`Verify error message is dispalyed when ${scenario.name}`, async () => {
                await checkoutInformationPage.completeInformationForm(
                    scenario.formData.firstName,
                    scenario.formData.lastName,
                    scenario.formData.zipCode
                );
                await checkoutInformationPage.continueButton.click();
                await checkoutInformationPage.assertErrorMessage(
                    scenario.expectedError
                );
            });
        });
    });
});
