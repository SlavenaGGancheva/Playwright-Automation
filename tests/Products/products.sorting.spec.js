import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductsPage } from '../../page-objects/ProductsPage';
import users from '../../testData/users.json';

test.describe('Products - Sorting Functionality', () => {
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

    test('Verify sorting products A to Z', async () => {
        await productsPage.sortDropdownMenu.selectOption('az');

        const productNames = await productsPage.getProductNames();
        const sortedProductNames = [...productNames].sort();

        expect(productNames).toEqual(sortedProductNames);
    });

    test('Verify sorting products Z to A', async () => {
        await productsPage.sortDropdownMenu.selectOption('za');

        const productNames = await productsPage.getProductNames();
        const sortedProductNames = [...productNames].sort().reverse();

        expect(productNames).toEqual(sortedProductNames);
    });

    test('Verify sorting products by price high to low', async () => {
        await productsPage.sortDropdownMenu.selectOption('hilo');

        const productPrices = await productsPage.getProductPrices();
        const sortedProductPrices = [...productPrices].sort((a, b) => b - a);

        expect(productPrices).toEqual(sortedProductPrices);
    });

    test('Verify sorting products by price low to high', async () => {
        await productsPage.sortDropdownMenu.selectOption('lohi');

        const productPrices = await productsPage.getProductPrices();
        const sortedProductPrices = [...productPrices].sort((a, b) => a - b);

        expect(productPrices).toEqual(sortedProductPrices);
    });
});
