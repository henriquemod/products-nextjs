export const createProduct = Cypress.Commands.add(
  "createProduct",
  (name: string, price: number) => {
    cy.authenticate("admin", "admin", false).then((token) => {
      cy.request({
        url: `${Cypress.env("API_URL")}/products`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name,
          price,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        localStorage.setItem("product", JSON.stringify(response.body));
      });
    });
  }
);
