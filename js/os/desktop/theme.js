// Module: Tneme management
// TODO:
// - Sync with window engine
// - Real time update when user changes the theme
// - Accent color
// - Themeset id conflict handling

// Module data + defaults
var data = {};
var currentTheme = "defaultDark";

// Wallpaper
export function setWallpaper(type, arg) {
  if (type === "color") {
    var wpChangeDiv = document.createElement("div");
    wpChangeDiv.id = "wpChange";
    wpChangeDiv.style.position = "fixed";
    wpChangeDiv.style.top = "0";
    wpChangeDiv.style.left = "0";
    wpChangeDiv.style.width = "100%";
    wpChangeDiv.style.height = "100%";
    wpChangeDiv.style.zIndex = "-1";
    wpChangeDiv.style.backgroundColor = arg;
    wpChangeDiv.style.opacity = "0";

    document.body.appendChild(wpChangeDiv);
  } else if (type === "url") {
    var wpChangeDiv = document.createElement("img");
    wpChangeDiv.id = "wpChange";
    wpChangeDiv.style.position = "fixed";
    wpChangeDiv.style.top = "0";
    wpChangeDiv.style.left = "0";
    wpChangeDiv.style.width = "100%";
    wpChangeDiv.style.height = "100%";
    wpChangeDiv.style.zIndex = "-1";
    wpChangeDiv.style.objectFit = "cover";
    wpChangeDiv.style.opacity = "0";

    wpChangeDiv.src = arg;
    document.body.appendChild(wpChangeDiv);
  }

  // crossfade
  gsap.to("#wpChange", {
    duration: 0.3,
    opacity: 1,
    onComplete: function () {
      if (type === "color") {
        document.body.style.background = arg;
      } else if (type === "url") {
        document.body.style.background = `url(${arg}) no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
      }
      document.body.removeChild(wpChangeDiv);
    },
  });
}

// Theme
export function setTheme(themeSet, theme) {
  // Animate foreground
  gsap.to("html", {
    "--os_window_fg": data[themeSet]["themes"][theme].window.fg,
    duration: 0.3,
  });

  // Animate background
  gsap.to("html", {
    "--os_window_bg": data[themeSet]["themes"][theme].window.bg,
    duration: 0.3,
  });

  // Animate transparency
  gsap.to("html", {
    "--os_window_transparency":
      data[themeSet]["themes"][theme].window.transparency,
    duration: 0.3,
  });

  // Set wallpaper
  setWallpaper(
    data[themeSet]["themes"][theme].wallpaper.type,
    data[themeSet]["themes"][theme].wallpaper.arg
  );

  // Set current theme
  currentTheme = theme;
}

export function loadThemeSet(themeSet) {
  console.log(themeSet);
  // Generate unique id
  var id = themeSet.name.replace(/\s+/g, "").toLowerCase();

  // check id conflict
  if (data[id]) {
    console.error("ThemeSet id conflict: " + id);
    return;
  }

  data[id] = themeSet;
}
