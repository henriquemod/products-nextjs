import "./custom_commands";

export {};
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      authenticate(
        username: string,
        password: string,
        save?: boolean
      ): Chainable<string>;
      createProduct(name: string, price: number): Chainable<void>;
    }
  }
}
