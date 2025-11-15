export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page
        this.pageHeader = page.getByText('Checkout: Overview')
        this.cartIcon = page.getByTestId('shopping-cart-link')
        this.cartIconBadge = page.getByTestId('shopping-cart-badge')
        this.paymentInformationSection = page.getByText('Payment Information')
        this.shippingInformationSection = page.getByText('Shipping Information')
        this.priceTotalSection = page.getByText('Price Total')
        this.itemTotal = page.getByTestId('subtotal-label')
        this.tax = page.getByTestId('tax-label')
        this.total = page.getByTestId('total-label')
        this.cancelButton = page.getByRole('button', { name: 'Cancel' })
        this.finishButton = page.getByRole('button', {name: 'Finish'})
    }

    async getItemTotal() {
        const itemTotalText = await this.itemTotal.textContent()
        return Number(itemTotalText.replace('$', '').trim())
    }

    async getTax() {
        const taxText = await this.tax.textContent()
        return Number(taxText.replace('$', '').trim())
    }

    async getTotal() {
        const totalText = await this.tax.textContent()
        return Number(totalText.replace('$', '').trim())
    }
}