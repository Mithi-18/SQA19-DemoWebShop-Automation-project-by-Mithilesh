<<<<<<< HEAD
=======

>>>>>>> q3-product-search-checkout
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
<<<<<<< HEAD
        await this.page.goto('https://demowebshop.tricentis.com/register');
    }

    // Select gender with validation
=======
        await this.page.goto(
            'https://demowebshop.tricentis.com/register'
        );
    }

    // Select gender
>>>>>>> q3-product-search-checkout
    async selectGender(gender) {
        const normalizedGender = gender.toLowerCase();

        if (normalizedGender === 'male') {
            await this.maleRadio.check();
        } else if (normalizedGender === 'female') {
            await this.femaleRadio.check();
        } else {
<<<<<<< HEAD
            throw new Error(`Invalid gender provided: ${gender}`);
=======
            throw new Error(`Invalid gender: ${gender}`);
>>>>>>> q3-product-search-checkout
        }
    }

    // Fill registration form
<<<<<<< HEAD
    async fillRegistrationForm(firstName, lastName, email, password, confirmPassword) {
=======
    async fillRegistrationForm(
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    ) {
>>>>>>> q3-product-search-checkout
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

<<<<<<< HEAD
module.exports = RegisterPage;
=======
module.exports = RegisterPage;
>>>>>>> q3-product-search-checkout
