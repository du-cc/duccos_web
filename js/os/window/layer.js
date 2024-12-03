// Module: Window layering

var maxZIndex = 0;

var pinnedWindows = [];

export function bringToFront(window) {
  window.style.zIndex = ++maxZIndex;

  // Keep pinned windows on top
  pinnedWindows.forEach((pinnedWindow) => {
    pinnedWindow.style.zIndex = ++maxZIndex;
  });
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