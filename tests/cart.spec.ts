import { test } from '../fixtures/fixtures';
import { PRODUTOS } from '../utils/testData';

test.describe('Carrinho', () => {
  test('badge do carrinho deve refletir itens adicionados e o carrinho deve exibi-los', async ({
    usuarioLogado,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCart(PRODUTOS.mochila);
    await inventoryPage.addToCart(PRODUTOS.camiseta);
    await inventoryPage.expectCartBadgeCount(2);

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemCount(2);
    await cartPage.expectItemVisible(PRODUTOS.mochila);
    await cartPage.expectItemVisible(PRODUTOS.camiseta);
  });

  test('remover item do carrinho deve atualizar lista e badge', async ({
    usuarioLogado,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCart(PRODUTOS.mochila);
    await inventoryPage.addToCart(PRODUTOS.camiseta);
    await inventoryPage.openCart();
    await cartPage.expectLoaded();

    await cartPage.removeItem(PRODUTOS.mochila);
    await cartPage.expectItemCount(1);
    await cartPage.expectItemVisible(PRODUTOS.camiseta);
    await inventoryPage.expectCartBadgeCount(1);

    await cartPage.removeItem(PRODUTOS.camiseta);
    await cartPage.expectItemCount(0);
    await inventoryPage.expectCartBadgeHidden();
  });
});
