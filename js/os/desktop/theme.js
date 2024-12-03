// Module: Tneme management
// TODO:
// - Sync with window engine
// - Real time update when user changes the theme

// Module data + defaults
var data = {
  // Defaults
  theme: "light",
  accent: "blue",
  wallpaper: {
    type: "url",
    arg: "/assets/bg/svg/light.svg",
  },
};

// Wallpaper
export function setWallpaper(type, arg) {
  data.wallpaper.type = type;
  data.wallpaper.arg = arg;
  if (type == "color") {
    document.body.style.backgroundColor = arg;
  } else if (type == "url") {
    document.body.style.background = `url(${arg}) no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
  }
}

export function getWallpaper() {
  return data.wallpaper;
}

// Theme
export function setTheme(theme) {
  data.theme = theme;
  if (theme == "light") {
    document.body.style.color = "#000";
  } else if (theme == "dark") {
    document.body.style.color = "#fff";
  }
}

export function getTheme() {
  return data.theme;
}

// Accent
export function setAccent(accent) {
  data.accent = accent;
}

export function getAccent() {
  return data.accent;
}
