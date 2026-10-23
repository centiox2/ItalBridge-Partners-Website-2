// Where the dark mode button stores the visitor's choice ("light" or "dark").
export const themeKey = "theme";

// Runs in <head> before first paint: applies the visitor's stored choice, so
// someone who picked dark mode never sees a light flash. Without a stored
// choice the site is light, whatever the device setting.
export const themeScript = `(function(){try{document.documentElement.dataset.theme=localStorage.getItem("${themeKey}")==="dark"?"dark":"light"}catch(e){}})()`;
