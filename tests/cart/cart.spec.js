import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { ProductsPage } from '../../page-objects/ProductsPage';
import { CartPage } from '../../page-objects/CartPage';
import users from '../../testData/users.json';
import { CheckoutInformationPage } from '../../page-objects/CheckoutInformationPage';

test.describe('Cart Tests', () => {
    let loginPage, productsPage, cartPage, checkoutInformationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutInformationPage = new CheckoutInformationPage(page)

        await page.goto('/');
        await loginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    // test.describe('Empty cart scenarios', () => {
    //     test('Verify empty cart shows no items and no badge', async () => {
    //         await productsPage.cartIcon.click()

    //         await expect(cartPage.productItems).toHaveCount(0)
    //         await expect(cartPage.productQuantityLabel).toBeVisible()
    //         await expect(cartPage.productDescriptionLabel).toBeVisible()
    //         await expect(cartPage.cartIconBadge).not.toBeVisible()
    //         await expect(cartPage.continueShoppingButton).toBeEnabled()
    //     })
    // })

    test.describe('Add products to cart', () => {
        // test('Verify adding a single product', async () => {
        //     await productsPage.productAddToCartButton(0).click();
        //     await productsPage.cartIcon.click();
        //     await expect(cartPage.productItems).toHaveCount(1);
        //     const cartIconBadgeCount = await cartPage.getCartIconBadgeCount()
        //     expect(cartIconBadgeCount).toEqual(1)
        // });

        // test('Verify adding multiple products to cart', async () => {
        //     await productsPage.productAddToCartButton(0).click();
        //     await productsPage.productAddToCartButton(1).click();
        //     await productsPage.cartIcon.click();
        //     await expect(cartPage.productItems).toHaveCount(2);
        //     const cartIconBadgeCount = await cartPage.getCartIconBadgeCount()
        //     expect(cartIconBadgeCount).toEqual(2)
        // });
    });

    test.describe('Remove products from cart', () => {
        // test('Verify product removed from Products page is not displayed in cart on Cart page', async () => {
        //     // Add product on Products page and verify it was added to cart
        //     await productsPage.productAddToCartButton(0).click();
        //     const cartIconBadgeCount =
        //     await productsPage.getCartIconBadgeCount();
        //     expect(cartIconBadgeCount).toEqual(1);
        //     // Remove the product from cart on Products page
        //     await productsPage.productRemoveFromCartButton(0).click();
        //     // Navigate to Cart page
        //     await productsPage.cartIcon.click();
        //     // Verify cart is empty 
        //     await expect(cartPage.productItems).toHaveCount(0);
        //     await expect(productsPage.cartIconBadge).not.toBeVisible()
        // });

        // test('Verify product removed from Cart page is not displayed in cart on Cart page', async () => {
        //     // Add product on Products page and verify it was added to cart
        //     await productsPage.productAddToCartButton(0).click();
        //     const cartIconBadgeCount =
        //     await productsPage.getCartIconBadgeCount();
        //     expect(cartIconBadgeCount).toEqual(1);
        //     // Navigate to Cart page
        //     await productsPage.cartIcon.click();
        //     // Remove product from cart on Cart page
        //     await cartPage.productRemoveFromCartButton(0).click();
        //     // Verify cart is empty
        //     await expect(cartPage.productItems).toHaveCount(0);
        //     await expect(productsPage.cartIconBadge).not.toBeVisible()
        // });

        // test('Verify removing multiple products from cart on Cart page removes all of them', async () => {
        //     // Add 3 products on Products page and verify it was added to cart
        //     await productsPage.productAddToCartButton(0).click();
        //     await productsPage.productAddToCartButton(1).click();
        //     await productsPage.productAddToCartButton(2).click();
        //     const cartIconBadgeCount =
        //     await productsPage.getCartIconBadgeCount();
        //     expect(cartIconBadgeCount).toEqual(3);
        //     // Navigate to Cart page
        //     await productsPage.cartIcon.click();
        //     // Remove 2 product from cart on Cart page
        //     await cartPage.productRemoveFromCartButton(0).click();
        //     await cartPage.productRemoveFromCartButton(1).click();
        //     // Verify 1 product left in cart
        //     await expect(cartPage.productItems).toHaveCount(1);
        // });
    });

    test.describe('Cart Navigation', () => {
        // test('Verify navigating to Cart page from Products page', async ({page}) => {
        //     await productsPage.cartIcon.click()
        //     await expect(page).toHaveURL('/cart.html')
        //     await expect(cartPage.pageHeader).toHaveText('Your Cart')
        // })

        // test('Verify navigating from Cart page back to Products page', async ({page}) => {
        //     await productsPage.cartIcon.click()
        //     await cartPage.continueShoppingButton.click()
        //     await expect(page).toHaveURL('/inventory.html')
        //     await expect(productsPage.pageHeader).toHaveText('Products')
        // })

        // test('Verify navigating to Checkout page from Cart page', async ({page}) => {
        //     await productsPage.cartIcon.click()
        //     await cartPage.checkoutButton.click()
        //     await expect(page).toHaveURL('/checkout-step-one.html')
        //     await expect(checkoutInformationPage.pageHeader).toHaveText('Checkout: Your Information')
        // })
    })

    test.describe('Cart product details display', () => {
        // test('Verify correct product name is displayed', async () => {
        //     // Add product to cart on Products page
        //     await productsPage.productAddToCartButton(0).click()
        //     // Get product name from Poducts page
        //     const productName = await productsPage.productName(0).textContent()
        //     // Go to Cart
        //     await productsPage.cartIcon.click()
        //     // Get product name from Cart paage
        //     const displayedProductName = await cartPage.productName(0).textContent()
        //     // Verify names match
        //     expect(productName).toEqual(displayedProductName)
        // })

        // test('Verify correct product price is displayed', async () => {
        //     // Add product to cart on Products page
        //     await productsPage.productAddToCartButton(0).click()
        //     // Get product price from Poducts page
        //     const productPrice = await productsPage.productPrice(0).textContent()
        //     // Go to Cart
        //     await productsPage.cartIcon.click()
        //     // Get product name from Cart page
        //     const displayedProductPrice = await cartPage.productPrice(0).textContent()
        //     // Verify prices match
        //     expect(productPrice).toEqual(displayedProductPrice)
        // })

        // test('Verify correct product description is displayed', async () => {
        //     // Add product to cart on Products page
        //     await productsPage.productAddToCartButton(0).click()
        //     // Get product description from Products page
        //     const productDescription = await productsPage.productDescription(0).textContent()
        //     // Go to Cart
        //     await productsPage.cartIcon.click()
        //     // Get product description from Cart page
        //     const displayedProductDescription = await cartPage.productDescription(0).textContent()
        //     // Verify descriptions match
        //     expect(productDescription).toEqual(displayedProductDescription)
        // })
    })

    test.describe('Cart Persistance', () => {
        // test('Verify product persists in cart after Cart page refresh', async () => {
        //     // Add product to cart
        //     await productsPage.productAddToCartButton(0).click()
        //     // Go to Cart page
        //     await productsPage.cartIcon.click()
        //     // Refresh the page
        //     await cartPage.reload()
        //     // Assert product still in cart
        //     await expect(cartPage.productItems).toHaveCount(1)
        // })

        // test('Verify product persist in cart after navigation between Cart and Product pages', async () => {
        //     // Add product to cart
        //     await productsPage.productAddToCartButton(0).click()
        //     // Go to Cart page
        //     await productsPage.cartIcon.click()
        //     // Verify there is 1 product in cart on cart page
        //     await expect(cartPage.productItems).toHaveCount(1)
        //     // Go back to Products page
        //     await cartPage.continueShoppingButton.click()
        //     // Go to Cart page
        //     await productsPage.cartIcon.click()
        //     // Verify product is still in cart on Cart page
        //     await expect(cartPage.productItems).toHaveCount(1)
        // })

        // test('Verify product persist in cart after navigation between Cart and Checkout pages', async () => {
        //     // Add product to cart
        //     await productsPage.productAddToCartButton(0).click()
        //     // Go to Cart page
        //     await productsPage.cartIcon.click()
        //     // Verify there is 1 product in cart on cart page
        //     await expect(cartPage.productItems).toHaveCount(1)
        //     // Go back to Checkout page
        //     await cartPage.checkoutButton.click()
        //     // Go to Cart page
        //     await checkoutInformationPage.cancelButton.click()
        //     // Verify product is still in cart on Cart page
        //     await expect(cartPage.productItems).toHaveCount(1)
        // })
    })
});
