
const { test, expect } = require('@playwright/test');

const RegisterPage = require('../pages/RegisterPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

test('Q3 - Product search and checkout', async ({ page }) => {

    // Generate unique customer email
    const email = `q3user${Date.now()}@example.com`;

    const registerPage = new RegisterPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const productName = 'Computing and Internet';

    // =================================
    // STEP 1: REGISTER CUSTOMER
    // =================================

    await registerPage.navigate();

    await registerPage.selectGender('male');

    await registerPage.fillRegistrationForm(
        'Test',
        'Customer',
        email,
        'Test@12345',
        'Test@12345'
    );

    await registerPage.register();

    await expect(registerPage.registrationResult)
        .toContainText('Your registration completed');

    // =================================
    // STEP 2: SEARCH FOR PRODUCT
    // =================================

    await page.goto('https://demowebshop.tricentis.com/');

    await page.locator('#small-searchterms')
        .fill(productName);

    await page.locator('.search-box-button').click();

    await page.getByRole('link', {
    name: 'Computing and Internet',
    exact: true
}).click();

    // =================================
    // STEP 3: VERIFY PRODUCT
    // =================================

    await productPage.waitForProductPage();

    expect(await productPage.getProductName())
        .toBe(productName);

    expect(await productPage.getUnitPrice())
        .toBe('10.00');

    // =================================
    // STEP 4: SET QUANTITY
    // =================================

    await productPage.setQuantity(2);

    expect(await productPage.getQuantity())
        .toBe('2');

    // =================================
    // STEP 5: ADD PRODUCT TO CART
    // =================================

    await productPage.addToCart();

    await expect(productPage.successMessage)
        .toBeVisible();

    // =================================
    // STEP 6: VERIFY SHOPPING CART
    // =================================

    await cartPage.navigate();

    const productRow = cartPage.getProductRow(productName);

    await expect(productRow).toHaveCount(1);

    expect(await cartPage.getUnitPrice(productName))
        .toBe('10.00');

    expect(await cartPage.getProductQuantity(productName))
        .toBe('2');

    expect(await cartPage.getSubtotal(productName))
        .toBe('20.00');

    // =================================
    // STEP 7: ACCEPT TERMS AND CHECKOUT
    // =================================

    await cartPage.acceptTerms();

    await expect(cartPage.termsCheckbox)
        .toBeChecked();

    await cartPage.proceedToCheckout();

    // =================================
    // STEP 8: BILLING ADDRESS
    // =================================

    await checkoutPage.fillBillingAddress({
        country: 'Bangladesh',
        state: 'Other (Non US)',
        city: 'Dhaka',
        address: '123 Test Street',
        zipCode: '1205',
        phone: '01712345678'
    });

    await checkoutPage.continueBillingAddress();

    // =================================
    // STEP 9: SHIPPING ADDRESS
    // =================================

    // Use the saved billing address selected by the website.
    await checkoutPage.continueShippingAddress();

    // =================================
    // STEP 10: SHIPPING METHOD
    // =================================

    await checkoutPage.selectGroundShipping();

    await expect(checkoutPage.groundShipping)
        .toBeChecked();

    await checkoutPage.continueShippingMethod();

    // =================================
    // STEP 11: PAYMENT METHOD
    // =================================

    await checkoutPage.selectCashOnDelivery();

    await expect(checkoutPage.cashOnDelivery)
        .toBeChecked();

    await checkoutPage.continuePaymentMethod();

    // =================================
    // STEP 12: PAYMENT INFORMATION
    // =================================

    await checkoutPage.continuePaymentInfo();

    // =================================
    // STEP 13: CONFIRM ORDER
    // =================================

    await expect(checkoutPage.confirmOrderButton)
        .toBeVisible();

    await checkoutPage.confirmOrder();

    // =================================
    // STEP 14: VERIFY ORDER SUCCESS
    // =================================

    await checkoutPage.verifyOrderSuccess();

    await expect(checkoutPage.orderSuccessMessage)
        .toContainText(
            'Your order has been successfully processed!'
        );

});
