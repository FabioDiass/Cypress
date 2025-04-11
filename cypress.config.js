const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on, config) {
      // Aqui vão eventos do Node, como geração de relatórios
    }
  },
  viewportWidth: 1280,
  viewportHeight: 800
});