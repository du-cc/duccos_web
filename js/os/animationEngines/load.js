// File: load.js
// - Load GSAP/animation modules

const plugins = {
  gsap: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js",
  drag: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Draggable.min.js",
  scrollTrigger:
    "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js",
  // morphSVG: {
  //   local:
  //     "https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/MorphSVGPlugin3.min.js",
  //   production: "./js/os/animationEngines/morphSVG.js",
  // },
  // drawSVG: {
  //   local:
  //     "https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/DrawSVGPlugin3.min.js",
  //   production: "./js/os/animationEngines/drawSVG.js",
  // },
};

function load() {
  for (const key in plugins) {
    const plugin = plugins[key];
    if (typeof plugin === "string") {
      const script = document.createElement("script");
      script.src = plugin;
      document.head.appendChild(script);
    }
    if (typeof plugin === "object") {
      const script = document.createElement("script");
      let src = "";
      const pattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}:?\d*$/
        if (pattern.test(window.location.hostname)) {
            src = plugin.local;
        } else {
            src = plugin.production;
        }
        script.src = src;
      document.head.appendChild(script);
    }
  }
}

load()
