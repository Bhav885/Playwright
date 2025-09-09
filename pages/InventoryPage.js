export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.backpackAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.bikeLightAddButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addBackpack() {
    await this.backpackAddButton.click();
  }

  async addBikeLight() {
    await this.bikeLightAddButton.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}
