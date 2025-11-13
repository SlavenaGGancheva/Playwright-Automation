export class CartPage {

    constructor(page) {
        this.page = page
        this.qtyLabel = page.getByTestId('cart-quantity-label')
        this.descriptionLabel = page.getByTestId('cart-desc-label')
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' })
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
        this.productItems = page.getByTestId('inventory-item')
        this.cartIcon = page.getByTestId('shopping-cart-link')
        this.cartIconBadge = page.getByTestId('shopping-cart-badge')
    }
}