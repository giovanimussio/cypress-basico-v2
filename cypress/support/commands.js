Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('FirstName')
    cy.get('#lastName').type('LastName')
    cy.get('#email').type('email@me.com')
    cy.get('#open-text-area').type("Teste")
    cy.get('button[type="submit"').click()
})