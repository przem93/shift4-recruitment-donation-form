const getDataTestIdSelector = (dataTestId) => `[data-testid="${dataTestId}"]`
const getErrorSelector = (fieldSelector) => `${fieldSelector} [role="alert"]`

const amountFieldSelector = getDataTestIdSelector('amount')
const amountFieldInputSelector = getDataTestIdSelector('amount.input')
const endMonthFieldSelector = getDataTestIdSelector('endMonth')
const endMonthFieldNextSelector = getDataTestIdSelector('endMonth.NextMonth')
const endMonthFieldPrevSelector = getDataTestIdSelector('endMonth.PrevMonth')
const totalSelector = getDataTestIdSelector('total')
const continueButtonSelector = getDataTestIdSelector('continue')
const amountFieldErrorSelector = getErrorSelector(amountFieldSelector)
const endMonthFieldErrorSelector = getErrorSelector(endMonthFieldSelector)
const infoBoxAmountPrevSelector = getDataTestIdSelector('infoBox.amount')
const infoBoxEndMonthPrevSelector = getDataTestIdSelector('infoBox.endMonth')

const currentDate = new Date()
const currentMonth = new Intl.DateTimeFormat('en-US', {
  month: "long",
  year: "numeric",
}).format(currentDate.setMonth(currentDate.getMonth() + 4))

describe('Navigation', () => {
  it('should fill donation form and should not be visible any error', () => {
    cy.visit('http://localhost:3000/')

    cy.get(totalSelector).should('have.text', '$0')
    cy.get(amountFieldSelector).type('25000')
    cy.get(endMonthFieldNextSelector).click().click().click().click()
    cy.get(infoBoxAmountPrevSelector).should('have.text', '$25,000')
    cy.get(infoBoxEndMonthPrevSelector).should('have.text', currentMonth)
    cy.get(continueButtonSelector).click()
    cy.get(totalSelector).should('have.text', '$100,000')
    cy.get(amountFieldErrorSelector).should('not.exist')
    cy.get(endMonthFieldErrorSelector).should('not.exist')
  })

  it('should show error when month is lower then next', () => {
    cy.visit('http://localhost:3000/')

    cy.get(endMonthFieldPrevSelector).should('exist')
    cy.get(endMonthFieldPrevSelector).click()
    cy.get(endMonthFieldErrorSelector).should('be.visible')
    cy.get(endMonthFieldNextSelector).click()
    cy.get(endMonthFieldErrorSelector).should('be.visible')
    cy.get(endMonthFieldNextSelector).click()
    cy.get(endMonthFieldErrorSelector).should('not.exist')
  })

  it('should show error when amount is empty', () => {
    cy.visit('http://localhost:3000/')

    cy.get(amountFieldSelector).type('25000')
    cy.get(amountFieldErrorSelector).should('not.exist')
    cy.get(amountFieldSelector).type('{selectall}{backspace}')
    cy.get(amountFieldErrorSelector).should('be.visible')
  })

  it('should show error when amount is 0', () => {
    cy.visit('http://localhost:3000/')

    cy.get(amountFieldErrorSelector).should('not.exist')
    cy.get(amountFieldSelector).type('0')
    cy.get(amountFieldErrorSelector).should('be.visible')
  })

  it('should show errors form was filled in with invalid data', () => {
    cy.visit('http://localhost:3000/')

    cy.get(continueButtonSelector).click()
    cy.get(amountFieldErrorSelector).should('be.visible')
    cy.get(endMonthFieldErrorSelector).should('be.visible')
  })

  it('should show errors form was filled in with invalid data', () => {
    cy.visit('http://localhost:3000/')

    cy.get(continueButtonSelector).click()
    cy.get(amountFieldErrorSelector).should('be.visible')
    cy.get(endMonthFieldErrorSelector).should('be.visible')
  })
})
