export class CheckoutCompletePage {
    constructor(page) {
        this.pageHeader = page.getByText('Checkout: Complete!')
        this.conformationHeader = page.getByTestId('complete-header')
        this.conformationMessage = page.getByTestId('complete-text')
        this.backHomeButton = page.getByRole('button', {name: 'Back Home'})
    }
}