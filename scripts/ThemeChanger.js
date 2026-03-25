
if (localStorage.getItem("theme") === "light") {
  document.querySelector("body").classList.add("LightTheme");
}

let ThemeChanger = document.querySelector(".ThemeChanger");
ThemeChanger.addEventListener("click", Themechange);
function Themechange() {
  document.querySelector("body").classList.toggle("LightTheme");
  saveTheme();
}

let ThemeChangerMobile = document.querySelector('.ThemeChangerMobile');
ThemeChangerMobile.addEventListener('click', ThemechangeMobile);
function ThemechangeMobile() {
  document.querySelector("body").classList.toggle("LightTheme");
  saveTheme();
}

function saveTheme() {
  const isLight = document.querySelector("body").classList.contains("LightTheme");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}