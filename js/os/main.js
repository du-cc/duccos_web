import * as theme from "/desktop/theme.js";

fetch("/assets/theme/default.json")
  .then((response) => response.json())
  .then((data) => {
    // load themeset
    theme.loadThemeSet(data);
    console.log("Theme set loaded");
    // set theme
    theme.setTheme("default", "defaultDark");
  });
