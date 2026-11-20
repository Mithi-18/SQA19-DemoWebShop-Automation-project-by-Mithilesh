
const { test, expect } = require('@playwright/test');

const RegisterPage = require('../pages/RegisterPage');
const BooksPage = require('../pages/BooksPage');
const CartPage = require('../pages/CartPage');

test('Q2 - Register and add product to cart', async ({ page }) => {

    // Generate unique email for registration
    const email = `q2user${Date.now()}@example.com`;

    const registerPage = new RegisterPage(page);
    const booksPage = new BooksPage(page);
    const cartPage = new CartPage(page);

    // Step 1: Navigate to registration page
    await registerPage.navigate();

    // Step 2: Fill registration details
    await registerPage.selectGender('male');

    await registerPage.fillRegistrationForm(
        'Test',
        'User',
        email,
        'Test@12345',
        'Test@12345'
    );

    // Step 3: Submit registration
    await registerPage.register();

    await expect(registerPage.registrationResult)
        .toContainText('Your registration completed');

    // Step 4: Navigate to Books category
    await booksPage.navigate();

    // Step 5: Add Computing and Internet to cart
    const productName = 'Computing and Internet';

    await booksPage.addToCart(productName);

    // Step 6: Verify success notification
    await expect(booksPage.successMessage).toBeVisible();

    // Step 7: Navigate to shopping cart
    await cartPage.navigate();

    // Step 8: Verify product exists in cart
    const productRow = cartPage.cartRows.filter({
        hasText: productName
    });

    await expect(productRow).toHaveCount(1);

    // Step 9: Verify unit price
    expect(await cartPage.getUnitPrice(productName)).toBe('10.00');

    // Step 10: Verify product quantity
    expect(await cartPage.getProductQuantity(productName)).toBe('1');

    // Step 11: Verify product subtotal
    expect(await cartPage.getSubtotal(productName)).toBe('10.00');

});
