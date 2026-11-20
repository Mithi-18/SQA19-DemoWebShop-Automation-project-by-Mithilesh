# SQA19 – Demo Web Shop Automation Testing

## Project Overview
This project automates functional testing of the Tricentis Demo Web Shop using Playwright and Newman.

## Technologies Used
- JavaScript (Node.js)
- Playwright
- Page Object Model (POM)
- Postman
- Newman
- Allure Reporting
- Git and GitHub

## Automated Test Scenarios

### Q1 – Invalid Login
Tests login functionality using invalid credentials.

### Q2 – Register and Add Product to Cart
Tests user registration and adding a product to the shopping cart.

### Q3 – Product Search and Checkout
Tests product searching, cart operations and checkout functionality.

## Browser Testing
Tests are configured for:
- Chromium
- Firefox
- WebKit

## Run Playwright Tests

```bash
npx playwright test --workers=1
```

## View Playwright Report

```bash
npx playwright show-report
```

## Run Newman API Tests

```bash
npx newman run "api-tests/SQA19-Demo-WebShop-API-Collection.json"
```

## Allure Reporting

Generate and view the Allure report using the configured Allure commands.

## Test Results
- Total Playwright tests: 15
- Passed: 15
- Failed: 0
- Browser coverage: Chromium, Firefox and WebKit

