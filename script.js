const navbar = document.getElementById("navbar");

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

const modal = document.getElementById("reportModal");
const closeModal = document.getElementById("closeModal");

const newsletterForm =
    document.getElementById("newsletterForm");

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");


/* =====================================================
   NAVBAR
===================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (mobileMenu.classList.contains("open")) {

        icon.classList.remove("bi-list");
        icon.classList.add("bi-x-lg");

    } else {

        icon.classList.remove("bi-x-lg");
        icon.classList.add("bi-list");

    }

});


function closeMobileMenu() {

    mobileMenu.classList.remove("open");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("bi-x-lg");
    icon.classList.add("bi-list");

}


mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener("click", () => {
            closeMobileMenu();
        });

    });


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const id =
                link.getAttribute("href");

            const target =
                document.querySelector(id);

            if (!target) return;

            event.preventDefault();

            const offset = 75;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                offset;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

            closeMobileMenu();

        });

    });


/* =====================================================
   ACTIVE NAV
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 160;

        const bottom =
            top + section.offsetHeight;

        if (
            window.scrollY >= top &&
            window.scrollY < bottom
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   MODAL
===================================================== */

function openModal() {

    modal.classList.add("active");

    document.body.classList.add("modal-open");

}


function closeReportModal() {

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

}


document
    .querySelectorAll('[data-action="report"]')
    .forEach(button => {

        button.addEventListener("click", () => {

            closeMobileMenu();

            openModal();

        });

    });


document
    .querySelectorAll('[data-action="found"]')
    .forEach(button => {

        button.addEventListener("click", () => {

            openModal();

        });

    });


closeModal.addEventListener(
    "click",
    closeReportModal
);


modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeReportModal();

    }

});


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        modal.classList.contains("active")
    ) {

        closeReportModal();

    }

});


/* =====================================================
   MODAL OPTIONS
===================================================== */

document
    .querySelectorAll(".modal-option")
    .forEach(option => {

        option.addEventListener("click", () => {

            const type =
                option.dataset.modalAction;

            const messages = {

                lost: "Lost pet report selected.",

                found: "Found pet report selected.",

                sighted: "Pet sighting selected."

            };

            closeReportModal();

            showToast(messages[type]);

        });

    });


/* =====================================================
   PET CARDS
===================================================== */

document
    .querySelectorAll(".pet-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const type =
                card.dataset.card;

            const messages = {

                lost: "Showing lost pet reports.",

                found: "Showing found pet reports.",

                sighted: "Showing recent pet sightings."

            };

            showToast(messages[type]);

        });

    });


/* =====================================================
   COUNTERS
===================================================== */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;


function animateCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            target / 70;


        function update() {

            current += increment;

            if (current >= target) {

                counter.textContent =
                    target.toLocaleString();

                return;

            }

            counter.textContent =
                Math.floor(current)
                    .toLocaleString();

            requestAnimationFrame(update);

        }

        update();

    });

}


const statsObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounters();

                    statsObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .5
        }
    );


statsObserver.observe(
    document.querySelector(".stats-bar")
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".section-header, .pet-card, .adoption-visual, .adoption-content, .story-card, .step, .benefit, .how-intro"
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   NEWSLETTER
===================================================== */

newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const email =
            document
                .getElementById("email")
                .value
                .trim();

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!pattern.test(email)) {

            showToast(
                "Please enter a valid email."
            );

            return;

        }


        showToast(
            "You're now part of the PetTrace community!"
        );

        newsletterForm.reset();

    }
);


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    toastText.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================================
   IMAGE FALLBACK
===================================================== */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.background =
                    "#ead8cf";

            }
        );

    });