import { expect } from "@playwright/test"

export class CheckoutInformationPage {
    constructor(page) {
        this.page = page
        this.pageHeader = page.getByText('Checkout: Your Information')
        this.firstNameField = page.getByPlaceholder('First Name')
        this.lastNameField = page.getByPlaceholder('Last Name')
        this.zipCodeField = page.getByPlaceholder('Zip/Postal Code')
        this.continueButton = page.getByRole('button', { name: 'Continue' })
        this.cancelButton = page.getByRole('button', { name: 'Cancel' })
        this.errorMessage = page.getByTestId('error')
    }

    async completeInformationForm(firstName, lastName, zipCode) {
        await this.firstNameField.fill(firstName)
        await this.lastNameField.fill(lastName)
        await this.zipCodeField.fill(zipCode)
    }

    async assertErrorMessage(expectedErrorMessage) {
        await expect(this.errorMessage).toBeVisible()
        await expect(this.errorMessage).toHaveText(expectedErrorMessage)
    }
}