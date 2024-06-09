import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I access home page", function () {
  cy.visit("/");
});

Given("I access auth page", function () {
  cy.visit("/auth");
});

Given("Im authenticated", function () {
  cy.authenticate("admin", "admin");
});

Given(
  "I have a product with name {string} and price {int}",
  function (name: string, price: number) {
    cy.createProduct(name, price);
  }
);
