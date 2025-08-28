describe("weather app", () => {
    beforeEach(() => {
      cy.task("reseed");
    });
  
    it("should display the weather for a default city", () => {
      cy.visit("http://localhost:3000");
      cy.get("h2").should("contain.text", "New York");
      cy.get('[data-cy="temperature"]').should("contain.text", "20°C");
      cy.get('[data-cy="condition"]').should("contain.text", "Cloudy");
    });
  
    it("should be able to search for a different city", () => {
      cy.visit("http://localhost:3000");
      cy.get("[data-cy='Enter-city']").type("Kuala Lumpur");
      cy.get("[data-cy='Search-city']").click();
      cy.get("h2").should("contain.text", "Kuala Lumpur");
      
    });
  
  }
  );
;

