describe('Check are tests running', () => {
    it('Does not do much!', () => {
        expect(true).to.equal(true);
    });

    it('Visits the page', () => {
        cy.visit('/');

        cy.contains('Sign In').click();
    });
});
