/**
 * ICT251 Web Technologies - Activity 3
 * Student Name: Pasche Luyando Simoonga
 * Script File handling interactive JavaScript features.
 */

document.addEventListener("DOMContentLoaded", () => {
    initThemeSwitch();
    initProjectFilter();
    initGalleryViewer();
    initContactFormValidation();
});

/* ==========================================================================
   FEATURE 1: Theme Switch (Light/Dark Mode)
   ========================================================================== */
/**
 * Toggles between light and dark visual themes.
 */
function initThemeSwitch() {
    const themeBtn = document.getElementById("theme-toggle");
    if (!themeBtn) return;

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        
        if (document.body.classList.contains("dark-theme")) {
            themeBtn.textContent = "☀️ Light Mode";
        } else {
            themeBtn.textContent = "🌙 Dark Mode";
        }
    });
}

/* ==========================================================================
   FEATURE 2: Project / Skills Filter
   ========================================================================== */
/**
 * Filters visible project items based on category selection.
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const noProjectsMsg = document.getElementById("no-projects-msg");

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");
            let visibleCount = 0;

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.classList.remove("hidden");
                    visibleCount++;
                } else {
                    card.classList.add("hidden");
                }
            });

            // Display message if no items match
            if (visibleCount === 0) {
                noProjectsMsg.classList.remove("hidden");
            } else {
                noProjectsMsg.classList.add("hidden");
            }
        });
    });
}

/* ==========================================================================
   FEATURE 3: Interactive Gallery Viewer
   ========================================================================== */
/**
 * Rotates gallery images and captions on button clicks.
 */
function initGalleryViewer() {
    const galleryData = [
        {
            src: "images/Pasche.jpeg",
            alt: "Pasche before his first basketball game",
            caption: "Before my first game with Kabwe Comets."
        },
        {
            src: "images/Pasche2.jpeg",
            alt: "Pasche with members of his basketball team",
            caption: "A moment with some of the members of my basketball team."
        },
        {
            src: "images/Pasche3.jpeg",
            alt: "Pasche with his friend at Kabwe Mall",
            caption: "A good moment with my friend at Kabwe Mall."
        }
    ];

    let currentIndex = 0;

    const imgElem = document.getElementById("gallery-img");
    const captionElem = document.getElementById("gallery-caption");
    const counterElem = document.getElementById("gallery-counter");
    const prevBtn = document.getElementById("prev-photo-btn");
    const nextBtn = document.getElementById("next-photo-btn");

    if (!imgElem || !prevBtn || !nextBtn) return;

    function updateGallery(index) {
        imgElem.src = galleryData[index].src;
        imgElem.alt = galleryData[index].alt;
        captionElem.textContent = galleryData[index].caption;
        counterElem.textContent = `Photo ${index + 1} of ${galleryData.length}`;
    }

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = galleryData.length - 1; // Loop to end
        }
        updateGallery(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < galleryData.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop to start
        }
        updateGallery(currentIndex);
    });
}

/* ==========================================================================
   COMPULSORY FEATURE: Contact Form Validation & Local Preview
   ========================================================================== */
/**
 * Validates user form input and displays local preview without reloading page.
 */
function initContactFormValidation() {
    const form = document.getElementById("contact-form");
    const previewArea = document.getElementById("form-preview");
    const resetBtn = document.getElementById("reset-form-btn");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        // Prevent actual HTTP page submission / refresh
        event.preventDefault();

        // Get inputs
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const topicInput = document.getElementById("topic");
        const messageInput = document.getElementById("message");

        // Clear previous error messages
        document.getElementById("name-error").textContent = "";
        document.getElementById("email-error").textContent = "";
        document.getElementById("message-error").textContent = "";

        let isValid = true;

        // Name validation (no blank/whitespace-only)
        const nameValue = nameInput.value.trim();
        if (nameValue === "") {
            document.getElementById("name-error").textContent = "Please enter a valid name (cannot be blank).";
            isValid = false;
        }

        // Email validation (regex format)
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;
        if (!emailPattern.test(emailValue)) {
            document.getElementById("email-error").textContent = "Please enter a valid email address (e.g. user@example.com).";
            isValid = false;
        }

        // Message validation (no blank/whitespace-only)
        const messageValue = messageInput.value.trim();
        if (messageValue === "") {
            document.getElementById("message-error").textContent = "Please enter a message (cannot be blank).";
            isValid = false;
        }

        // If form is valid, display local summary preview safely using textContent
        if (isValid) {
            document.getElementById("preview-name").textContent = nameValue;
            document.getElementById("preview-email").textContent = emailValue;
            document.getElementById("preview-topic").textContent = topicInput.value;
            document.getElementById("preview-message").textContent = messageValue;

            form.classList.add("hidden");
            previewArea.classList.remove("hidden");
        }
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            previewArea.classList.add("hidden");
            form.classList.remove("hidden");
        });
    }
}