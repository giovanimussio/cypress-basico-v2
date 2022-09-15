/// <reference types="Cypress"/>
beforeEach(function(){
    cy.visit('../src/index.html')
})
describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS=3000
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.clock() //congela o relogio do navegador - no exemplo existe uma mensagem que é apresentada por 3s com esse clock ela fica sendo apresentada infinitamente
        cy.get('#firstName').type('FirstName')
        cy.get('#lastName').type('LastName')
        cy.get('#email').type('email@email.com')
        cy.get('#open-text-area').type('Teste open text area')
        cy.get('button[type="submit"').click()

        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avanca o tempo no navegador validando que a mensagem é apresentada apenas por 3segundos
        cy.get('.success').should('not.be.visible')
    })
    it('preenche os campos obrigatórios e envia o formulario com um texto longo', function() {
        const longText = 'Tstfijhbdowigbuehbvouwebvuhibewvuhibwviubiuvbw8urbvubnjvndivjnrvijnivwniwnvounvbiubnfvoibxcihbvihbt34unvobsicnvoin4oi3ngiunvinscvnoijtrnvoiubenvijndijvni4jotnvinjnsdvbiusdnfbijvsdnbjnewiugnwjdkvnidfnivuonewfhuvbnrwuhvn'
        cy.clock() //congela o relogio do navegador - no exemplo existe uma mensagem que é apresentada por 3s com esse clock ela fica sendo apresentada infinitamente

        cy.get('#firstName').type('FirstName')
        cy.get('#lastName').type('LastName')
        cy.get('#email').type('email@email.com')
        cy.get('#open-text-area').type(longText,{delay:0})
        cy.get('button[type="submit"').click()

        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avanca o tempo no navegador validando que a mensagem é apresentada apenas por 3segundos
        cy.get('.success').should('not.be.visible')
    })
    it('exige mensagem de erro ao submeter o formulario com um email com formatacao inválida', function() {
        cy.clock() //congela o relogio do navegador - no exemplo existe uma mensagem que é apresentada por 3s com esse clock ela fica sendo apresentada infinitamente

        cy.get('#firstName').type('FirstName')
        cy.get('#lastName').type('LastName')
        cy.get('#email').type('email')
        cy.get('#open-text-area').type("Teste")
        cy.get('button[type="submit"').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avanca o tempo no navegador validando que a mensagem é apresentada apenas por 3segundos
        cy.get('.error').should('not.be.visible')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas nao é preenchido antes do envio do formulário', function() {
  
        cy.get('#phone').type('telefone').should('have.value','')

    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas nao é preenchido antes do envio do formulário', function() {
        cy.clock() //congela o relogio do navegador - no exemplo existe uma mensagem que é apresentada por 3s com esse clock ela fica sendo apresentada infinitamente

        cy.get('#firstName').type('FirstName')
        cy.get('#lastName').type('LastName')
        cy.get('#email').type('email@me.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("Teste")
        cy.get('button[type="submit"').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avanca o tempo no navegador validando que a mensagem é apresentada apenas por 3segundos
        cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('FirstName').should('have.value','FirstName').clear().should('have.value','')
        cy.get('#lastName').type('LastName').should('have.value','LastName').clear().should('have.value','')
        cy.get('#email').type('email@me.com').should('have.value','email@me.com').clear().should('have.value','')
        cy.get('#open-text-area').type("Teste").should('have.value','Teste').clear().should('have.value','')

    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock() //congela o relogio do navegador - no exemplo existe uma mensagem que é apresentada por 3s com esse clock ela fica sendo apresentada infinitamente

        cy.get('button[type="submit"').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avanca o tempo no navegador validando que a mensagem é apresentada apenas por 3segundos
        cy.get('.error').should('not.be.visible')

    })
    it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.clock() //congela o relogio do navegador - no exemplo existe uma mensagem que é apresentada por 3s com esse clock ela fica sendo apresentada infinitamente

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avanca o tempo no navegador validando que a mensagem é apresentada apenas por 3segundos
        cy.get('.success').should('not.be.visible')
    })
    it('using contains', function() {
        cy.clock() //congela o relogio do navegador - no exemplo existe uma mensagem que é apresentada por 3s com esse clock ela fica sendo apresentada infinitamente

        cy.get('#firstName').type('FirstName')
        cy.get('#lastName').type('LastName')
        cy.get('#email').type('email@email.com')
        cy.get('#open-text-area').type('Teste open text area')
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)//avanca o tempo no navegador validando que a mensagem é apresentada apenas por 3segundos
        cy.get('.success').should('not.be.visible')
    })

//Trabalhando com campos de selecao suspensa(combobox)
    it('seleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product').select('youtube').should('have.value','youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor', function() {
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })
    it('seleciona um produto (Blog) por seu indice', function() {
        cy.get('#product').select(1).should('have.value','blog')
    })

//Trabalhando com inputs do tipo radio
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })
    it('marca cada tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"]')
            .should('have.length','3')
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
//Trabalhar com inputs do tipo checkbox
    it('marcar ambos checkboxes e desmarca o ultimo', function() {
       cy.get('input[type="checkbox"')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas nao é preenchido antes do envio do formulário - utilizando check', function() {
        cy.get('#firstName').type('FirstName')
        cy.get('#lastName').type('LastName')
        cy.get('#email').type('email@me.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type("Teste")
        cy.get('button[type="submit"').click()

        cy.get('.error').should('be.visible')
    })
//Trabalhando com upload de arquivos com cypress
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){
                //input recebe o elemento encontrado no get, com isso consigo navegar pelo elemento como se ele fosse um objeto
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando drag and drop', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json',{action: 'drag-drop'})
            .should(function($input){
                //input recebe o elemento encontrado no get, com isso consigo navegar pelo elemento como se ele fosse um objeto
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function($input){
                //input recebe o elemento encontrado no get, com isso consigo navegar pelo elemento como se ele fosse um objeto
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //Lidando com links que abrem em outra aba do navegador
    it('verifica se a politica de privacidade abre um outra aba sem necessidade de um click', function() {
       cy.get('#privacy a').should('have.attr','target', '_blank')
        
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a').invoke('removeAttr','target').click()
        cy.contains('Talking About Testing').should('be.visible')
     })
     it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('prrenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('0123456789',20)//esse comando faz com que o texto 0123456789 seja repetido 20 vezes no codigo, formando um texto longo
        cy.get('#open-test-area')
            .invoke('val',longText)
            .should('have.value',longText)
      })
      it('faz uma requisicao HTTP',function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
            const { status,statusText,body}=response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
      })
      it('encontra o gato escondido',function(){
        cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text','CAT TAT')
        cy.get('#subtitle')
            .invoke('text','Eu S2 gatos')
      })

  })