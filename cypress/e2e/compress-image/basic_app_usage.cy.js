/// <reference types="cypress" />

describe("the core use of the app.", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("compress a simple jpg image.", () => {
    cy.get('[data-test-id="upload-image"]').selectFile(
      "cypress/fixture/tony.jpg"
    );

    cy.readFile("cypress/downloads/tony.jpg", { timeout: 10000 }).should(
      "exist"
    );

    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.task("deleteFolder", downloadsFolder);
  });

  it("prevents compression of a jpg image bigger than 10Mb.", () => {
    cy.get('[data-test-id="upload-image"]').selectFile(
      "cypress/fixture/filipp-romanovski-Xp--n07JfqE-unsplash.jpg"
    );

    cy.get('[data-test-id="error-message"]').should(
      "have.text",
      "File size exceeds 10 MB limit"
    );
  });

  it("prevents compression of a file different from jpg, png, gif, or WebP.", () => {
    cy.get('[data-test-id="upload-image"]').selectFile(
      "cypress/fixture/human_feeding_the_little_squirrel (360p).mp4"
    );

    cy.get('[data-test-id="error-message"]').should(
      "have.text",
      "Unsupported format: JPG, PNG, GIF, or WebP accepted"
    );
  });
});
