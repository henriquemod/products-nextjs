import { After } from "@badeball/cypress-cucumber-preprocessor";

After({ tags: "@focus" }, () => {
  const product = localStorage.getItem("product");
  const token = localStorage.getItem("access_token");

  if (product) {
    cy.request({
      failOnStatusCode: false,
      url: `${Cypress.env("API_URL")}/products/${JSON.parse(product).id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
});
