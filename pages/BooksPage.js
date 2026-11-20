
class BooksPage {
    constructor(page) {
        this.page = page;

        // Product category
        this.booksCategory = page.locator('.top-menu').getByRole('link', {
            name: 'Books',
            exact: true
        });

        // Product name
        this.productName = 'Computing and Internet';

        // Success notification
        this.successMessage = page.locator('div.bar-notification.success');
    }

    // Navigate to Books category
    async navigate() {
        await this.page.goto('https://demowebshop.tricentis.com/books');
    }

    // Locate a product
    getProduct(productName) {
        return this.page.locator('.product-item').filter({
            has: this.page.getByRole('link', {
                name: productName,
                exact: true
            })
        });
    }

    // Add product to cart
    async addToCart(productName) {
        const product = this.getProduct(productName);

        await product.getByRole('button', {
            name: 'Add to cart'
        }).click();
    }
}

module.exports = BooksPage;
