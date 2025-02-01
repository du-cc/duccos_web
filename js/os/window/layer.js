// Module: Window layering
// TODO:
// - Implement with other modules

var maxZIndex = 0;

var data = {
  // window: zIndex
};
var pinnedWindows = [];

export function bringToFront(window) {
  if (pinnedWindows.includes(window)) {
    window.style.zIndex = ++maxZIndex;
  } else {
    window.style.zIndex = ++maxZIndex;

    // Keep pinned windows on top
    pinnedWindows.forEach((pinnedWindow) => {
      pinnedWindow.style.zIndex = ++maxZIndex;
    });
  }
}

export function pinToTop(window) {
  pinnedWindows.push(window);
  window.style.zIndex = ++maxZIndex;
}

export function unpinFromTop(window) {
  const index = pinnedWindows.indexOf(window);
  if (index > -1) {
    pinnedWindows.splice(index, 1);
  }
}

export function query(window) {
  return window.style.zIndex;
}

