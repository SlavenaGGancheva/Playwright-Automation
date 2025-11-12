import { expect } from "@playwright/test"

export class LoginPage {
    constructor(page) {
        this.page = page
        this.usernameField = page.getByPlaceholder('Username')
        this.passwordField = page.getByPlaceholder('Password')
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.pageTitle = page.getByText('Swag Labs')
        this.errorMessage = page.getByTestId('error')
    }

    async login(username, password) {
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }

    async assertErrorMessage(expectedErrorMessage) {
        await expect(this.errorMessage).toBeVisible()
        await expect(this.errorMessage).toHaveText(expectedErrorMessage)
    }
}