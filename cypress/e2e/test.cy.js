describe("login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should login with valid email and password", () => {
    cy.viewport(1366, 768);
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("should not login with empty email", () => {
    cy.viewport(380, 800);
    cy.login(null, "123");
    cy.tagName("#mail");
  });

  it("should not login with empty password", () => {
    cy.login("bropet@mail.ru", null);
    cy.tagName("#pass");
  });

  it("should book add to Favorites", () => {
    cy.login("bropet@mail.ru", "123");
    cy.addBook(
      "Алхимик",
      "У каждого человека есть своя стезя – путь, который мы должны пройти. Простому пастуху Сантьяго предначертано судьбой отправиться на поиски клада. Путь его будет полон опасностей, неожиданных встреч, открытий и откровений. От Сантьяго требуется только довериться своей судьбе и не упускать из виду ее знаки. Ведь «если ты действительно чего-то сильно желаешь, вся вселенная будет способствовать исполнению твоего желания».",
      "Паоло Коэльо"
    );
    cy.contains("Алхимик").as("selectedBook");
    cy.get("@selectedBook")
      .find("button")
      .invoke("text")
      .then((text) => {
        if (text === "Add to favorite") {
          cy.get("@selectedBook").find("button").click();
        }
      });
    cy.contains("Favorites").click();
    cy.contains("Паоло Коэльо").should("be.visible");
  });

  it("should book delete with Favorites", () => {
    cy.login("bropet@mail.ru", "123");
    cy.deleteBook("Алхимик");
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible"
    );
  });

  it("should book add not title on page", () => {
    cy.login("bropet@mail.ru", "123");
    cy.addBook(
      null,
      "У каждого человека есть своя стезя – путь, который мы должны пройти. Простому пастуху Сантьяго предначертано судьбой отправиться на поиски клада. Путь его будет полон опасностей, неожиданных встреч, открытий и откровений. От Сантьяго требуется только довериться своей судьбе и не упускать из виду ее знаки. Ведь «если ты действительно чего-то сильно желаешь, вся вселенная будет способствовать исполнению твоего желания».",
      "Паоло Коэльо"
    );
    cy.tagName("#title");
  });
});
