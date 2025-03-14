document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animation library
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navInfo = document.querySelector(".nav-info");

  if (hamburger && navInfo) {
    hamburger.addEventListener("click", () => {
      navInfo.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    // Close mobile menu when clicking on a navigation link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navInfo.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  // Dark mode functionality
  const darkModeToggle = document.getElementById("darkModeToggle");
  const darkModeIcon = darkModeToggle.querySelector("i");

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark-theme");
    darkModeIcon.classList.replace("fa-moon", "fa-sun");
  }

  // Toggle dark mode
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    // Toggle icon between moon and sun
    if (document.body.classList.contains("dark-theme")) {
      darkModeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      darkModeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    }
  });

  // Form submission handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Normally, you would send this data to a server here
      console.log("Form submitted:", { name, email, message });

      // Show a success message
      alert("Thank you for your message! I will get back to you soon.");

      // Reset the form
      contactForm.reset();
    });
  }
});
