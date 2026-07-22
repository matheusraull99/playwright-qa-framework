import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { USUARIOS } from '../utils/testData';

/**
 * Fixtures customizadas do framework.
 *
 * - Cada Page Object é injetado como fixture: o teste recebe a instância pronta,
 *   sem `new XxxPage(page)` espalhado pelos specs.
 * - `usuarioLogado`: entrega a sessão já autenticada (login via UI com o standard_user
 *   e navegação confirmada no inventário). Testes que não são de login partem daqui.
 */
type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  /** Sessão autenticada: ao usar esta fixture o teste já começa logado no inventário. */
  usuarioLogado: void;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  usuarioLogado: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.goto();
    await loginPage.login(USUARIOS.padrao.username, USUARIOS.padrao.password);
    await inventoryPage.expectLoaded();
    await use();
  },
});

export { expect } from '@playwright/test';
