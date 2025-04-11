describe('Pagina de produtos', () => {

    beforeEach(() => {
        // Acessar a página de login e fazer login
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory.html');
    });

    it('Visualizar detalhes de um produto', () => {
        cy.get('.inventory_item:nth-child(1) .inventory_item_name').click();
        cy.get('.inventory_details_name').should('be.visible');
        cy.get('.inventory_details_desc').should('be.visible');
        cy.get('.inventory_details_price').should('be.visible');
    });

    it('Adicionar produto ao carrinho', () => {
        cy.get('.inventory_item:nth-child(1) [data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');
    });

    it('Remover produto do carrinho', () => {
        cy.get('.inventory_item:nth-child(1) [data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        cy.get('.shopping_cart_badge').should('not.exist');
    });

    it('Adicionar e verificar múltiplos produtos no carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        cy.get('.shopping_cart_badge').should('have.text', '2');

        cy.get('.shopping_cart_link').click();
        cy.get('.cart_item').should('have.length', 2);
    });

    it('Validar preço de um produto', () => {
        cy.get('.inventory_item:nth-child(1) .inventory_item_price').invoke('text').should('eq', '$29.99');
    });
});