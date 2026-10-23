// Where the dark mode button stores the visitor's choice ("light" or "dark").
export const themeKey = "theme";

// Runs in <head> before first paint: applies the stored choice, or the device
// setting, so a dark-mode visitor never sees a white flash. Without a stored
// choice it also follows the device setting when that changes.
export const themeScript = `(function(){try{var d=document.documentElement,m=matchMedia("(prefers-color-scheme: dark)");function set(){var s=localStorage.getItem("${themeKey}");d.dataset.theme=s||(m.matches?"dark":"light")}set();m.addEventListener("change",function(){if(!localStorage.getItem("${themeKey}"))set()})}catch(e){}})()`;
