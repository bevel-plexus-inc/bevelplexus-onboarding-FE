/// <reference types="cypress" />

context('bevel plexus', () => {
  it('login scenerio', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#basic_email').type('adesola.agun@quomodosystems.com');
    cy.get('#basic_password').type('Treasurechic@1');
    cy.get('.btn-lg').click();
    //   cy.get('.PhoneInputInput').type('+2348137995663')
    //   cy.get('#sendCode').click()
    //   cy.get('.verify-input').type('810432')
    // cy.get('#verifyc').click()
  });
});
