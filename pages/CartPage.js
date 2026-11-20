
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
    }

    // Navigate to shopping cart
    async navigate() {
        await this.page.goto('https://demowebshop.tricentis.com/cart');
    }

    // Get quantity of a product
    async getProductQuantity(productName) {
        const productRow = this.cartRows.filter({
            hasText: productName
        });

        return await productRow.locator('.qty-input').inputValue();
    }

    // Get unit price of a product
    async getUnitPrice(productName) {
        const productRow = this.cartRows.filter({
            hasText: productName
        });

        return await productRow.locator('.product-unit-price').innerText();
    }

    // Update product quantity
    async updateQuantity(productName, quantity) {
        const productRow = this.cartRows.filter({
            hasText: productName
        });

        await productRow.locator('.qty-input').fill(String(quantity));
        await this.updateCartButton.click();
    }

    // Get product subtotal
    async getSubtotal(productName) {
        const productRow = this.cartRows.filter({
            hasText: productName
        });

        return await productRow.locator('.product-subtotal').innerText();
    }
}

module.exports = CartPage;
