class ModalComponent {
    public get closeModalBasketButton() {
        return $(`div.v-modal__close-btn`);
    }

    async closeModalBasket() {
        await this.closeModalBasketButton.waitForClickable();
        await this.closeModalBasketButton.click();
    }
}

export default new ModalComponent();