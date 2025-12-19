// Module: Window dragging
// TODO:
// - Better warning message (includes window id and app id)
// - Implementation with other modules

// Settings:
const transparentIntensity = 1.3; // Intensity of the window's background opacity when dragging
const scaleIntensity = 1.03; // Intensity of the window's scale when dragging

import * as windowMgmt from "./main.js";
import * as layer from "./layer.js";

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

  var bg = {};
  var opacity = {};

  var windowDrag = Draggable.create(window, {
    trigger: elements.left,
    bounds: document.getElementById("body"),
    zIndexBoost: false,
  })[0];

  function fetchColor() {
    bg = {
      left: getComputedStyle(elements.left).backgroundColor,
      right: getComputedStyle(elements.right).backgroundColor,
      content: getComputedStyle(elements.content).backgroundColor,
    };

    for (const key in bg) {
      // filter all opacity values
      bg[key] = bg[key].replace(/\s*\/\s*[\d.]+\)/, "");
      // if no opacity, filter the bracket
      bg[key] = bg[key].replace(")", "");
    }

    opacity = {
      left: parseFloat(
        getComputedStyle(elements.left).backgroundColor.match(
          /\/ (\d+\.?\d*)/
        )?.[1]
      ),
      right: parseFloat(
        getComputedStyle(elements.right).backgroundColor.match(
          /\/ (\d+\.?\d*)/
        )?.[1]
      ),
      content: parseFloat(
        getComputedStyle(elements.content).backgroundColor.match(
          /\/ (\d+\.?\d*)/
        )?.[1]
      ),
    };

    for (const key in opacity) {
      if (isNaN(opacity[key])) {
        opacity[key] = 1;
      }
    }
  }

  windowDrag.addEventListener("dragstart", () => {
    fetchColor();
    layer.bringToFront(window);

    gsap.to(window, {
      scale: scaleIntensity,
      duration: 0.1,
    });

    gsap.fromTo(
      elements.left,
      {
        backgroundColor: `${bg.left} / ${opacity.left})`,
      },
      {
        backgroundColor: `${bg.left} / ${opacity.left / transparentIntensity})`,
      }
    );

    gsap.fromTo(
      elements.right,
      {
        backgroundColor: `${bg.right} / ${opacity.right})`,
      },
      {
        backgroundColor: `${bg.right} / ${
          opacity.right / transparentIntensity
        })`,
      }
    );

    // causing headache glitch *SIGH*
    // gsap.to(elements.content, {
    //   backgroundColor: `${bg.content} / ${opacity.content / transparentIntensity})`,
    // });

    gsap.fromTo(
      elements.content,
      {
        backgroundColor: `${bg.content} / ${opacity.content})`,
      },
      {
        backgroundColor: `${bg.content} / ${
          opacity.content / transparentIntensity
        })`,
      }
    );
  });

  windowDrag.addEventListener("dragend", () => {
    gsap.to(window, {
      scale: 1,
      duration: 0.1,
    });
    gsap.to(elements.left, {
      backgroundColor: `${bg.left} / ${opacity.left})`,
      onComplete: () => {
        elements.left.style.removeProperty("background-color");
      },
    });

    gsap.to(elements.right, {
      backgroundColor: `${bg.right} / ${opacity.right})`,
      onComplete: () => {
        elements.right.style.removeProperty("background-color");
      },
    });

    gsap.to(elements.content, {
      backgroundColor: `${bg.content} / ${opacity.content})`,
      onComplete: () => {
        elements.content.style.removeProperty("background-color");
      },
    });
  });

  return { ok: true };
}

// Undraggable

// const undraggableWindows = document.querySelectorAll(
//   '[elementType="window"][undraggable]'
// );
