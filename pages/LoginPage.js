class LoginPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.email = page.locator('#Email');
        this.password = page.locator('#Password');
        this.loginButton = page.locator('.login-button');

        this.errorMessage = page.locator('.message-error');
        this.generalError = page.locator('.validation-summary-errors span');
        this.credentialsError = page.locator('.validation-summary-errors li');
    }

    // Open login page
    async navigate() {
        await this.page.goto('https://demowebshop.tricentis.com/login');
    }

    // Login method
    async login(email, password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}

module.exports = LoginPage;