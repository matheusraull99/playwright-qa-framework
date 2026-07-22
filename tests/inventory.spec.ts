import { test, expect } from '../fixtures/fixtures';
import { PRODUTOS } from '../utils/testData';

test.describe('Inventário', () => {
  test('deve listar os 6 produtos com nome e preço', async ({ usuarioLogado, inventoryPage }) => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
    await expect(inventoryPage.itemNames).toHaveCount(6);
    const precos = await inventoryPage.getDisplayedPrices();
    expect(precos).toHaveLength(6);
    for (const preco of precos) {
      expect(preco).toBeGreaterThan(0);
    }
  });

  test('deve ordenar produtos por preço crescente', async ({ usuarioLogado, inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const precos = await inventoryPage.getDisplayedPrices();
    const ordenados = [...precos].sort((a, b) => a - b);
    expect(precos).toEqual(ordenados);
  });

  test('deve adicionar produto ao carrinho e refletir no badge', async ({
    usuarioLogado,
    inventoryPage,
  }) => {
    await inventoryPage.addToCart(PRODUTOS.mochila);
    await inventoryPage.expectCartBadgeCount(1);
    await inventoryPage.addToCart(PRODUTOS.luzBicicleta);
    await inventoryPage.expectCartBadgeCount(2);
  });
});
