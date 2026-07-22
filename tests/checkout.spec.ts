import { test, expect } from '../fixtures/fixtures';
import { PRODUTOS, gerarDadosCheckout } from '../utils/testData';

test.describe('Checkout', () => {
  test('fluxo completo de compra até a confirmação do pedido', async ({
    usuarioLogado,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await inventoryPage.addToCart(PRODUTOS.mochila);
    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillInformation(gerarDadosCheckout());
    await checkoutPage.continueToOverview();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(checkoutPage.summaryTotal).toContainText('Total');
    await checkoutPage.finish();

    await checkoutPage.expectOrderComplete();
    await checkoutPage.backHomeButton.click();
    await inventoryPage.expectLoaded();
    await inventoryPage.expectCartBadgeHidden();
  });

  test('deve validar campo obrigatório no formulário de checkout', async ({
    usuarioLogado,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addToCart(PRODUTOS.luzBicicleta);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    // Envia o formulário sem preencher nada
    await checkoutPage.continueToOverview();
    await checkoutPage.expectErrorContaining('Error: First Name is required');

    // Preenche apenas o primeiro nome — o próximo campo obrigatório deve acusar erro
    await checkoutPage.firstNameInput.fill('Ana');
    await checkoutPage.continueToOverview();
    await checkoutPage.expectErrorContaining('Error: Last Name is required');
  });
});
