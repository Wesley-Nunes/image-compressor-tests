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
      "cypress/fixture/Pizigani_1367_Chart_10MB.jpg"
    );

    cy.get('[data-test-id="error-message"]').should(
      "have.text",
      "The file you attempted to upload exceeds the maximum allowed size of 10MB"
    );
  });

  it("prevents compression of a file different from jpg, png, gif, or WebP.", () => {
    cy.get('[data-test-id="upload-image"]').selectFile(
      "cypress/fixture/human_feeding_the_little_squirrel (360p).mp4"
    );

    cy.get('[data-test-id="error-message"]').should(
      "have.text",
      `Unsupported file format
      Accepted formats: JPG, PNG, GIF, or WebP`
    );
  });
});
