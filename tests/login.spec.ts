import { test, expect } from '../fixtures/fixtures';
import { USUARIOS } from '../utils/testData';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('deve autenticar com credenciais válidas', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(USUARIOS.padrao.username, USUARIOS.padrao.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await inventoryPage.expectLoaded();
  });

  test('deve exibir erro com credenciais inválidas', async ({ loginPage }) => {
    await loginPage.login(USUARIOS.invalido.username, USUARIOS.invalido.password);
    await loginPage.expectErrorContaining(
      'Username and password do not match any user in this service'
    );
  });

  test('deve bloquear acesso do usuário locked_out_user', async ({ loginPage }) => {
    await loginPage.login(USUARIOS.bloqueado.username, USUARIOS.bloqueado.password);
    await loginPage.expectErrorContaining('Sorry, this user has been locked out');
  });
});
