export class CheckoutCompletePage {
    constructor(page) {
        this.pageHeader = page.getByText('Checkout: Complete!')
        this.thankYouMessage = page.getByTestId('complete-header')
        this.confirmationMessage = page.getByTestId('complete-text')
        this.backHomeButton = page.getByRole('button', { name: 'Back Home' })
        this.cartIcon = page.getByTestId('shopping-cart-link')
        this.cartIconBadge = page.getByTestId('shopping-cart-badge')
    }
}