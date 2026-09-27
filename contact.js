document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       FORM ELEMENTS
    ====================================================== */

    const form = document.getElementById("contactForm");

    if (!form) {
        console.error("Contact form not found.");
        return;
    }


    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const submitBtn = document.getElementById("submitBtn");

    const messageCounter =
        document.getElementById("messageCounter");


    /* =====================================================
       ERROR ELEMENTS
    ====================================================== */

    const errors = {

        fullName:
            document.getElementById("fullNameError"),

        email:
            document.getElementById("emailError"),

        subject:
            document.getElementById("subjectError"),

        message:
            document.getElementById("messageError")

    };


    /* =====================================================
       IMAGE ELEMENTS
    ====================================================== */

    const petImage =
        document.getElementById("petImage");

    const imageUploadBox =
        document.getElementById("imageUploadBox");

    const imagePreview =
        document.getElementById("imagePreview");

    const previewImage =
        document.getElementById("previewImage");

    const fileName =
        document.getElementById("fileName");

    const fileSize =
        document.getElementById("fileSize");

    const removeImage =
        document.getElementById("removeImage");

    const imageError =
        document.getElementById("imageError");


    /* =====================================================
       VALIDATION REGEX
    ====================================================== */

    const nameRegex =
        /^[A-Za-zÀ-ÿ\u0600-\u06FF\s'-]+$/;

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


    /* =====================================================
       SHOW ERROR
    ====================================================== */

    function showError(
        input,
        errorElement,
        messageText
    ) {

        input.classList.remove("valid");

        input.classList.add("invalid");

        input.setAttribute(
            "aria-invalid",
            "true"
        );

        errorElement.textContent =
            messageText;

        errorElement.classList.add("show");
    }


    /* =====================================================
       SHOW VALID
    ====================================================== */

    function showValid(
        input,
        errorElement
    ) {

        input.classList.remove("invalid");

        input.classList.add("valid");

        input.setAttribute(
            "aria-invalid",
            "false"
        );

        errorElement.textContent = "";

        errorElement.classList.remove("show");
    }


    /* =====================================================
       RESET FIELD
    ====================================================== */

    function resetField(
        input,
        errorElement
    ) {

        input.classList.remove(
            "invalid",
            "valid"
        );

        input.removeAttribute(
            "aria-invalid"
        );

        errorElement.textContent = "";

        errorElement.classList.remove(
            "show"
        );
    }


    /* =====================================================
       VALIDATE NAME
    ====================================================== */

    function validateName() {

        const value =
            fullName.value.trim();


        if (value === "") {

            showError(
                fullName,
                errors.fullName,
                "Please enter your full name."
            );

            return false;
        }


        if (value.length < 2) {

            showError(
                fullName,
                errors.fullName,
                "Name must contain at least 2 characters."
            );

            return false;
        }


        if (value.length > 50) {

            showError(
                fullName,
                errors.fullName,
                "Name must be less than 50 characters."
            );

            return false;
        }


        if (!nameRegex.test(value)) {

            showError(
                fullName,
                errors.fullName,
                "Please enter a valid name."
            );

            return false;
        }


        showValid(
            fullName,
            errors.fullName
        );

        return true;
    }


    /* =====================================================
       VALIDATE EMAIL
    ====================================================== */

    function validateEmail() {

        const value =
            email.value.trim();


        if (value === "") {

            showError(
                email,
                errors.email,
                "Please enter your email address."
            );

            return false;
        }


        if (!emailRegex.test(value)) {

            showError(
                email,
                errors.email,
                "Please enter a valid email address."
            );

            return false;
        }


        showValid(
            email,
            errors.email
        );

        return true;
    }


    /* =====================================================
       VALIDATE SUBJECT
    ====================================================== */

    function validateSubject() {

        const value =
            subject.value;


        if (!value) {

            showError(
                subject,
                errors.subject,
                "Please select a subject."
            );

            return false;
        }


        showValid(
            subject,
            errors.subject
        );

        return true;
    }


    /* =====================================================
       VALIDATE MESSAGE
    ====================================================== */

    function validateMessage() {

        const value =
            message.value.trim();


        if (value === "") {

            showError(
                message,
                errors.message,
                "Please enter your message."
            );

            return false;
        }


        if (value.length < 10) {

            showError(
                message,
                errors.message,
                "Message must contain at least 10 characters."
            );

            return false;
        }


        if (value.length > 500) {

            showError(
                message,
                errors.message,
                "Message cannot exceed 500 characters."
            );

            return false;
        }


        showValid(
            message,
            errors.message
        );

        return true;
    }


    /* =====================================================
       LIVE VALIDATION
    ====================================================== */

    fullName.addEventListener(
        "blur",
        validateName
    );


    email.addEventListener(
        "blur",
        validateEmail
    );


    subject.addEventListener(
        "change",
        validateSubject
    );


    message.addEventListener(
        "blur",
        validateMessage
    );


    /* =====================================================
       LIVE NAME VALIDATION
    ====================================================== */

    fullName.addEventListener(
        "input",
        () => {

            if (
                fullName.classList.contains(
                    "invalid"
                )
            ) {
                validateName();
            }

        }
    );


    /* =====================================================
       LIVE EMAIL VALIDATION
    ====================================================== */

    email.addEventListener(
        "input",
        () => {

            if (
                email.classList.contains(
                    "invalid"
                )
            ) {
                validateEmail();
            }

        }
    );


    /* =====================================================
       MESSAGE COUNTER
    ====================================================== */

    function updateCounter() {

        const length =
            message.value.length;


        messageCounter.textContent =
            `${length} / 500`;


        if (length >= 500) {

            messageCounter.style.color =
                "#B84D4D";

        }

        else if (length >= 450) {

            messageCounter.style.color =
                "#C97B4B";

        }

        else {

            messageCounter.style.color =
                "";

        }

    }


    message.addEventListener(
        "input",
        () => {

            updateCounter();

            if (
                message.classList.contains(
                    "invalid"
                )
            ) {
                validateMessage();
            }

        }
    );


    /* =====================================================
       IMAGE UPLOAD
    ====================================================== */

    const MAX_FILE_SIZE =
        5 * 1024 * 1024;


    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];


    petImage.addEventListener(
        "change",
        () => {

            const file =
                petImage.files[0];


            clearImageError();


            if (!file) {
                return;
            }


            /* Check type */

            if (
                !allowedTypes.includes(
                    file.type
                )
            ) {

                showImageError(
                    "Please upload a JPG, PNG, or WEBP image."
                );

                petImage.value = "";

                return;
            }


            /* Check size */

            if (
                file.size >
                MAX_FILE_SIZE
            ) {

                showImageError(
                    "Image size must be less than 5MB."
                );

                petImage.value = "";

                return;
            }


            /* Preview */

            const reader =
                new FileReader();


            reader.onload =
                (event) => {

                    previewImage.src =
                        event.target.result;


                    fileName.textContent =
                        file.name;


                    fileSize.textContent =
                        formatFileSize(
                            file.size
                        );


                    imagePreview.classList.add(
                        "show"
                    );


                    imageUploadBox.classList.add(
                        "valid"
                    );

                };


            reader.readAsDataURL(file);

        }
    );


    /* =====================================================
       REMOVE IMAGE
    ====================================================== */

    removeImage.addEventListener(
        "click",
        () => {

            petImage.value = "";

            previewImage.src = "";

            fileName.textContent = "";

            fileSize.textContent = "";

            imagePreview.classList.remove(
                "show"
            );

            imageUploadBox.classList.remove(
                "valid",
                "invalid"
            );

            clearImageError();

        }
    );


    /* =====================================================
       IMAGE ERROR
    ====================================================== */

    function showImageError(
        messageText
    ) {

        imageUploadBox.classList.remove(
            "valid"
        );

        imageUploadBox.classList.add(
            "invalid"
        );

        imageError.textContent =
            messageText;

        imageError.classList.add(
            "show"
        );

    }


    function clearImageError() {

        imageUploadBox.classList.remove(
            "invalid"
        );

        imageError.textContent = "";

        imageError.classList.remove(
            "show"
        );

    }


    /* =====================================================
       FILE SIZE
    ====================================================== */

    function formatFileSize(bytes) {

        if (bytes < 1024) {

            return `${bytes} B`;

        }


        if (
            bytes <
            1024 * 1024
        ) {

            return `${(
                bytes / 1024
            ).toFixed(1)} KB`;

        }


        return `${(
            bytes /
            (1024 * 1024)
        ).toFixed(2)} MB`;

    }


    /* =====================================================
       FORM SUBMIT
    ====================================================== */

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const validName =
                validateName();

            const validEmail =
                validateEmail();

            const validSubject =
                validateSubject();

            const validMessage =
                validateMessage();


            const isValid =
                validName &&
                validEmail &&
                validSubject &&
                validMessage;


            /* Stop if invalid */

            if (!isValid) {

                const firstInvalid =
                    form.querySelector(
                        ".invalid"
                    );


                if (firstInvalid) {

                    firstInvalid.focus();

                }


                return;
            }


            /* Loading */

            const originalButton =
                submitBtn.innerHTML;


            submitBtn.disabled = true;

            submitBtn.classList.add(
                "loading"
            );


            submitBtn.innerHTML = `
                <i class="fa-solid fa-spinner"></i>
                Sending...
            `;


            /* Demo sending */

            await new Promise(
                resolve => {

                    setTimeout(
                        resolve,
                        1200
                    );

                }
            );


            /* Success */

            showSuccessMessage();


            /* Reset */

            form.reset();


            resetField(
                fullName,
                errors.fullName
            );


            resetField(
                email,
                errors.email
            );


            resetField(
                subject,
                errors.subject
            );


            resetField(
                message,
                errors.message
            );


            /* Reset image */

            petImage.value = "";

            previewImage.src = "";

            fileName.textContent = "";

            fileSize.textContent = "";

            imagePreview.classList.remove(
                "show"
            );

            imageUploadBox.classList.remove(
                "valid",
                "invalid"
            );

            clearImageError();


            updateCounter();


            /* Restore button */

            submitBtn.disabled = false;

            submitBtn.classList.remove(
                "loading"
            );

            submitBtn.innerHTML =
                originalButton;

        }
    );


    /* =====================================================
       SUCCESS MESSAGE
    ====================================================== */

    function showSuccessMessage() {

        const oldMessage =
            form.querySelector(
                ".form-success-message"
            );


        if (oldMessage) {
            oldMessage.remove();
        }


        const success =
            document.createElement(
                "div"
            );


        success.className =
            "form-success-message";


        success.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>

            <div>
                <strong>
                    Message received successfully!
                </strong>

                <span>
                    Thank you for contacting PetTrace.
                    We'll get back to you as soon as possible.
                </span>
            </div>
        `;


        form.prepend(success);


        setTimeout(
            () => {

                success.style.opacity =
                    "0";

                success.style.transform =
                    "translateY(-8px)";


                setTimeout(
                    () => {

                        success.remove();

                    },
                    400
                );

            },
            5000
        );

    }


    /* =====================================================
       INITIALIZE
    ====================================================== */

    updateCounter();


    console.log(
        "🐾 PetTrace Contact Form initialized successfully."
    );

});