const button = document.querySelector("#toggle");
const useDark = window.matchMedia("(prefers-color-scheme: dark)");
const glasses = document.getElementById("glasses");

const changeButton = (state) => {
  const icon = button.querySelector(".icon");
  icon.innerHTML = state ? "🌙" : "☀";
  glasses.style.opacity = state ? 0 : 1;
};

function toggleDarkMode(state) {
  document.documentElement.classList.toggle("dark-mode", state);
  changeButton(state);
}

toggleDarkMode(useDark.matches);

// Listening for the changes in the OS settings and auto switching the mode
useDark.addEventListener("change", (evt) => toggleDarkMode(evt.matches));

// Toggles the "dark-mode" class on click
button.addEventListener("click", () => {
  const state = document.documentElement.classList.toggle("dark-mode");
  changeButton(state);
});

const root = document.querySelector(":root");
let hue = Math.floor(Math.random() * 360);

const changeBackgroundHUE = () => {
  hue = hue % 360; //reset please!
  root.style.setProperty("--background-hue", ++hue % 360);
};

setInterval(changeBackgroundHUE, 50);

const eyeLeft = document.getElementById("eye_left");
const eyeRight = document.getElementById("eye_right");

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = event.pageX;
  mouseY = event.pageY;
  changeEyesPosition(mouseX, mouseY);
});

function touch(event) {
  mouseX = event.touches[0].pageX;
  mouseY = event.touches[0].pageY;
  changeEyesPosition(mouseX, mouseY);
}

document.addEventListener("touchstart", touch);
document.addEventListener("touchmove", touch);
document.addEventListener("touchend", touch);

function withCenter(boundingBox) {
  boundingBox.centerX = (boundingBox.left + boundingBox.right) / 2;
  boundingBox.centerY = (boundingBox.top + boundingBox.bottom) / 2;
  boundingBox.centerToString = `${boundingBox.centerX}px ${boundingBox.centerY}px`;
  return boundingBox;
}

const TRANSFORMATION = 1;
const MAX_RADIUS = 25;

function getTransformation(x, y, box) {
  let nx = x - box.centerX;
  let ny = y - box.centerY;

  let distance = Math.sqrt(Math.pow(nx, 2) + Math.pow(ny, 2));
  let alpha = Math.atan(ny / nx);
  alpha = nx < 0 ? alpha + Math.PI : alpha;

  return `rotate( ${alpha}rad ) translate( ${Math.min(
    distance * TRANSFORMATION,
    MAX_RADIUS
  )}px )`;
}

function changeEyesPosition(x, y) {
  eyeLeft.style.transform = getTransformation(
    x,
    y,
    withCenter(eyeLeft.getBoundingClientRect())
  );
  eyeRight.style.transform = getTransformation(
    x,
    y,
    withCenter(eyeRight.getBoundingClientRect())
  );
}
