
class ProductPage {
    constructor(page) {
        this.page = page;

        // Product details
        this.productName = page.locator('h1[itemprop="name"]');
        this.unitPrice = page.locator('.product-price [itemprop="price"]');

        // Quantity input
        this.quantityInput = page.locator('#addtocart_13_EnteredQuantity');

        // Add to cart button
        this.addToCartButton = page.locator('#add-to-cart-button-13');

        // Success notification
        this.successMessage = page.locator('div.bar-notification.success');
    }

    // Verify product details page is loaded
    async waitForProductPage() {
        await this.productName.waitFor({
            state: 'visible'
        });
    }

    // Get product name
    async getProductName() {
        return (await this.productName.innerText()).trim();
    }

    // Get unit price
    async getUnitPrice() {
        return (await this.unitPrice.innerText()).trim();
    }

    // Get current product quantity
    async getQuantity() {
        return await this.quantityInput.inputValue();
    }

    // Set product quantity
    async setQuantity(quantity) {
        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new Error('Quantity must be a positive integer');
        }

        await this.quantityInput.fill(String(quantity));
    }

    // Add product to shopping cart
    async addToCart() {
        await this.addToCartButton.click();
    }

    // Verify success notification
    async isAddedToCart() {
        return await this.successMessage.isVisible();
    }
}

module.exports = ProductPage;
