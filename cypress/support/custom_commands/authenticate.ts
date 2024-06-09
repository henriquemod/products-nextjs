export const authenticate = Cypress.Commands.add(
  "authenticate",
  (username: string, password: string, save = true) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      if (save) {
        cy.setCookie("acess-token", token);
      }
      return cy.wrap(token);
    }

    cy.request({
      url: `${Cypress.env("API_URL")}/auth/login`,
      method: "POST",
      body: {
        username,
        password,
      },
    })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("access_token");
        localStorage.setItem("access_token", response.body.access_token);
        return response.body.access_token;
      })
      .then((token) => {
        if (save) {
          cy.setCookie("acess-token", token);
        }

        return token;
      });
  }
);
