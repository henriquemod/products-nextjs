import { When } from "@badeball/cypress-cucumber-preprocessor";

When("I click on action from product {string}", function (productName: string) {
  cy.contains("tr", productName).find("button").click();
});

When("I click on text {string}", function (text: string) {
  cy.contains(text).click();
});

When("I click on id {string}", function (text: string) {
  cy.get(`#${text}`).click();
});

When("I click on add product button", function () {
  cy.get("#add-product-btn").click();
});

When(
  "I type {string} in the {string} field",
  function (value: string, field: string) {
    cy.get(`#${field}`).clear().type(value);
  }
);

When("I clear the {string} field", function (field: string) {
  cy.get(`#${field}`).clear();
});
