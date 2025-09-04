describe("weather app", () => {
    beforeEach(() => {
      cy.task("reseed");
    });
  
    it("should display the weather for a default city", () => {
      cy.visit("/");
      cy.get("h2").should("contain.text", "New York");
      cy.get('[data-cy="temperature"]').should("contain.text", "20°C");
      cy.get('[data-cy="condition"]').should("contain.text", "Cloudy");
    });
  

    it("should be possible to search and remove a city from favorites", () => {
      cy.visit("/");
      cy.get("[data-cy='Enter-city']").type("Gothenburg");
      cy.get("[data-cy='Search-city']").first().click();
      cy.get("h1").should("contain.text", "Gothenburg");
      cy.get("[data-cy='Add-favorite']").click();
      cy.get("[data-cy='Back-to-home']").click();
      cy.get("h2").should("contain.text", "Gothenburg");

      cy.get("button[aria-label='Remove Gothenburg from list']").click();
      cy.get("h2").should("not.contain.text", "Gothenburg");
    });

    it("should be possible to add a city to favorites", () => {
      cy.visit("/");
      cy.get("[data-cy='Enter-city']").type("Berlin");
      cy.get("[data-cy='Search-city']").first().click();
      cy.get("h1").should("contain.text", "Berlin");
      cy.get("[data-cy='Add-favorite']").click();
      cy.get("[data-cy='Add-favorite-toast']").should("be.visible");
      cy.get("[data-cy='Back-to-home']").click();
      cy.get("h2").should("contain.text", "Berlin");
    });

    it("should find and click a weather card and display forecast", () => {
      cy.visit("/"); 
      cy.contains('a', 'Stockholm').click();
      cy.url().should('include', '/stockholm');
      cy.get('h1').should('contain.text', 'Stockholm');
      cy.get("h2").should("contain.text", "Weather Forecast");
      cy.get("[data-cy='forecast-grid']").first().should("contain.text", "m/s");
      cy.get("[data-cy='forecast-grid']").first().should("contain.text", "%");
    });

    it("should display clock and update mocked time", () => {
      const mockDate = new Date(2024, 0, 1, 12, 0, 0);
      const timeStamp = mockDate.getTime();
      cy.clock(timeStamp);
      cy.visit("/");
      cy.get("[data-cy='clock-widget']").contains("12:00").should("exist");
    });
});


