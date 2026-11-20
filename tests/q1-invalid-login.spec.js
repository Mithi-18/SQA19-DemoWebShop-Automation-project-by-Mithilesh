
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('Q1 - Invalid login credentials', async ({ page }, testInfo) => {

    const loginPage = new LoginPage(page);

    // Step 1: Navigate to login page
    await loginPage.navigate();

    // Step 2: Enter invalid credentials
    await loginPage.login(
        'invaliduser@example.com',
        'WrongPassword123'
    );

    // Step 3: Verify error messages
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.credentialsError).toBeVisible();

    // Step 4: Verify customer remains logged out
    await expect(loginPage.email).toBeVisible();
    await expect(loginPage.password).toBeVisible();

    // Step 5: Capture screenshot
    const screenshot = await page.screenshot({
        fullPage: true
    });

    // Step 6: Attach screenshot to Playwright and Allure reports
    await testInfo.attach('Q1-Invalid-Login-Screenshot', {
        body: screenshot,
        contentType: 'image/png'
    });

});
