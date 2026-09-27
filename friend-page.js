document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       TOAST
    ========================= */
    function showToast(message) {
        let toast = document.querySelector(".toast-message");

        if (!toast) {
            toast = document.createElement("div");
            toast.className = "toast-message";
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }


    /* =========================
       GALLERY
    ========================= */
    const mainImage = document.querySelector(".main-img-container img");
    const thumbnails = document.querySelectorAll(".thumbnail-img");

    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", () => {

            if (!mainImage) return;

            mainImage.src = thumbnail.src;

            thumbnails.forEach((img) => {
                img.classList.remove("active");
            });

            thumbnail.classList.add("active");
        });
    });


    /* =========================
       IMAGE LIGHTBOX
    ========================= */
    const expandButton = document.querySelector(".expand-icon");

    if (expandButton && mainImage) {
        expandButton.addEventListener("click", () => {

            const lightbox = document.createElement("div");
            lightbox.className = "image-lightbox";

            lightbox.innerHTML = `
                <button class="lightbox-close">&times;</button>
                <img src="${mainImage.src}" alt="Luna">
            `;

            document.body.appendChild(lightbox);

            setTimeout(() => {
                lightbox.classList.add("show");
            }, 10);

            const closeLightbox = () => {
                lightbox.classList.remove("show");

                setTimeout(() => {
                    lightbox.remove();
                }, 200);
            };

            lightbox
                .querySelector(".lightbox-close")
                .addEventListener("click", closeLightbox);

            lightbox.addEventListener("click", (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            document.addEventListener("keydown", function escHandler(e) {
                if (e.key === "Escape") {
                    closeLightbox();
                    document.removeEventListener("keydown", escHandler);
                }
            });
        });
    }


    /* =========================
       REPORT A SIGHTING MODAL
    ========================= */
    const reportButtons = document.querySelectorAll(".btn-primary-custom");

    reportButtons.forEach((button) => {

        button.addEventListener("click", (e) => {
            e.preventDefault();

            const modal = document.createElement("div");
            modal.className = "modal-overlay";

            modal.innerHTML = `
                <div class="report-modal">
                    <button class="modal-close">&times;</button>

                    <div class="modal-icon">
                        <i class="fa-solid fa-location-dot"></i>
                    </div>

                    <h3>Report a Sighting</h3>
                    <p>Have you seen Luna? Please choose an option below.</p>

                    <div class="modal-options">
                        <button class="modal-option" data-option="I saw Luna">
                            <i class="fa-solid fa-eye"></i>
                            <span>I saw Luna</span>
                        </button>

                        <button class="modal-option" data-option="I found Luna">
                            <i class="fa-solid fa-heart"></i>
                            <span>I found Luna</span>
                        </button>

                        <button class="modal-option" data-option="I have information">
                            <i class="fa-solid fa-circle-info"></i>
                            <span>I have information</span>
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            const closeModal = () => {
                modal.remove();
            };

            modal
                .querySelector(".modal-close")
                .addEventListener("click", closeModal);

            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });

            modal.querySelectorAll(".modal-option").forEach((option) => {
                option.addEventListener("click", () => {

                    const selectedOption = option.dataset.option;

                    closeModal();

                    showToast(
                        `${selectedOption} selected. Thank you for helping Luna!`
                    );
                });
            });
        });
    });


    /* =========================
       SHARE BUTTON
    ========================= */
    const shareButton =
        document.querySelector(".sidebar-card .btn-outline-custom");

    if (shareButton) {
        shareButton.addEventListener("click", async (e) => {

            e.preventDefault();

            const shareData = {
                title: "Luna's Profile - PetTrace",
                text: "Help us find Luna!",
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (error) {
                    // User closed share menu
                }
            } else {
                try {
                    await navigator.clipboard.writeText(
                        window.location.href
                    );

                    showToast("Profile link copied!");
                } catch (error) {
                    showToast("Unable to copy the link.");
                }
            }
        });
    }


    /* =========================
       VIEW ON MAP
    ========================= */
    const mapButton =
        document.querySelector(".timeline-container .btn-outline-custom");

    if (mapButton) {
        mapButton.addEventListener("click", (e) => {

            e.preventDefault();

            const location = "Oak Street, Amsterdam";

            const mapURL =
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

            window.open(mapURL, "_blank");

            showToast("Opening location on map...");
        });
    }


    /* =========================
       BACK TO EXPLORE
    ========================= */
    const backButton = document.querySelector('a[href="#"]');

    if (backButton) {
        backButton.addEventListener("click", (e) => {

            e.preventDefault();

            if (window.history.length > 1) {
                window.history.back();
            } else {
                showToast("Explore page");
            }
        });
    }


    /* =========================
       VIEW ALL SIGHTINGS
    ========================= */
    const viewAllButton = document.querySelector(".hover-link");

    if (viewAllButton) {
        viewAllButton.addEventListener("click", (e) => {

            e.preventDefault();

            const sightingsSection = [
                ...document.querySelectorAll(".mb-5")
            ].find(section =>
                section.querySelector(".hover-link")
            );

            if (sightingsSection) {
                sightingsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }


    /* =========================
       TIMELINE ITEMS
    ========================= */
    const timelineItems =
        document.querySelectorAll(".timeline-item");

    timelineItems.forEach((item) => {

        item.addEventListener("click", () => {

            timelineItems.forEach((el) => {
                el.classList.remove("selected");
            });

            item.classList.add("selected");

            const title =
                item.querySelector("h6")?.textContent || "Timeline event";

            showToast(title);
        });
    });


    /* =========================
       SCROLL REVEAL
    ========================= */
    const revealElements = document.querySelectorAll(
        ".sidebar-card, .timeline-item, .sighting-card, .cta-section"
    );

    revealElements.forEach((element) => {
        element.classList.add("js-reveal");
    });

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });


    /* =========================
       KEYBOARD ACCESSIBILITY
    ========================= */
    thumbnails.forEach((thumbnail) => {

        thumbnail.setAttribute("tabindex", "0");

        thumbnail.addEventListener("keydown", (e) => {

            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                thumbnail.click();
            }

        });
    });


    console.log("PetTrace Luna profile JavaScript loaded successfully.");

});