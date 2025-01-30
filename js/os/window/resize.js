// Module: Window resize
// TODO:
// - todo is todo-ing

import * as windowMgmt from "./main.js";
import * as layer from "./layer.js";

gsap.registerPlugin(Draggable);

export function setResizeable(window) {
  console.log("re", window);
  var elements = {};

  // Create resize handles
  const handleContainer = document.createElement("div");
  handleContainer.classList.add("resize");

  const topHandle = document.createElement("div");
  topHandle.classList.add("top");
  elements.top = topHandle;

  const rightHandle = document.createElement("div");
  rightHandle.classList.add("right");
  elements.right = rightHandle;

  const bottomHandle = document.createElement("div");
  bottomHandle.classList.add("bottom");
  elements.bottom = bottomHandle;

  const leftHandle = document.createElement("div");
  leftHandle.classList.add("left");
  elements.left = leftHandle;

  // Diagonal
  const topLeftHandle = document.createElement("div");
  topLeftHandle.classList.add("topLeft");
  elements.topLeft = topLeftHandle;

  const topRightHandle = document.createElement("div");
  topRightHandle.classList.add("topRight");
  elements.topRight = topRightHandle;

  const bottomLeftHandle = document.createElement("div");
  bottomLeftHandle.classList.add("bottomLeft");
  elements.bottomLeft = bottomLeftHandle;

  const bottomRightHandle = document.createElement("div");
  bottomRightHandle.classList.add("bottomRight");
  elements.bottomRight = bottomRightHandle;

  // Append
  handleContainer.appendChild(topHandle);
  handleContainer.appendChild(rightHandle);
  handleContainer.appendChild(bottomHandle);
  handleContainer.appendChild(leftHandle);
  handleContainer.appendChild(topLeftHandle);
  handleContainer.appendChild(topRightHandle);
  handleContainer.appendChild(bottomLeftHandle);
  handleContainer.appendChild(bottomRightHandle);

  window.appendChild(handleContainer);

  // Resize functionality
  var resize = {};

  function resizeFunction(element, direction) {
    var data = {};

    return Draggable.create(element, {
      trigger: element,
      type: "x,y",
      zIndexBoost: false,
      allowContextMenu: true,
      touchCallbacks: true,

      onPress: function (e) {
        layer.bringToFront(window);
        data.initialWidth = window.clientWidth;
        data.initialHeight = window.clientHeight;
        data.initialX = window.offsetLeft;
        data.initialY = window.offsetTop;
        data.startX = e.type.includes("touch")
          ? e.touches[0].clientX
          : e.clientX;
        data.startY = e.type.includes("touch")
          ? e.touches[0].clientY
          : e.clientY;
      },
      onDrag: function (e) {
        const currentX = e.type.includes("touch")
          ? e.touches[0].clientX
          : e.clientX;
        const currentY = e.type.includes("touch")
          ? e.touches[0].clientY
          : e.clientY;
        const diffX = currentX - data.startX;
        const diffY = currentY - data.startY;

        element.style.transform = "";

        if (direction.includes("right")) {
          window.style.width = data.initialWidth + diffX + "px";
        }
        if (direction.includes("left")) {
          window.style.width = data.initialWidth - diffX + "px";
          window.style.left = data.initialX + diffX + "px";
        }
        if (direction.includes("bottom")) {
          window.style.height = data.initialHeight + diffY + "px";
        }
        if (direction.includes("top")) {
          window.style.height = data.initialHeight - diffY + "px";
          window.style.top = data.initialY + diffY + "px";
        }
      },
    })[0];
  }

  resize.top = resizeFunction(topHandle, "top");
  resize.right = resizeFunction(rightHandle, "right");
  resize.bottom = resizeFunction(bottomHandle, "bottom");
  resize.left = resizeFunction(leftHandle, "left");
  resize.topLeft = resizeFunction(topLeftHandle, "top left");
  resize.topRight = resizeFunction(topRightHandle, "top right");
  resize.bottomLeft = resizeFunction(bottomLeftHandle, "bottom left");
  resize.bottomRight = resizeFunction(bottomRightHandle, "bottom right");
}
