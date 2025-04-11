describe('Filtragem de produtos', () => {

    beforeEach(() => {
        // Login
        cy.login();
    });

    it.only('Deve filtrar produtos por preço (alto para baixo)', () => {
        cy.wait(2000);
        cy.get('[data-test="product_sort_container"]').should('be.visible').select('hilo');
    
        cy.get('.inventory_item_price')
          .then($els => Cypress._.map($els, el => parseFloat(el.innerText.replace('$', ''))))
          .then(prices => {
            const sorted = [...prices].sort((a, b) => b - a);
            expect(prices).to.deep.equal(sorted);
          });
    });

    it('Deve filtrar produtos por preço (baixo para alto)', () => {
        // Aplicar filtro "Price (low to high)"
        cy.get('[data-test="product_sort_container"]').should('be.visible').select('lohi');
        // Validar que os produtos estão ordenados corretamente
        cy.get('.inventory_item_price').then(($prices) => {
            const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
            expect(prices).to.deep.equal(prices.sort((a, b) => a - b));
        });
    });

    it('Deve filtrar produtos por nome (A para Z)', () => {
        // Aplicar filtro "Name (A to Z)"
        cy.get('[data-test="product_sort_container"]').select('az');
        
        // Validar que os produtos estão ordenados corretamente
        cy.get('.inventory_item_name').then(($names) => {
            const names = [...$names].map(el => el.innerText);
            expect(names).to.deep.equal([...names].sort());
        });
    });

    it('Deve filtrar produtos por nome (Z para A)', () => {
        // Aplicar filtro "Name (Z to A)"
        cy.get('[data-test="product_sort_container"]').select('za');
        
        // Validar que os produtos estão ordenados corretamente
        cy.get('.inventory_item_name').then(($names) => {
            const names = [...$names].map(el => el.innerText);
            expect(names).to.deep.equal([...names].sort().reverse());
        });
    });
});