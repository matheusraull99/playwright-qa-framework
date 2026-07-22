/**
 * Dados de teste centralizados + gerador de dados caseiro (sem dependência externa).
 *
 * Credenciais públicas documentadas na home do https://www.saucedemo.com
 * (site demo mantido pela Sauce Labs para prática de automação).
 */

export const USUARIOS = {
  padrao: { username: 'standard_user', password: 'secret_sauce' },
  bloqueado: { username: 'locked_out_user', password: 'secret_sauce' },
  invalido: { username: 'usuario_inexistente', password: 'senha_errada' },
} as const;

export const PRODUTOS = {
  mochila: 'Sauce Labs Backpack',
  luzBicicleta: 'Sauce Labs Bike Light',
  camiseta: 'Sauce Labs Bolt T-Shirt',
} as const;

const NOMES = ['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa', 'Fabio', 'Gabriela', 'Heitor'];
const SOBRENOMES = ['Silva', 'Souza', 'Oliveira', 'Pereira', 'Costa', 'Almeida', 'Rocha', 'Lima'];

function itemAleatorio<T>(lista: readonly T[]): T {
  return lista[Math.floor(Math.random() * lista.length)];
}

/** Gera dados de checkout realistas e únicos por execução (faker leve caseiro). */
export function gerarDadosCheckout(): { firstName: string; lastName: string; postalCode: string } {
  return {
    firstName: itemAleatorio(NOMES),
    lastName: itemAleatorio(SOBRENOMES),
    postalCode: String(Math.floor(10000 + Math.random() * 89999)),
  };
}
