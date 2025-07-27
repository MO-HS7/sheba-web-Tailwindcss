// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.addEventListener("click", (e) => {
    if (e.target.closest(".nav-link")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
});

// Set active link based on current page
function setActiveLink() {
    const currentPage = window.location.pathname.split("/").pop();
    const activePage = currentPage || "index.html";

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    const targetLink = document.querySelector(`.nav-link[href="${activePage}"]`);
    if (targetLink) {
        targetLink.classList.add("active");
    } else if (activePage !== "index.html") {
        const homeLink = document.querySelector(".nav-link[href=\"index.html\"]");
        if (homeLink) {
            homeLink.classList.add("active");
        }
    }
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.querySelector(".theme-toggle");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    const currentTheme = localStorage.getItem("theme") || (prefersDarkScheme.matches ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        let newTheme = theme === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });
}

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector(".theme-toggle i");
    if (theme === "dark") {
        themeIcon.className = "fas fa-sun";
    } else {
        themeIcon.className = "fas fa-moon";
    }
}

// Toast notification function
function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText =
    `   position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 0.9rem;
        z-index: 1000;
        opacity: 1;
        transition: opacity 0.5s ease;`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll("input, textarea");
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute("required") && !input.value.trim()) {
            isValid = false;
            input.style.borderColor = "red";

            setTimeout(() => {
                input.style.borderColor = "";
            }, 3000);
        } else {
            input.style.borderColor = "";
        }
    });

    return isValid;
}

// Initialize when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
    setActiveLink();
    initThemeToggle();

    const storedName = localStorage.getItem("userName");
    if (storedName) {
        showToast(`Welcome back, ${storedName}!`);
    }

    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", e => {
            e.preventDefault();

            if (!validateForm(contactForm)) {
                showToast("Please fill in all required fields.");
                return;
            }

            const name = contactForm.querySelector("#name").value.trim();
            const email = contactForm.querySelector("#email").value.trim();

            localStorage.setItem("userName", name);
            showToast("Thank you! Your message has been sent.");
            contactForm.reset();
        });
    }

    // // Simple Intersection Observer for scroll-based animations
    // const heroSection = document.querySelector(".hero");
    // if (heroSection) {
    //     const observer = new IntersectionObserver(entries => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 entry.target.querySelectorAll(".hero-title, .hero-subtitle, .hero-buttons").forEach(el => {
    //                     el.style.animationPlayState = "running";
    //                 });
    //             } else {
    //                 entry.target.querySelectorAll(".hero-title, .hero-subtitle, .hero-buttons").forEach(el => {
    //                     el.style.animationPlayState = "paused";
    //                 });
    //             }
    //         });
    //     }, { threshold: 0.5 });

    //     observer.observe(heroSection);
    // }
});

// // Smooth scroll for anchor links
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//         }
//     });
// });

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuBtn.classList.toggle('active');
        });
    }

    // --- Dark/Light Mode Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Only proceed if the theme toggle button exists on the page
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');

        // This function updates the theme and icon
        const setTheme = (isDark) => {
            document.documentElement.classList.toggle('dark', isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            if (themeIcon) {
                themeIcon.classList.toggle('fa-sun', isDark);
                themeIcon.classList.toggle('fa-moon', !isDark);
            }
        };

        // Set the initial icon state based on the current theme
        const isInitiallyDark = document.documentElement.classList.contains('dark');
        if (themeIcon) {
            themeIcon.classList.toggle('fa-sun', isInitiallyDark);
            themeIcon.classList.toggle('fa-moon', !isInitiallyDark);
        }

        // Add the click event listener
        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyDark = document.documentElement.classList.contains('dark');
            setTheme(!isCurrentlyDark);
        });
    }
});
