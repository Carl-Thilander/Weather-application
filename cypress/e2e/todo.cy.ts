describe("todo", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  it("should display three todos by default", () => {
    cy.visit("http://localhost:3000");
    cy.get("li").should("have.length", 3);
    cy.get("li").first().should("contain.text", "Feed the cat");
    cy.get("li").last().contains("Walk all the cats");
  });

  it("should be able to delete a todo", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Feed the cat").parents("li").find("button").click();
    cy.get("li").should("have.length", 2);
    cy.contains("Feed the cat").should("not.exist");
  });
});


//////Actual tests for weather application
describe("weather app", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  it("should display the weather for a default city", () => {
    cy.visit("http://localhost:3000");
    cy.get("h2").should("contain.text", "Weather in New York");
    cy.get(".temperature").should("contain.text", "15°C");
    cy.get(".condition").should("contain.text", "Cloudy");
  });

  it("should be able to search for a different city", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='Enter city']").type("Kuala Lumpur");
    cy.get("[data-cy='Search-city']").click();
    cy.get("h1").should("contain.text", "Weather in Kuala Lumpur");
    cy.get(".temperature").should("contain.text", "28°C");
    cy.get(".condition").should("contain.text", "Sunny");
  });

}
);