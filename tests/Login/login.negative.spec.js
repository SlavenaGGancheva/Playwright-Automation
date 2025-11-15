import { test } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import users from '../../testData/users.json'
import errorMessages from '../../testData/loginErrorMessages.json'

const invalidLoginScenarios = [
    {
        name: 'Valid username and invalid password',
        username: users.standardUser.username,
        password: users.standardUser.wrongPassword,
        errorMessage: errorMessages.invalidCredentials
    },
    {
        name: 'Invalid username and valid password',
        username: users.invalidUser.username,
        password: users.invalidUser.password,
        errorMessage: errorMessages.invalidCredentials
    },
    {
        name: 'Locked out user',
        username: users.lockedOutUser.username,
        password: users.lockedOutUser.password,
        errorMessage: errorMessages.lockedOutUser
    },
    {
        name: 'Empty username field',
        username: '',
        password: users.standardUser.password,
        errorMessage: errorMessages.emptyUsernameField
    },
    {
        name: 'Empty password field',
        username: users.standardUser.username,
        password: '',
        errorMessage: errorMessages.emptyPasswordField
    }
]

test.describe('Login - negative scenarios', () => {
    
    let loginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.open()
    })

    invalidLoginScenarios.forEach(scenario => {
        test(`Verify error apperars for ${scenario.name}`, async () => {
            await loginPage.login(scenario.username, scenario.password)
            await loginPage.assertErrorMessage(scenario.errorMessage)
        })
    })
})