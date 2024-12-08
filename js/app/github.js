// APP: Pre-production, redirects to github
// TODO:
// - Remove this js file when production

import * as windowMgmt from "../os/window/main.js";

windowMgmt.create({
  title: "About this project",
  icon: `<i class="fa-regular fa-info-circle fa-fw"></i>`,
  content: {
    type: "html",
    content: `
    <h3>sorry but mobile is not supported yet (turn on desktop site to experience)</h3>
        <div style="display: flex; flex-direction: column; gap:0.3em">
            <div style="display: flex; flex-direction: row; gap: 0.3em; flex-wrap: wrap; align-items: flex-end; padding-bottom: 0.7em; border-bottom: #000 1px solid;">
                <span style="font-size: 1.3em">duccOS?</span><span style="font-size: 0.8em">aka duccWeb i guess?</span>
            </div>
            <span style="font-size: 1.1em; margin-top: 0.7em;">This project is me making an webOS and making a portfolio out of this</span>
            <span style="font-size: 1.1em; margin-top: 0.3em;">This originally is just a basic ass project but I can't stop expanding</span>
            <span style="font-size: 1.1em; margin-top: 0.3em;">Everything are coded using <b>vanilla</b> js btw (with the help of gsap)</span>
            <span style="font-size: 1.1em; margin-top: 0.3em;">feel free to try (theres another window there)</span>
            <span style="font-size: 1.1em; margin-top: 1.3em;">Done modules</span>
            <ul>
                <li>Window management</li>
                <li>Window layering</li>
                <li>Window animations</li>
                <li>Window dragging</li>
            </ul>
        </div>
        <div id="ghbtn" style="text-align: center; color: #fff; background-color: #000; border-radius: 10px; width: 100%; padding: 0.7em 0; flex-wrap:wrap; font-size: 2em; display: flex; flex-direction: row; justify-content: center; margin-top: 1em; align-items: center; gap: 0.7em; cursor: pointer"><i class="fa-brands fa-github"></i>Check out the project!</div>
            `,
  },
  type: "window",
  x: "0",
  y: "0",
  sx: "300",
  sy: "300",
  draggable: true,
  pinToTop: true,
  actions: ["close", "minimize"],
});

const ghbtn = document.getElementById("ghbtn");
ghbtn.addEventListener("click", () => {
  gsap.to(ghbtn, {
    scale: 0.95,
    duration: 0.15,
    onComplete: () => {
      gsap.to(ghbtn, {
        scale: 1,
        duration: 0.15,
        onComplete: () => {
          window
            .open("https://github.com/du-cc/du-cc.github.io", "_blank")
            .focus();
        },
      });
    },
  });
});
