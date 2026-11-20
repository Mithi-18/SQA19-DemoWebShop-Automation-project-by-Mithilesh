
class CartPage {
    constructor(page) {
        this.page = page;

        // ==============================
        // SHOPPING CART ELEMENTS
        // ==============================

        this.cartTable = page.locator('table.cart');

        this.cartRows = page.locator('table.cart tbody tr');

        // ==============================
        // PRODUCT DETAILS
        // ==============================

        this.unitPrice = '.product-unit-price';

        this.quantityInput = '.qty-input';

        this.subtotal = '.product-subtotal';

        // ==============================
        // CART BUTTONS
        // ==============================

        this.updateCartButton = page.locator(
            'input[name="updatecart"]'
        );

        // ==============================
        // TERMS AND CHECKOUT
        // ==============================

        this.termsCheckbox = page.locator(
            '#termsofservice'
        );

        this.checkoutButton = page.locator(
            '#checkout'
        );
    }

    // ==============================
    // NAVIGATE TO SHOPPING CART
    // ==============================

    async navigate() {
        await this.page.goto(
            'https://demowebshop.tricentis.com/cart'
        );
    }

    // ==============================
    // FIND PRODUCT ROW
    // ==============================

    getProductRow(productName) {
        return this.cartRows.filter({
            hasText: productName
        });
    }

    // ==============================
    // GET PRODUCT UNIT PRICE
    // ==============================

    async getUnitPrice(productName) {
        const productRow = this.getProductRow(productName);

        return (
            await productRow.locator(this.unitPrice).innerText()
        ).trim();
    }

    // ==============================
    // GET PRODUCT QUANTITY
    // ==============================

    async getProductQuantity(productName) {
        const productRow = this.getProductRow(productName);

        return await productRow.locator(
            this.quantityInput
        ).inputValue();
    }

    // ==============================
    // GET PRODUCT SUBTOTAL
    // ==============================

    async getSubtotal(productName) {
        const productRow = this.getProductRow(productName);

        return (
            await productRow.locator(this.subtotal).innerText()
        ).trim();
    }

    // ==============================
    // UPDATE PRODUCT QUANTITY
    // ==============================

    async updateQuantity(productName, quantity) {
        const productRow = this.getProductRow(productName);

        await productRow.locator(
            this.quantityInput
        ).fill(String(quantity));

        await this.updateCartButton.click();
    }

    // ==============================
    // ACCEPT TERMS AND CONDITIONS
    // ==============================

    async acceptTerms() {
        await this.termsCheckbox.check();
    }

    // ==============================
    // PROCEED TO CHECKOUT
    // ==============================

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = CartPage;
