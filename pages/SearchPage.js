class SearchPage {
    constructor(page) {
        this.page = page;

        // Search box
        this.searchInput = page.locator('#small-searchterms');

        // Search button
        this.searchButton = page.locator('.search-box-button');
    }

    // Search for a product
    async searchProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }
}

module.exports = SearchPage;