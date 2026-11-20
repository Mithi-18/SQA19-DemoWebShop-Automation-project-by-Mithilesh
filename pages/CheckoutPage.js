
const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;

        // ==============================
        // BILLING ADDRESS
        // ==============================

        this.billingStep = page.locator(
            '#checkout-step-billing'
        );

        this.countryDropdown = page.locator(
            '#BillingNewAddress_CountryId'
        );

        this.stateDropdown = page.locator(
            '#BillingNewAddress_StateProvinceId'
        );

        this.cityInput = page.locator(
            '#BillingNewAddress_City'
        );

        this.address1Input = page.locator(
            '#BillingNewAddress_Address1'
        );

        this.zipCodeInput = page.locator(
            '#BillingNewAddress_ZipPostalCode'
        );

        this.phoneInput = page.locator(
            '#BillingNewAddress_PhoneNumber'
        );

        this.billingContinueButton =
            this.billingStep.locator(
                '.new-address-next-step-button'
            );

        // ==============================
        // SHIPPING ADDRESS
        // ==============================

        this.shippingAddressStep = page.locator(
            '#checkout-step-shipping'
        );

        this.shippingAddressDropdown = page.locator(
            '#shipping-address-select'
        );

        this.pickupCheckbox = page.locator(
            '#PickUpInStore'
        );

        this.shippingContinueButton =
            this.shippingAddressStep.locator(
                '.new-address-next-step-button'
            );

        // ==============================
        // SHIPPING METHOD
        // ==============================

        this.shippingMethodStep = page.locator(
            '#checkout-step-shipping-method'
        );

        this.groundShipping = page.locator(
            '#shippingoption_0'
        );

        this.shippingMethodContinueButton = page.locator(
            '.shipping-method-next-step-button'
        );

        // ==============================
        // PAYMENT METHOD
        // ==============================

        this.cashOnDelivery = page.locator(
            '#paymentmethod_0'
        );

        this.paymentMethodContinueButton = page.locator(
            '.payment-method-next-step-button'
        );

        // ==============================
        // PAYMENT INFORMATION
        // ==============================

        this.paymentInfoContinueButton = page.locator(
            '.payment-info-next-step-button'
        );

        // ==============================
        // CONFIRM ORDER
        // ==============================

        this.confirmOrderButton = page.locator(
            '.confirm-order-next-step-button'
        );

        // ==============================
        // ORDER SUCCESS
        // ==============================

        this.orderSuccessMessage = page.locator(
            'strong'
        ).filter({
            hasText: 'Your order has been successfully processed!'
        });
    }

    // ==============================
    // NAVIGATE TO CHECKOUT
    // ==============================

    async navigate() {
        await this.page.goto(
            'https://demowebshop.tricentis.com/checkout'
        );
    }

    // ==============================
    // BILLING ADDRESS
    // ==============================

    async fillBillingAddress(details) {

        await this.countryDropdown.selectOption({
            label: details.country
        });

        if (details.state) {
            await this.stateDropdown.selectOption({
                label: details.state
            });
        }

        await this.cityInput.fill(details.city);

        await this.address1Input.fill(details.address);

        await this.zipCodeInput.fill(details.zipCode);

        await this.phoneInput.fill(details.phone);
    }

    async continueBillingAddress() {

        await this.billingContinueButton.click();

        await this.shippingAddressDropdown.waitFor({
            state: 'visible',
            timeout: 15000
        });
    }

    // ==============================
    // SHIPPING ADDRESS
    // ==============================

    async selectShippingAddress(index) {

        await this.shippingAddressDropdown.selectOption({
            index: index
        });
    }

    async selectInStorePickup() {

        await this.pickupCheckbox.check();
    }

    async continueShippingAddress() {

        // Wait for shipping address dropdown
        await this.shippingAddressDropdown.waitFor({
            state: 'visible',
            timeout: 15000
        });

        // Verify that an address is selected
        await expect(this.shippingAddressDropdown)
            .toHaveValue(/.+/);

        // Click the correct Shipping Address Continue button
        await this.shippingContinueButton.click();

        // Wait for Ground shipping option
        await this.groundShipping.waitFor({
            state: 'visible',
            timeout: 15000
        });
    }

    // ==============================
    // SHIPPING METHOD
    // ==============================

    async selectGroundShipping() {

        await this.groundShipping.check();
    }

    async continueShippingMethod() {

        await this.shippingMethodContinueButton.click();

        await this.cashOnDelivery.waitFor({
            state: 'visible',
            timeout: 15000
        });
    }

    // ==============================
    // PAYMENT METHOD
    // ==============================

    async selectCashOnDelivery() {

        await this.cashOnDelivery.check();
    }

    async continuePaymentMethod() {

        await this.paymentMethodContinueButton.click();

        await this.paymentInfoContinueButton.waitFor({
            state: 'visible',
            timeout: 15000
        });
    }

    // ==============================
    // PAYMENT INFORMATION
    // ==============================

    async continuePaymentInfo() {

        await this.paymentInfoContinueButton.click();

        await this.confirmOrderButton.waitFor({
            state: 'visible',
            timeout: 15000
        });
    }

    // ==============================
    // CONFIRM ORDER
    // ==============================

    async confirmOrder() {

        await this.confirmOrderButton.click();
    }

    // ==============================
    // ORDER VERIFICATION
    // ==============================

    async verifyOrderSuccess() {

        await this.orderSuccessMessage.waitFor({
            state: 'visible',
            timeout: 15000
        });
    }

    async getOrderSuccessMessage() {

        return (
            await this.orderSuccessMessage.innerText()
        ).trim();
    }
}

module.exports = CheckoutPage;
