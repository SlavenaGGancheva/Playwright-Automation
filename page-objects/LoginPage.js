import { expect } from '@playwright/test';
export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.pageTitle = page.getByText('Swag Labs');
        this.errorMessage = page.getByTestId('error');
    }

    async open() {
        await this.page.goto('/');
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async assertOnLoginPage() {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.usernameField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
    } 

    async assertErrorMessage(expectedErrorMessage) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedErrorMessage);
    }

    
}
