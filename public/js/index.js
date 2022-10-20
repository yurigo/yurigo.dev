
const button = document.querySelector("#toggle")
const useDark = window.matchMedia("(prefers-color-scheme: dark)");

const changeButton = (state) => {
    button.innerHTML = state ? '🌙' : '🌞'
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

setInterval(changeBackgroundHUE, 50)

