/// <reference types="cypress" />

describe("others images formats", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  after(() => {
    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.task("deleteFolder", downloadsFolder);
  })

  it("compress a png image", () => {
    cy.get('[data-test-id="upload-image"]').selectFile(
      "cypress/fixture/yellown-and-blue.png"
    );

    cy.readFile("cypress/downloads/yellown-and-blue.png", { timeout: 10000 }).should(
      "exist"
    );    
  });

  it("compress a webP image", () => {
    cy.get('[data-test-id="upload-image"]').selectFile(
      "cypress/fixture/a-Wild-Cherry-in-flower.webp"
    );

    cy.readFile("cypress/downloads/a-Wild-Cherry-in-flower.webp", { timeout: 10000 }).should(
      "exist"
    );
  });
});
