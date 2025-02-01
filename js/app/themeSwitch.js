// APP: Pre-prod
// Toggles theme

import * as theme from "../os/desktop/theme.js";
import * as windowMgmt from "../os/window/main.js";

windowMgmt.create({
    title: "themeswitcher3000",
    icon: `<i class="fa-regular fa-adjust fa-fw"></i>`,
    content: {
        type: "html",
        content: `
        <div style="display: flex; flex-direction: column; gap: 0.5em; padding: 1em;">
            <span>Toggle theme:</span>
            <div style="display: flex; flex-direction: row; gap: 0.5em;">
                <button id="light">Light</button>
                <button id="dark">Dark</button>
            </div>
        </div>
        `,
    },
    type: "window",
    x: "0",
    y: "0",
    sx: "300",
    sy: "200",
    draggable: true,
    resizeable: true,
    pinToTop: false,
    actions: ["close"],
});

const light = document.getElementById("light");
const dark = document.getElementById("dark");

light.addEventListener("click", () => {
    theme.setTheme("defaultLight");
});

dark.addEventListener("click", () => {
    theme.setTheme("defaultDark");
});