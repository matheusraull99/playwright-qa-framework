import { Locator, Page, expect } from '@playwright/test';

/**
 * Page Object da listagem de produtos (inventário).
 * Expõe métodos de negócio (ordenar, adicionar ao carrinho) em vez de cliques crus.
 */
export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortSelect: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  /** Ordena a listagem. Valores: az | za | lohi | hilo */
  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortSelect.selectOption(option);
  }

  /** Retorna os preços exibidos, na ordem da tela, como números. */
  async getDisplayedPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  /** Adiciona um produto ao carrinho pelo nome exibido. */
  async addToCart(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  /** Remove um produto do carrinho a partir da listagem. */
  async removeFromCart(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async expectCartBadgeCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectCartBadgeHidden(): Promise<void> {
    await expect(this.cartBadge).toHaveCount(0);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
