/// <reference types="cypress" />

declare namespace Cypress {
  interface CustomWindow extends Window {}

  interface Chainable {
    /**
     *  Window object with additional properties used during test.
     */
    // eslint-disable-next-line no-undef
    window(options?: Partial<Loggable & Timeoutable>): Chainable<CustomWindow>

    getByClass(dataTestAttribute: string, args?: any): Chainable<Element>
  }
}
