import { Then } from "@badeball/cypress-cucumber-preprocessor";

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

Then("I should see {string}", function (text: string) {
  cy.contains(text).should("be.visible");
});

Then("I should see product info on dialog", function () {
  const product = localStorage.getItem("product");
  if (!product) {
    throw new Error(
      "Product not found in local storage, did you forget to create it?"
    );
  }
  const productObj = JSON.parse(product);
  cy.get('[role="dialog"]').within(() => {
    cy.get("label").should("have.length", 4);
    cy.get("input").should("have.length", 4);
    cy.get("label").eq(0).should("contain.text", "Name");
    cy.get("label").eq(1).should("contain.text", "Price");
    cy.get("label").eq(2).should("contain.text", "Created at");
    cy.get("label").eq(3).should("contain.text", "Updated at");
    cy.get("input").eq(0).should("have.value", productObj.name);
    cy.get("input").eq(1).should("have.value", productObj.price.toString());
    cy.get("input")
      .eq(2)
      .should("have.value", formatDate(new Date(productObj.createdAt)));
    cy.get("input")
      .eq(3)
      .should("have.value", formatDate(new Date(productObj.updatedAt)));
  });
});

Then(
  "Menu item with text {string} should be disabled",
  function (text: string) {
    cy.get('[role="menuitem"]')
      .contains(text)
      .should("have.attr", "aria-disabled", "true");
  }
);
