describe('Checkout Page Tests', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
  });

  it('Finalizar checkout com sucesso', () => {
    cy.get('[data-test="firstName"]').type('Fabio');
    cy.get('[data-test="lastName"]').type('Dias');
    cy.get('[data-test="postalCode"]').type('12243-280');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  });

  it('Validar erro ao deixar campos obrigatórios em branco', () => {
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('have.text', 'Error: First Name is required');
  });

  it('Erro ao preencher apenas o primeiro nome', () => {
    cy.get('[data-test="firstName"]').type('Fabio');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('have.text', 'Error: Last Name is required');
  });

  it('Erro ao preencher sem o CEP', () => {
    cy.get('[data-test="firstName"]').type('Fabio');
    cy.get('[data-test="lastName"]').type('Dias');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('have.text', 'Error: Postal Code is required');
  });

  it('Validar resumo do pedido antes de finalizar', () => {
    cy.get('[data-test="firstName"]').type('Fabio');
    cy.get('[data-test="lastName"]').type('Dias');
    cy.get('[data-test="postalCode"]').type('12243-280');
    cy.get('[data-test="continue"]').click();

    cy.get('.summary_subtotal_label').should('contain', 'Item total:');
    cy.get('.summary_tax_label').should('contain', 'Tax:');
    cy.get('.summary_total_label').should('contain', 'Total:');
  });

  it('Cancelar o checkout e voltar para o carrinho', () => {
    cy.get('[data-test="firstName"]').type('Fabio');
    cy.get('[data-test="cancel"]').click();
    cy.url().should('include', '/cart.html');
  });

});
