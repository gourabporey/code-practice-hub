describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:9999');
    cy.get('#username').type('hello');
    cy.get('#submit-btn').click();
  });
});
