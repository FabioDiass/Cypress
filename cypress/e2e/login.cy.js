describe('Login Tests', () => {
    
    it('Login com sucesso', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory.html');
    });

    it('Login com senha incorreta', () => {
        cy.visit('https://www.saucedemo.com/');;
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('Senha-incorreta');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('contain.text', 'Username and password do not match any user in this service');
    });

    it('Login com usuário incorreto', () => {
        cy.visit('https://www.saucedemo.com/');;
        cy.get('[data-test="username"]').type('user-incorreto');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('contain.text', 'Username and password do not match any user in this service');
    });

    it('Login com campos em branco', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('contain.text', 'Username is required');
    });

    it('Logout com sucesso', () => {
        cy.visit('https://www.saucedemo.com/');;
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
        
        cy.url().should('include', 'saucedemo.com');
    });
});