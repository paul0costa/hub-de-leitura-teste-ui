describe('Funcionalidade: Contato', () => {

beforeEach(() => {
    cy.visit('index.html')
});


  it('Deve preencher formulários de contato com sucesso', () => {
    cy.get('#name').type('Maria')
    cy.get('#email').type('maria@teste.com')
    cy.get('#subject').select('Suporte Técnico')
    cy.get('[name="message"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
    cy.get('#btn-submit').click()
    //Resultado experado
    cy.contains("Contato enviado com sucesso!").should('be.visible')
  });

  it('Deve validar mensagem de erro ao enviar sem preencher nome', () => {
    cy.get('#name').clear()
    cy.get('#email').type('maria@teste.com')
    cy.get('#subject').select('Suporte Técnico')
    cy.get('[name="message"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
    cy.get('#btn-submit').click()
    //Resultado experado
    cy.get('#alert-container').should('contain', 'Por favor, preencha o campo Nome.')

  });

  it('Deve validar mensagem de erro ao enviar sem preencher email', () => {
    cy.get('#name').type('Maria')
    cy.get('#email').clear()
    cy.get('#subject').select('Suporte Técnico')
    cy.get('[name="message"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
    cy.get('#btn-submit').click()
    //Resultado experado
    cy.get('#alert-container').should('contain', 'Por favor, preencha o campo E-mail.')

  });

  it('Deve validar mensagem de erro ao enviar sem selecionar assunto', () => {
    cy.get('#name').type('Maria')
    cy.get('#email').type('maria@teste.com')
    cy.get('[name="message"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
    cy.get('#btn-submit').click()
    //Resultado experado
    cy.get('#alert-container').should('contain', 'Por favor, selecione o Assunto.')

  });

  it('Deve validar mensagem de erro ao enviar sem preencher mensagem', () => {
    cy.get('#name').type('Maria')
    cy.get('#email').type('maria@teste.com')
    cy.get('#subject').select('Suporte Técnico')
    cy.get('[name="message"]').clear()
    cy.get('#btn-submit').click()
    //Resultado experado
    cy.get('#alert-container').should('contain', 'Por favor, escreva sua Mensagem.')

  });



})