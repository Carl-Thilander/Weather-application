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
  
    it("should be able to search for a different city", () => {
      cy.visit("/");
      cy.get("[data-cy='Enter-city']").type("Kuala Lumpur");
      cy.get("[data-cy='Search-city']").first().click();
      cy.get("h1").should("contain.text", "Kuala Lumpur");
    });

    it("should be possible to remove a city", () => {
      cy.visit("/");
      cy.get("[data-cy='Enter-city']").type("Gothenburg");
      cy.get("[data-cy='Search-city']").first().click();
      cy.get("h1").should("contain.text", "Gothenburg");
      cy.get("[data-cy='Add-favorite']").click();
      cy.get("[data-cy='Back-to-home']").click();
      cy.get("h2").should("contain.text", "Gothenburg");

      cy.get("[data-cy='Remove-city']").click();
      cy.get("h2").should("not.contain.text", "Gothenburg");
    });

    it("should be possible to search and get extended info on a city", () => {
      cy.visit("/");
      cy.intercept('GET', '/api/weather?city=London', {
        statusCode: 200,
        body: {
          city: "London",
          temp: 15,
          description: "Rainy",
          icon: "09d",
        },
      });
      cy.get("[data-cy='Enter-city']").type("London");
      cy.get("[data-cy='Search-city']").click();
      cy.get("h2").should("contain.text", "London");
      cy.get('[data-cy="temperature"]').should("contain.text", "15°C");
      cy.get('[data-cy="condition"]').should("contain.text", "Rainy");
    }
    );

    it("should display forecast info on city page", () => {
      cy.visit("/london");
      cy.get("h2").should("contain.text", "Weather Forecast");
      cy.get("div").should("contain.text", "Wind:");
      cy.get("div").should("contain.text", "Humidity:");
    });

});


