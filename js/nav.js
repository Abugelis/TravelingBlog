const burger = document.querySelector(".top-nav-hamburger");
const closeBtn = document.querySelector(".nav-panel-close");
const header = document.querySelector(".site-header");
const overlay = document.querySelector(".nav-overlay");
const menuItems = document.querySelectorAll(".top-nav-main-menu li:has(ul)");
const menuLinks = document.querySelectorAll(".top-nav-main-menu li a");
const isDesktop = window.matchMedia("(min-width: 1024px)");


/* ------------- MAIN BURGER PANEL --------- */

/* Toggle Burger Nav On */

burger.addEventListener("click", () => {
    header.classList.add("nav-open");
    overlay.style.display = "block"
});

/* Toggle Burger Nav Off */

closeBtn.addEventListener("click", ()=> {
    header.classList.remove("nav-open");
    overlay.style.display = "none"
});

/* Toggle Burger Nav Off When Overlay Is Clicked */

overlay.addEventListener("click", ()=> {
    header.classList.remove("nav-open");
    overlay.style.display = "none"
});


/* ------------- BURGER SUB MENUS (Mobile Only) --------- */

menuItems.forEach(li => {
    const link = li.querySelector("a");

    link.addEventListener("click", e => {

        if (isDesktop.matches) return;

        e.preventDefault();

        // only the immediate ul of this li
        const submenu = li.querySelector(":scope > ul");
        if (!submenu) return;

        submenu.classList.toggle("open");
        li.classList.toggle("open-parent");
    });
});

menuLinks.forEach(link => {
    link.addEventListener("click", e => {
        // remove active from all other links
        menuLinks.forEach(l => l.classList.remove("active"));

        // add active to clicked link
        link.classList.add("active");
    });
});