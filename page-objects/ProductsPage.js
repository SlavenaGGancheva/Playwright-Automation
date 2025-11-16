export class ProductsPage {
    constructor(page) {
        this.page = page
        this.pageTitle = page.getByText('Swag Labs')
        this.pageHeader = page.getByText('Products')
        this.cartIcon = page.getByTestId('shopping-cart-link')
        this.cartIconBadge = page.getByTestId('shopping-cart-badge')
        this.menuButton = page.getByRole('button', {name: 'Open Menu'})
        this.productItems = page.getByTestId('inventory-item-description')
        this.productNames = page.getByTestId('inventory-item-name')
        this.productPrices = page.getByTestId('inventory-item-price')
        this.sortDropdownMenu = page.getByTestId('product-sort-container')
        this.logoutButton = page.getByTestId('logout-sidebar-link')
    }

    productName(index) {
        return this.productItems.nth(index).getByTestId('inventory-item-name')
    }

    productPrice(index) {
        return this.productItems.nth(index).getByTestId('inventory-item-price')
    }

    productAddToCartButton(index) {
        return this.productItems.nth(index).getByRole('button', {name: 'Add to cart'})
    }

    productRemoveFromCartButton(index) {
        return this.productItems.nth(index).getByRole('button', {name: 'Remove'})
    }

    productDescription(index) {
        return this.productItems.nth(index).getByTestId('inventory-item-desc')
    }

    async getProductNames() {
        return await this.productNames.allTextContents()
    }

    async getProductPrices() {
        const productPricesText = await this.productPrices.allTextContents()
        return productPricesText.map(textPrice => Number(textPrice.replace('$', '').trim()))
    }

    async getCartIconBadgeCount() {
        const badgeCount = await this.cartIconBadge.count()
        if (badgeCount === 0) {
            return 0
        }
        const cartIconBadgeCountText = await this.cartIconBadge.textContent()
        return Number(cartIconBadgeCountText)
    }

    async openMenu() {
        await this.menuButton.click()
    }

    async logout() {
        await this.menuButton.click()
        await this.logoutButton.click()
    }
}