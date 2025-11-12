export class ProductsPage {
    constructor(page) {
        this.page = page
        this.pageTitle = page.getByText('Swag Labs')
        this.pageHeader = page.getByText('Products')
        this.cartIcon = page.getByTestId('shopping-cart-link')
        this.menuButton = page.getByTestId('open-menu')
        this.productItems = page.getByTestId('inventory-item-description')
    }
}