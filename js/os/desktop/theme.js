// Module: Tneme management
// TODO:
// - Sync with window engine
// - Real time update when user changes the theme
// - Accent color

// Module data + defaults
var data = {
  // Defaults
  defaultLight: {
    accent: "#333",
    wallpaper: {
      type: "url",
      arg: "/assets/bg/svg/light.svg",
    },
    window: {
      bg: "#f4f4f4",
      fg: "#000",
      transparency: 0.9,
    },
  },

  defaultDark: {
    accent: "#f4f4f4",
    wallpaper: {
      type: "url",
      arg: "/assets/bg/svg/dark.svg",
    },
    window: {
      bg: "#121212",
      fg: "#fff",
      transparency: 1,
    },
  },

  demoPink: {
    accent: "#ff00ff",
    wallpaper: {
      type: "url",
      arg: "/assets/bg/svg/dark.svg",
    },
    window: {
      bg: "#f7bfcc",
      fg: "#000",
      transparency: 0.7,
    },
  },
};

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
export function setTheme(theme) {
    // Animate foreground
    gsap.to("html", {
      "--os_window_fg": data[theme].window.fg,
      duration: 0.3,
    });

    // Animate background
    gsap.to("html", {
      "--os_window_bg": data[theme].window.bg,
      duration: 0.3,
    });

    // Animate transparency
    gsap.to("html", {
      "--os_window_transparency": data[theme].window.transparency,
      duration: 0.3,
    });

    // Set wallpaper
    setWallpaper(data[theme].wallpaper.type, data[theme].wallpaper.arg);
}