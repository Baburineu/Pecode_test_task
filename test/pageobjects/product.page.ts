import Page from './page.ts'

class ProductPage extends Page {
    public get productBuyButton() {
        return $(`#product-buy-button`)
    }

    async productBuy() {
        await this.productBuyButton.waitForClickable()
        await this.productBuyButton.click()
    }
}

export default new ProductPage();