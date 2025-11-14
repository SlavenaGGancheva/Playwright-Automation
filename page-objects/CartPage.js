export class CartPage {

    constructor(page) {
        this.page = page
        this.pageHeader = page.getByText('Your Cart')
        this.qtyLabel = page.getByTestId('cart-quantity-label')
        this.descriptionLabel = page.getByTestId('cart-desc-label')
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' })
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
        this.productItems = page.getByTestId('inventory-item')
        this.cartIcon = page.getByTestId('shopping-cart-link')
        this.cartIconBadge = page.getByTestId('shopping-cart-badge')
        this.productQuantityLabel = page.getByTestId('cart-quantity-label')
        this.productDescriptionLabel = page.getByTestId('cart-desc-label')
    }

    productName(index) {
        return this.productItems.nth(index).getByTestId('inventory-item-name')
    }

    productPrice(index) {
        return this.productItems.nth(index).getByTestId('inventory-item-price')
    }

    productDescription(index) {
        return this.productItems.nth(index).getByTestId('inventory-item-desc')
    }

    productRemoveFromCartButton(index) {
        return this.productItems.nth(index).getByRole('button', {name: 'Remove'})
    }

    async getCartIconBadgeCount() {
        const cartIconBadgeCountText = await this.cartIconBadge.textContent()
        return Number(cartIconBadgeCountText)
    }

    async reload() {
        await this.page.reload()
    }
}