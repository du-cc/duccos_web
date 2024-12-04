// Test it out function
// TODO:
// - Remove this function when production

import { createWindow } from "../os/window/main.js";

createWindow(
  "window",
  "<i class='fa-regular fa-window fa-fw'></i>",
  "Dialog",
  {
    type: "html",
    content: `<div id="btn" style="display: flex; flex-direction: row; gap: 1.3em; flex-wrap: wrap"></div>
      <div id="btnp" style="display: flex; justify-content: center;>
     " </div>
              `,
  },
  {
    x: "center",
    y: "center",
    draggable: true,
    ignoreDefault: false,
    pinToTop: true,
    actions: [],
  }
);

const we = document.getElementById("btn");
const wep = document.getElementById("btnp");

const btn = document.createElement("button");
btn.innerHTML = `
      Button spawner!!!!
      `;
btn.style.padding = "15px";
btn.style.border = "none";
btn.style.backgroundColor = "#88d9ff";
btn.style.color = "#000";
btn.style.borderRadius = "10px";
btn.style.cursor = "pointer";
btn.style.fontFamily = "inherit";
btn.style.fontSize = "1.2em";
btn.style.marginTop = "10px";
btn.style.width = "100%";

function createInput(placeholder) {
  const input = document.createElement("input");
  input.placeholder = placeholder;
  input.style.padding = "15px";
  input.style.border = "none";
  input.style.borderBottom = "1px solid #000";
  input.style.color = "#000";
  input.style.borderRadius = "10px";
  input.style.fontFamily = "inherit";
  return input;
}

function createRadio(name, value, checked = false) {
  const p = document.createElement("div");
  p.style.display = "flex";
  p.style.gap = "0.5em";

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = name;
  radio.value = value;
  radio.checked = checked;

  const label = document.createElement("label");
  label.innerHTML = value;

  p.appendChild(radio);
  p.appendChild(label);

  return [p, radio];
}

function createCheckbox(name, value, checked = false) {
  const p = document.createElement("div");
  p.style.display = "flex";
  p.style.gap = "0.5em";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = name;
  checkbox.value = value;
  checkbox.checked = checked;

  const label = document.createElement("label");
  label.innerHTML = value;

  p.appendChild(label);
  p.appendChild(checkbox);

  return [p, checkbox];
}

const hr = document.createElement("hr");
hr.style.margin = "10px 0";
hr.style.border = "#000 0.5px solid";

const typeI_L = document.createElement("label");
typeI_L.innerHTML = "Window type";
typeI_L.style.marginBottom = "5px";

const typeI_P = document.createElement("div");
typeI_P.style.display = "flex";
typeI_P.style.gap = "0.5em";
typeI_P.style.marginBottom = "10px";

const typeI = createRadio("type", "window", true);
const typeI2 = createRadio("type", "dialog");

typeI_P.appendChild(typeI[0]);
typeI_P.appendChild(typeI2[0]);

const div1 = document.createElement("div");
div1.style.display = "flex";
div1.style.gap = "0.5em";
div1.style.flexDirection = "column";

const div2 = document.createElement("div");
div2.style.display = "flex";
div2.style.gap = "0.5em";
div2.style.flexDirection = "column";

const titleI = createInput("Window title");

const contentI = document.createElement("textarea");
contentI.placeholder = "Content";
contentI.style.padding = "15px";
contentI.style.border = "none";
contentI.style.borderBottom = "1px solid #000";
contentI.style.color = "#000";
contentI.style.borderRadius = "10px";
contentI.style.fontFamily = "inherit";
contentI.style.marginBottom = "10px";

const contentTypeI_P = document.createElement("div");
contentTypeI_P.style.display = "flex";
contentTypeI_P.style.gap = "0.5em";
contentTypeI_P.style.marginBottom = "10px";

const contentTypeI_L = document.createElement("label");
contentTypeI_L.innerHTML = "Content type";
contentTypeI_L.style.marginBottom = "5px";

const contentTypeI = createRadio("contenttype", "html", true);
const contentTypeI2 = createRadio("contenttype", "url");

contentTypeI_P.appendChild(contentTypeI[0]);
contentTypeI_P.appendChild(contentTypeI2[0]);

const miscL = document.createElement("label");
miscL.innerHTML = "Miscellaneous";

const xy_P = document.createElement("div");
xy_P.style.display = "flex";
xy_P.style.gap = "0.5em";
xy_P.style.marginBottom = "10px";
xy_P.style.width = "100%";

const xyL = document.createElement("label");
xyL.innerHTML = "Position";
xyL.style.marginBottom = "5px";

const xI = document.createElement("input");
xI.placeholder = "X pos";
xI.style.padding = "15px";
xI.style.border = "none";
xI.style.borderBottom = "1px solid #000";
xI.style.color = "#000";
xI.style.borderRadius = "10px";
xI.style.fontFamily = "inherit";
xI.style.width = "75px";

const yI = document.createElement("input");
yI.placeholder = "Y pos";
yI.style.padding = "15px";
yI.style.border = "none";
yI.style.borderBottom = "1px solid #000";
yI.style.color = "#000";
yI.style.borderRadius = "10px";
yI.style.fontFamily = "inherit";
yI.style.width = "75px";

xy_P.appendChild(xI);
xy_P.appendChild(yI);

const dragC = createCheckbox("draggable", "Draggable", true);
const pinC = createCheckbox("pinToTop", "Pin to top", true);

const actionP = document.createElement("div");
actionP.style.display = "flex";
actionP.style.gap = "1.5em";
actionP.style.marginBottom = "10px";

const actionL = document.createElement("label");
actionL.innerHTML = "Window actions";

const closeCheck = createCheckbox("actions", "close", true);
const minimizeCheck = createCheckbox("actions", "minimize", false);

actionP.appendChild(closeCheck[0]);
actionP.appendChild(minimizeCheck[0]);

div1.appendChild(typeI_L);
div1.appendChild(typeI_P);

div1.appendChild(titleI);
div1.appendChild(contentI);

div1.appendChild(contentTypeI_L);
div1.appendChild(contentTypeI_P);

div2.appendChild(miscL);
div2.appendChild(xyL);
div2.appendChild(xy_P);
div2.appendChild(dragC[0]);
div2.appendChild(pinC[0]);
div2.appendChild(actionL);
div2.appendChild(actionP);

wep.appendChild(btn);

we.appendChild(div1);
we.appendChild(div2);

function gi(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function c() {
  const title = titleI.value;
  const content = contentI.value;
  var draggablef = dragC[1].checked;
  var pinToTop = pinC[1].checked;

  var contentType = "";

  if (contentTypeI[1].checked) {
    contentType = "html";
  } else if (contentTypeI2[1].checked) {
    contentType = "url";
  }

  var type = "";

  if (typeI[1].checked) {
    type = "window";
  } else if (typeI2[1].checked) {
    type = "dialog";
  }

  var xv = 0;
  var yv = 0;

  if (xI.value === "center") {
    xv = "center";
  } else if (xI.value === "") {
    xv = gi(0, 1000);
  } else {
    xv = xI.value;
  }

  if (yI.value === "center") {
    yv = "center";
  } else if (yI.value === "") {
    yv = gi(0, 1000);
  } else {
    yv = yI.value;
  }

  var a = [];

  if (closeCheck[1].checked === true) {
    a.push("close");
  }

  if (minimizeCheck[1].checked === true) {
    a.push("minimize");
  }

  return createWindow(
    type,
    "<i class='fa-regular fa-window fa-fw'></i>",
    title,
    { type: contentType, content: content },
    {
      x: xv,
      y: yv,
      draggable: draggablef,
      pinToTop: pinToTop,
      actions: a,
    }
  );
}

btn.addEventListener("click", () => {
  var r = c();
  if (r.ok === false) {
    gsap.to(btn, {
      backgroundColor: "#ff0000",
      duration: 0.5,
      onComplete: () => {
        gsap.to(btn, {
          backgroundColor: "#88d9ff",
          duration: 0.5,
        });
      },
    });
  }
});

btn.addEventListener("mousedown", () => {
  gsap.to(btn, {
    opacity: 0.8,
    scale: 1.1,
    duration: 0.3,
  });
});

btn.addEventListener("mouseup", () => {
  gsap.to(btn, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
  });
});
