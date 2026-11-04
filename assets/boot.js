/* Runs first: hide the card until we know how it should look (with a failsafe). */
document.documentElement.classList.add("js-loading");
// failsafe: never leave the page hidden, even if a script fails to load
setTimeout(() => document.documentElement.classList.remove("js-loading"), 3000);
