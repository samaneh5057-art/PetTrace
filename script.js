
/* =====================================================
   PETTRACE NAVBAR
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const navbar =
        document.getElementById("pettraceNavbar");

    const menuButton =
        document.getElementById("mobileMenuBtn");

    const mobileNav =
        document.getElementById("mobileNav");


    /* ================================================
       MOBILE MENU
    ================================================ */

    if (menuButton && mobileNav) {

        menuButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                const isOpen =
                    mobileNav.classList.toggle("open");


                menuButton.classList.toggle(
                    "active",
                    isOpen
                );


                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                menuButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close menu"
                        : "Open menu"
                );

            }
        );


        /* CLOSE AFTER CLICKING LINK */

        const links =
            mobileNav.querySelectorAll("a");


        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    mobileNav.classList.remove("open");

                    menuButton.classList.remove("active");

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.setAttribute(
                        "aria-label",
                        "Open menu"
                    );

                }
            );

        });


        /* CLOSE OUTSIDE */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !mobileNav.contains(event.target) &&
                    !menuButton.contains(event.target)
                ) {

                    mobileNav.classList.remove("open");

                    menuButton.classList.remove("active");

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );


        /* ESCAPE */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    mobileNav.classList.remove("open");

                    menuButton.classList.remove("active");

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }


    /* ================================================
       NAVBAR GLASS ON SCROLL
    ================================================ */

    if (navbar) {

        function updateNavbar() {

            if (window.scrollY > 40) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        }


        window.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );


        updateNavbar();

    }


    /* ================================================
       RESET MENU ON DESKTOP
    ================================================ */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 768) {

                if (mobileNav) {

                    mobileNav.classList.remove("open");

                }

                if (menuButton) {

                    menuButton.classList.remove("active");

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );

});

