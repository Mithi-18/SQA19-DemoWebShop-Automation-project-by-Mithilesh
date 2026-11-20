
class CartPage {
    constructor(page) {
        this.page = page;

        // Cart elements
        this.cartTable = page.locator('table.cart');
        this.cartRows = page.locator('table.cart tbody tr');

        // Quantity input
        this.quantityInput = page.locator('.qty-input');

        // Unit price
        this.unitPrice = page.locator('.product-unit-price');

        // Product subtotal
        this.subtotal = page.locator('.product-subtotal');

        // Update cart button
        this.updateCartButton = page.locator('input[name="updatecart"]');

        // Terms and conditions checkbox (Q3)
        this.termsCheckbox = page.locator('#termsofservice');

        // Checkout button (Q3)
        this.checkoutButton = page.locator('#checkout');
    }

    // Navigate to shopping cart
    async navigate() {
        await this.page.goto('https://demowebshop.tricentis.com/cart');
    }

    // Get a specific product row (Q3)
    getProductRow(productName) {
        return this.cartRows.filter({
            hasText: productName
        });
    }

    // Get quantity of a product (Q2)
    async getProductQuantity(productName) {
        const productRow = this.getProductRow(productName);

        return await productRow.locator('.qty-input').inputValue();
    }

    // Get unit price of a product (Q2)
    async getUnitPrice(productName) {
        const productRow = this.getProductRow(productName);

        return await productRow.locator('.product-unit-price').innerText();
    }

    // Update product quantity (Q2)
    async updateQuantity(productName, quantity) {
        const productRow = this.getProductRow(productName);

        await productRow.locator('.qty-input').fill(String(quantity));
        await this.updateCartButton.click();
    }

    // Get product subtotal (Q2)
    async getSubtotal(productName) {
        const productRow = this.getProductRow(productName);

        return await productRow.locator('.product-subtotal').innerText();
    }

    // Accept terms and conditions (Q3)
    async acceptTerms() {
        await this.termsCheckbox.check();
    }

    // Proceed to checkout (Q3)
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = CartPage;
