/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import cadastroPage from '../support/pages/cadastro-page';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {

    beforeEach(() => {
        cadastroPage.visitarPaginaCadastro()
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um cadastro com sucesso, usando JS', () => {
        let email = `teste${Date.now()}@teste.com`
        cy.get('#name').type('Maria da Silva')
        cy.get('#email').type(email)
        cy.get('#phone').type('123456789')
        cy.get('#password').type('Senha123')
        cy.get('#confirm-password').type('Senha123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer um cadastro com sucesso, usando Faker', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('123456789')
        cy.get('#password').type('Senha123')
        cy.get('#confirm-password').type('Senha123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)
    });

    it('Deve preencher cadastro com sucesso - usando comandos customizados', () => {
        let email = `teste${Date.now()}@teste.com`
        let nome = faker.person.fullName()
        cy.preencherCadastro(nome, email, '123456789', 'Teste@123', 'Teste@123',)
        cy.url().should('include', 'dashboard')
    });

    it('Deve preencher cadastro com sucesso - usando Page Object', () => {
        let email = `teste${Date.now()}@teste.com`
        cadastroPage.preencherCadastro('Maria da Silva', email, '123456789', 'Senha123', 'Senha123')
        cy.url().should('include', 'dashboard')
    });

    it('Deve validar mensagem de erro ao tentar cadastrar sem preencher nome', () => {
        cadastroPage.preencherCadastro('', 'teste@teste.com', '123456789', 'Senha123', 'Senha123')
    cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')

    });

});