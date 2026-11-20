
class CartPage {
    constructor(page) {
        this.page = page;

<<<<<<< HEAD
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
=======
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
>>>>>>> q3-product-search-checkout
    }
}

module.exports = CartPage;
