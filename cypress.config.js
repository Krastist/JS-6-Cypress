const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  configurations: {
    desktop: {
      viewportWidth: 1366,
      viewportHeight: 768,
    },
    mobile: {
      viewportWidth: 380,
      viewportHeight: 800,
    },
  },
});
