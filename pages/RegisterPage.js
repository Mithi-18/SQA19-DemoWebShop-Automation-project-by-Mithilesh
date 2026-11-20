class RegisterPage {
    constructor(page) {
        this.page = page;

        // Gender locators
        this.maleRadio = page.locator('#gender-male');
        this.femaleRadio = page.locator('#gender-female');

        // Name locators
        this.firstName = page.locator('#FirstName');
        this.lastName = page.locator('#LastName');

        // Email locator
        this.email = page.locator('#Email');

        // Password locators
        this.password = page.locator('#Password');
        this.confirmPassword = page.locator('#ConfirmPassword');

        // Register button
        this.registerButton = page.locator('#register-button');

        // Registration result
        this.registrationResult = page.locator('.result');
    }

    // Navigate to registration page
    async navigate() {
        await this.page.goto('https://demowebshop.tricentis.com/register');
    }

    // Select gender with validation
    async selectGender(gender) {
        const normalizedGender = gender.toLowerCase();

        if (normalizedGender === 'male') {
            await this.maleRadio.check();
        } else if (normalizedGender === 'female') {
            await this.femaleRadio.check();
        } else {
            throw new Error(`Invalid gender provided: ${gender}`);
        }
    }

    // Fill registration form
    async fillRegistrationForm(firstName, lastName, email, password, confirmPassword) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
    }

    // Submit registration
    async register() {
        await this.registerButton.click();
    }
}

module.exports = RegisterPage;