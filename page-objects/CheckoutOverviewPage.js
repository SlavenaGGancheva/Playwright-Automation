export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page
        this.pageHeader = page.getByText('Checkout: Overview')
        this.paymentInformationLabel = page.getByText('Payment Information')
        this.shippingInformationLabel = page.getByText('Shipping Information')
        this.priceTotalLabel = page.getByText('Price Total')
        this.itemTotal = page.getByTestId('subtotal-label')
        this.tax = page.getByTestId('tax-label')
        this.total = page.getByTestId('total-label')
        this.cancelButton = page.getByRole('button', { name: 'Cancel' })
        this.finishButton = page.getByRole('button', {name: 'Finish'})
    }
}