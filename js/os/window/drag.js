// Module: Window dragging
// TODO:
// - Better warning message (includes window id and app id)
// - Implementation with other modules

// Settings:
const transparentIntensity = 1.3; // Intensity of the window's background opacity when dragging
const scaleIntensity = 1.03; // Intensity of the window's scale when dragging

import * as windowMgmt from "./main.js";

gsap.registerPlugin(Draggable);

var draggableWindows = [];
var undraggableWindows = [];

// draggableWindows = document.querySelectorAll(
//   '[elementType="window"]:not([undraggable])'
// );

export function setDraggable(window) {
  const query = windowMgmt.query(window);

  if (query.headless === true) {
    console.warn(
      `Headless window detected. Dragging will be disabled. Window ID: ${query.id}, App ID: ${query.appId}`
    );
    return { ok: false, message: "Headless window detected" };
  }

  const elements = {
    left: window.querySelector(".left"),
    right: window.querySelector(".right"),
    content: window.querySelector(".content"),
  };

  const bg = {
    left: getComputedStyle(elements.left).backgroundColor,
    right: getComputedStyle(elements.right).backgroundColor,
    content: getComputedStyle(elements.content).backgroundColor,
  };

  for (const key in bg) {
    if (!bg[key].includes("/")) {
      bg[key] = bg[key].replace(/color\((.*)\)/, "color($1 / 0.9)");
      elements[key].style.backgroundColor = bg[key];
      console.warn(
        `No opacity found in ${key} background color. Fallback to 0.9 to avoid visual glitch. Blamed to GSAP strips the alpha channel when opacity is 1`
      );
    }
  }

  const opacity = {
    left: parseFloat(bg.left.match(/\/ (\d+\.?\d*)/)?.[1]),
    right: parseFloat(bg.right.match(/\/ (\d+\.?\d*)/)?.[1]),
    content: parseFloat(bg.content.match(/\/ (\d+\.?\d*)/)?.[1]),
  };

  var windowDrag = Draggable.create(window, {
    trigger: elements.left,
    bounds: document.getElementById("body"),
    zIndexBoost: false,
  })[0];

  windowDrag.addEventListener("dragstart", () => {
    gsap.to(window, {
      scale: scaleIntensity,
      duration: 0.1,
    });

    gsap.to(elements.left, {
      backgroundColor: bg.left.replace(
        /\/ \d+\.?\d*/g,
        `/ ${opacity.left / transparentIntensity}`
      ),
    });

    gsap.to(elements.right, {
      backgroundColor: bg.right.replace(
        /\/ \d+\.?\d*/g,
        `/ ${opacity.right / transparentIntensity}`
      ),
    });

    gsap.to(elements.content, {
      backgroundColor: bg.content.replace(
        /\/ \d+\.?\d*/g,
        `/ ${opacity.content / transparentIntensity}`
      ),
    });
  });

  windowDrag.addEventListener("dragend", () => {
    gsap.to(window, {
      scale: 1,
      duration: 0.1,
    });

    gsap.to(elements.left, {
      backgroundColor: bg.left,
    });

    gsap.to(elements.right, {
      backgroundColor: bg.right,
    });

    gsap.to(elements.content, {
      backgroundColor: bg.content,
    });
  });


  return { ok: true };
}

// Undraggable

// const undraggableWindows = document.querySelectorAll(
//   '[elementType="window"][undraggable]'
// );
