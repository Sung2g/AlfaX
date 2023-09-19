
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".start-style");

    window.addEventListener("scroll", function () {
        var scroll = window.scrollY || window.pageYOffset;

        if (scroll >= 10) {
            header.classList.remove("start-style");
            header.classList.add("scroll-on");
        } else {
            header.classList.remove("scroll-on");
            header.classList.add("start-style");
        }
    });

    // Animation
    document.body.classList.remove("hero-anime");

    // Menu On Hover
    var navItems = document.querySelectorAll(".nav-item");

    function toggleNavItemClass(e) {
        if (window.innerWidth > 750) {
            var targetNavItem = e.target.closest(".nav-item");

            if (targetNavItem) {
                targetNavItem.classList.add("show");
                setTimeout(function () {
                    targetNavItem.classList.toggle("show", targetNavItem.matches(":hover"));
                }, 1);
            }
        }
    }

    document.body.addEventListener("mouseenter", toggleNavItemClass);
    document.body.addEventListener("mouseleave", toggleNavItemClass);

    // Switch light/dark
    var switchButton = document.getElementById("switch");

    switchButton.addEventListener("click", function () {
        if (document.body.classList.contains("dark")) {
            document.body.classList.remove("dark");
            switchButton.classList.remove("switched");
        } else {
            document.body.classList.add("dark");
            switchButton.classList.add("switched");
        }
    });
});
