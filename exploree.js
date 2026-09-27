document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PET DATA
    ===================================================== */

    const pets = [
        {
            name: "Luna",
            type: "dog",
            status: "found",
            location: "downtown",
            time: 2,
            timeText: "2 hours ago",
            image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=85",
            description: "Luna is a friendly Golden Retriever found in Downtown."
        },

        {
            name: "Milo",
            type: "cat",
            status: "lost",
            location: "riverside",
            time: 4,
            timeText: "4 hours ago",
            image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=85",
            description: "Milo is a lovely gray cat reported lost near Riverside."
        },

        {
            name: "Bella",
            type: "dog",
            status: "found",
            location: "northside",
            time: 6,
            timeText: "6 hours ago",
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=85",
            description: "Bella is a sweet mixed-breed dog found in Northside."
        },

        {
            name: "Charlie",
            type: "dog",
            status: "found",
            location: "riverside",
            time: 7,
            timeText: "7 hours ago",

            /* FIXED CHARLIE IMAGE */
            image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=85",

            description: "Charlie is a friendly Labrador found near Riverside."
        }
    ];


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const searchInput = document.getElementById("petSearch");
    const searchButton = document.getElementById("searchBtn");

    const locationFilter = document.getElementById("locationFilter");
    const typeFilter = document.getElementById("typeFilter");
    const statusFilter = document.getElementById("statusFilter");

    const resetFilters = document.getElementById("resetFilters");
    const sortPets = document.getElementById("sortPets");

    const petsList = document.getElementById("petsList");
    const viewAllPets = document.getElementById("viewAllPets");

    const mapLocationBtn = document.getElementById("mapLocationBtn");
    const zoomIn = document.getElementById("zoomIn");
    const zoomOut = document.getElementById("zoomOut");

    const mapBackground = document.querySelector(".map-background");


    /* =====================================================
       MODAL
    ===================================================== */

    const modalElement = document.getElementById("petDetailsModal");

    const modalPetImage = document.getElementById("modalPetImage");
    const modalPetName = document.getElementById("modalPetName");
    const modalPetStatus = document.getElementById("modalPetStatus");
    const modalPetInfo = document.getElementById("modalPetInfo");
    const modalPetLocation = document.getElementById("modalPetLocation");
    const modalPetTime = document.getElementById("modalPetTime");


    /* =====================================================
       AOS
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 800,
            once: true,
            offset: 80
        });

    }


    /* =====================================================
       HELPER
    ===================================================== */

    function capitalize(text) {

        if (!text) return "";

        return text.charAt(0).toUpperCase() + text.slice(1);

    }


    function getPet(name) {

        return pets.find(
            pet => pet.name.toLowerCase() === name.toLowerCase()
        );

    }


    /* =====================================================
       FILTER FUNCTION
    ===================================================== */

    function filterPets() {

        if (!petsList) return;

        const searchValue = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const selectedLocation = locationFilter
            ? locationFilter.value
            : "all";

        const selectedType = typeFilter
            ? typeFilter.value
            : "all";

        const selectedStatus = statusFilter
            ? statusFilter.value
            : "all";


        const cards = petsList.querySelectorAll(".pet-card");


        cards.forEach(card => {

            const name =
                (card.dataset.name || "").toLowerCase();

            const type =
                (card.dataset.type || "").toLowerCase();

            const status =
                (card.dataset.status || "").toLowerCase();

            const location =
                (card.dataset.location || "").toLowerCase();


            const searchMatch =
                searchValue === "" ||
                name.includes(searchValue) ||
                type.includes(searchValue) ||
                status.includes(searchValue) ||
                location.includes(searchValue);


            const locationMatch =
                selectedLocation === "all" ||
                location === selectedLocation;


            const typeMatch =
                selectedType === "all" ||
                type === selectedType;


            const statusMatch =
                selectedStatus === "all" ||
                status === selectedStatus;


            if (
                searchMatch &&
                locationMatch &&
                typeMatch &&
                statusMatch
            ) {

                card.style.display = "flex";

                card.style.opacity = "1";

            } else {

                card.style.display = "none";

            }

        });


        updateMapPins(
            searchValue,
            selectedLocation,
            selectedType,
            selectedStatus
        );

    }


    /* =====================================================
       MAP PIN FILTER
    ===================================================== */

    function updateMapPins(
        searchValue,
        selectedLocation,
        selectedType,
        selectedStatus
    ) {

        const pins = document.querySelectorAll(".map-pin");


        pins.forEach(pin => {

            const petName = pin.dataset.pet;

            const pet = getPet(petName);

            if (!pet) return;


            const searchMatch =
                searchValue === "" ||
                pet.name.toLowerCase().includes(searchValue) ||
                pet.type.toLowerCase().includes(searchValue) ||
                pet.location.toLowerCase().includes(searchValue);


            const locationMatch =
                selectedLocation === "all" ||
                pet.location === selectedLocation;


            const typeMatch =
                selectedType === "all" ||
                pet.type === selectedType;


            const statusMatch =
                selectedStatus === "all" ||
                pet.status === selectedStatus;


            if (
                searchMatch &&
                locationMatch &&
                typeMatch &&
                statusMatch
            ) {

                pin.style.display = "flex";

            } else {

                pin.style.display = "none";

            }

        });

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener("input", filterPets);

        searchInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                event.preventDefault();

                filterPets();

            }

        });

    }


    if (searchButton) {

        searchButton.addEventListener("click", filterPets);

    }


    /* =====================================================
       LOCATION FILTER
    ===================================================== */

    if (locationFilter) {

        locationFilter.addEventListener(
            "change",
            filterPets
        );

    }


    /* =====================================================
       TYPE FILTER
    ===================================================== */

    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            filterPets
        );

    }


    /* =====================================================
       STATUS FILTER
    ===================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterPets
        );

    }


    /* =====================================================
       RESET
    ===================================================== */

    if (resetFilters) {

        resetFilters.addEventListener("click", () => {

            if (searchInput) {
                searchInput.value = "";
            }

            if (locationFilter) {
                locationFilter.value = "all";
            }

            if (typeFilter) {
                typeFilter.value = "all";
            }

            if (statusFilter) {
                statusFilter.value = "all";
            }

            filterPets();

        });

    }


    /* =====================================================
       SORT
    ===================================================== */

    if (sortPets && petsList) {

        sortPets.addEventListener("change", () => {

            const cards = Array.from(
                petsList.querySelectorAll(".pet-card")
            );


            cards.sort((a, b) => {

                const timeA =
                    Number(a.dataset.time || 0);

                const timeB =
                    Number(b.dataset.time || 0);


                if (sortPets.value === "recent") {

                    return timeA - timeB;

                }

                return timeB - timeA;

            });


            cards.forEach(card => {

                petsList.appendChild(card);

            });

        });

    }


    /* =====================================================
       PET MODAL
    ===================================================== */

    function openPetModal(pet) {

        if (!pet || !modalElement) return;


        modalPetImage.src = pet.image;

        modalPetImage.alt =
            `${pet.name} the ${pet.type}`;


        modalPetName.textContent =
            pet.name;


        modalPetInfo.textContent =
            pet.description;


        modalPetLocation.textContent =
            capitalize(pet.location);


        modalPetTime.textContent =
            pet.timeText;


        modalPetStatus.textContent =
            capitalize(pet.status);


        modalPetStatus.classList.remove(
            "found-status",
            "lost-status"
        );


        if (pet.status === "found") {

            modalPetStatus.classList.add(
                "found-status"
            );

        } else {

            modalPetStatus.classList.add(
                "lost-status"
            );

        }


        if (typeof bootstrap !== "undefined") {

            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    modalElement
                );

            modal.show();

        }

    }


    /* =====================================================
       PET VIEW BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".pet-view-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const petName =
                    button.dataset.pet;

                const pet =
                    getPet(petName);

                if (pet) {

                    openPetModal(pet);

                }

            });

        });


    /* =====================================================
       MAP PINS
    ===================================================== */

    document
        .querySelectorAll(".map-pin")
        .forEach(pin => {

            pin.addEventListener("click", event => {

                event.stopPropagation();


                const petName =
                    pin.dataset.pet;

                const pet =
                    getPet(petName);


                if (!pet) return;


                document
                    .querySelectorAll(".map-pin")
                    .forEach(item => {

                        item.classList.remove(
                            "pin-active"
                        );

                    });


                pin.classList.add("pin-active");


                openPetModal(pet);

            });

        });


    /* =====================================================
       VIEW ALL
    ===================================================== */

    if (viewAllPets) {

        viewAllPets.addEventListener("click", () => {

            if (searchInput) {
                searchInput.value = "";
            }

            if (locationFilter) {
                locationFilter.value = "all";
            }

            if (typeFilter) {
                typeFilter.value = "all";
            }

            if (statusFilter) {
                statusFilter.value = "all";
            }


            filterPets();


            if (petsList) {

                petsList.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    }


    /* =====================================================
       MAP ZOOM
    ===================================================== */

    let currentZoom = 1;

    const minZoom = 0.8;
    const maxZoom = 1.6;
    const zoomStep = 0.1;


    function updateZoom() {

        if (!mapBackground) return;

        mapBackground.style.transform =
            `scale(${currentZoom})`;

    }


    if (zoomIn) {

        zoomIn.addEventListener("click", () => {

            currentZoom = Math.min(
                currentZoom + zoomStep,
                maxZoom
            );

            updateZoom();

        });

    }


    if (zoomOut) {

        zoomOut.addEventListener("click", () => {

            currentZoom = Math.max(
                currentZoom - zoomStep,
                minZoom
            );

            updateZoom();

        });

    }


    if (mapLocationBtn) {

        mapLocationBtn.addEventListener("click", () => {

            currentZoom = 1;

            updateZoom();


            document
                .querySelectorAll(".map-pin")
                .forEach(pin => {

                    pin.classList.remove(
                        "pin-active"
                    );

                });

        });

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    filterPets();

    updateZoom();

});