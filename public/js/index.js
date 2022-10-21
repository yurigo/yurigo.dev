
const button = document.querySelector("#toggle")
const useDark = window.matchMedia("(prefers-color-scheme: dark)");
const glasses = document.getElementById("glasses")

const changeButton = (state) => {
    const icon = button.querySelector("span.i")
    icon.innerHTML = state ? '🌙' : '☀'
    glasses.style.opacity = state ? 0 : 1;
}

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

const root = document.querySelector(':root');
let hue = Math.floor(Math.random() * 360);

const changeBackgroundHUE = () => {
    hue = (hue % 360);  //reset please!
    root.style.setProperty('--background-hue', ++hue % 360)
}

// setInterval(changeBackgroundHUE, 50)

const eyeLeft = document.getElementById("eye_left")
const eyeRight = document.getElementById("eye_right")

// @TODO cleanup svg
// @TODO rename paths

// const nose = document.getElementById("svg_58")
// const noseBox = nose.getBoundingClientRect();
// const div_nose = document.createElement("div");
// div_nose.classList.add("dummy");

// const centerX = (noseBox.left + noseBox.right) / 2
// const centerY = (noseBox.top + noseBox.bottom) / 2

// div_nose.style.top = noseBox.top + "px";
// div_nose.style.left = noseBox.left + "px";
// div_nose.style.height = noseBox.height + "px";
// div_nose.style.width = noseBox.width + "px";

// const div_nose_center = document.createElement("div");

// div_nose_center.classList.add("dummy-point");
// div_nose_center.style.top = centerY + "px";
// div_nose_center.style.left = centerX + "px";

// document.body.append(div_nose)
// document.body.append(div_nose_center)

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;

    changeEyesPosition(mouseX, mouseY)
})

function withCenter(boundingBox) {
    boundingBox.centerX = (boundingBox.left + boundingBox.right) / 2
    boundingBox.centerY = (boundingBox.top + boundingBox.bottom) / 2
    boundingBox.centerToString = `${boundingBox.centerX}px ${boundingBox.centerY}px`
    return boundingBox
}

// const div1 = document.createElement("div");
// div1.classList.add("dummy-point");
// document.body.append(div1)


function changeEyesPosition(x, y) {
    const eyeLeftBox = withCenter(eyeLeft.getBoundingClientRect());
    const eyeRightBox = withCenter(eyeRight.getBoundingClientRect());

    // div1.style.top = eyeLeftBox.centerY - (eyeLeftBox.centerY - y) * 0.005 + "px";
    // div1.style.left = eyeLeftBox.centerX - (eyeLeftBox.centerX - x) * 0.005 + "px";

    // div1.style.top = eyeLeftBox.centerY + "px"
    // div1.style.left = eyeLeftBox.centerX + "px"

    const eyeLeftNewX = -(eyeLeftBox.centerX - x) * 0.02;
    const eyeLeftNewY = -(eyeLeftBox.centerY - y) * 0.02;

    const eyeRightNewX = -(eyeRightBox.centerX - x) * 0.02;
    const eyeRightNewY = -(eyeRightBox.centerY - y) * 0.02;

    // div1.style.translate = `${eyeLeftNewX}px ${eyeLeftNewY}px`

    // eyeLeftBox.centerX = (eyeLeftBox.left + eyeLeftBox.right) / 2
    //eyeLeftBox.centerY = (eyeLeftBox.left + eyeLeftBox.right) / 2

    eyeLeft.style.translate = `${eyeLeftNewX}px ${eyeLeftNewY}px`;
    eyeRight.style.translate = `${eyeRightNewX}px ${eyeRightNewY}px`;
    // eyeRight.style.translate = `${eyeRightBox.centerX}px ${eyeRightBox.centerY}px`;

    // eyeLeft.style.translate = (x - eyeLeftBox.centerX) + "px " + (y - eyeLeftBox.centerY) + "px";
    // eyeRight.style.translate = (x - eyeRightBox.centerX) + "px " + (y - eyeRightBox.centerY) + "px";


}



