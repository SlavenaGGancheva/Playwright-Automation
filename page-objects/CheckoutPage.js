export class CheckoutPage {
    constructor(page) {
        this.page = page
        this.pageHeader = page.getByText('Checkout: Your Information')
        this.firstNameField = page.getByPlaceholder('First Name')
        this.lastNameField = page.getByPlaceholder('Last Name')
        this.zipCodeField = page.getByPlaceholder('Zip/Postal Code')
        this.continueButton = page.getByRole('button', { name: 'Continue' })
        this.cancelButton = page.getByRole('button', { name: 'Cancel'})
    }
}