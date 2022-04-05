// testimine.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Bug testing', function () {
  it('1. Checking if localstorage keeps data' ,function () {
      cy.visit('http://localhost:3000')
      cy.get('.TodoList').contains('Add new item').click()
      cy.get('.TodoList').find('li').should('have.length', 2)
      cy.reload()
      cy.get('.TodoList').find('li').should('have.length', 2)
  }),
  it('2. Adding 1 empty item', () => {
      //cy.visit('localhost:3000')
      cy.get('.TodoList').contains('Add new item').click()
      cy.get('.TodoList').contains('Add new item').click()
      cy.get('.TodoList').find('li').should('have.length', 2)
  }),

  it('3.1 Checking if empty item does not have a checkbox', () => {
      cy.get('.TodoList').contains('Add new item').click()
      cy.get('.empty-label').find('.TodoListItem__toggle').should('have.css','visibility', 'hidden')
  }),

  it('3.2 Checking if filled item with text has checkbox', () => {
      cy.get('.TodoList').contains('Add new item').click()
      cy.get('.TodoList').find('input').type('Hello world')
      cy.get('.TodoListItem').find('.TodoListItem__toggle').should('not.have.css','visibility', 'hidden')
  }),

  it('4. Checking if already created items text is editable', () => {
      cy.visit('localhost:3000')
      cy.get('.TodoList').contains('Add new item').click()
      cy.get('.TodoListItem').find('input').type('Hello world')
      cy.get('.TodoListItem').find('input').type(' edited')
      cy.get('.TodoListItem').find('input').should('have.value', 'Hello world edited')
  }),

  it('5. Checking if items can be removed from list', () => {
      cy.visit('localhost:3000')
      cy.get('.TodoList').contains('Add new item').click()
      cy.get('.TodoListItem').find('input').type('Hello world')
      cy.get('.TodoList').find('li').should('have.length', 2)
      cy.get('.TodoListItem__remove').click()
      cy.get('.TodoList').find('li').should('have.length', 1)
  }),

  it('6. Checking if item orders changed via dragging and dropping', () => {
      cy.visit('localhost:3000')
      cy.get('.TodoList').contains('Add new item').click()
      cy.get('.TodoListItem').find('input').type('Hello world')
      cy.get('.TodoList').contains('Add new item').click()
      cy.get('.TodoListItem').eq(0)
        .trigger('mouseover')
        .trigger('mousedown', { button: 0 })
        .trigger('mousemove', 125, 100, { force: true })
        .trigger('mouseup', { button: 0 })
      cy.get('.TodoListItem').eq(0).should('have.class', 'empty-label')
  })
});