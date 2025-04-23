document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animation library with enhanced settings
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: false, // Changed to false to make animations repeat on scroll
      offset: 100,
      delay: 100,
      easing: "ease-in-out",
      mirror: true, // Animation will trigger again when scrolling back up
      anchorPlacement: "top-bottom",
    });
  }

  // Setup additional scroll animations for elements without AOS attributes
  setupScrollAnimations();

  // Initialize project functionality
  setupProjectFilters();
  setupProjectModals();

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

  // Enhanced Contact Form Handling
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form fields
      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email");
      const subjectField = document.getElementById("subject");
      const messageField = document.getElementById("message");

      // Validate form
      let isValid = true;
      let errorMessage = "";

      if (!nameField.value.trim()) {
        isValid = false;
        errorMessage = "Please enter your name";
        nameField.focus();
      } else if (!isValidEmail(emailField.value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
        emailField.focus();
      } else if (!messageField.value.trim()) {
        isValid = false;
        errorMessage = "Please enter your message";
        messageField.focus();
      }

      if (!isValid) {
        showFormStatus("error", errorMessage);
        return;
      }

      // Form is valid, prepare data for submission
      const formData = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        subject: subjectField.value.trim() || "Contact from Portfolio",
        message: messageField.value.trim(),
      };

      // Show sending status
      showFormStatus("loading", "Sending your message...");

      // Simulate form submission (in a real scenario, you'd send to a server)
      setTimeout(() => {
        // Simulate successful submission
        console.log("Form data:", formData);

        // Show success message
        showFormStatus(
          "success",
          "Thank you! Your message has been sent successfully."
        );

        // Reset form
        contactForm.reset();

        // Clear status after 5 seconds
        setTimeout(() => {
          formStatus.className = "form-status";
          formStatus.style.display = "none";
        }, 5000);
      }, 1500);
    });
  }

  // Email validation helper function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Helper function to show form status
  function showFormStatus(type, message) {
    formStatus.style.display = "block";
    formStatus.textContent = message;

    // Reset classes
    formStatus.className = "form-status";

    if (type === "error") {
      formStatus.classList.add("error");
    } else if (type === "success") {
      formStatus.classList.add("success");
    } else if (type === "loading") {
      formStatus.classList.add("loading");
    }
  }

  // Handle resume link in navigation
  if (!document.querySelector("a.nav-link.resume-link")) {
    const resumeLink = document.createElement("a");
    resumeLink.href = "#";
    resumeLink.className = "nav-link resume-link";
    resumeLink.textContent = "Resume";

    // Add click event to download resume directly
    resumeLink.addEventListener("click", (e) => {
      e.preventDefault();
      downloadResume();
    });

    // Insert after "About" link
    const aboutLink = document.querySelector('a[href="#about"]');
    if (aboutLink && navInfo) {
      navInfo.insertBefore(resumeLink, aboutLink.nextSibling);
    }
  }

  // Add smooth scrolling animation for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Setup project category filtering
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute("data-filter");

      // Update active button state
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter projects
      projectItems.forEach((item) => {
        if (filterValue === "all") {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 100);
        } else if (item.classList.contains(filterValue)) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });

      // Refresh AOS
      if (typeof AOS !== "undefined") {
        setTimeout(() => {
          AOS.refresh();
        }, 500);
      }
    });
  });

  // Initialize project items with transition properties
  projectItems.forEach((item) => {
    item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  });
}

// Setup project modal functionality
function setupProjectModals() {
  const previewButtons = document.querySelectorAll(".preview-btn");
  const modals = document.querySelectorAll(".project-modal");
  const closeButtons = document.querySelectorAll(".close-modal");

  // Open modal when clicking "View Details" button
  previewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetModal = document.getElementById(
        `${button.dataset.project}-modal`
      );
      targetModal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open

      // Add escape key functionality
      document.addEventListener("keydown", closeModalOnEscape);
    });
  });

  // Close modal when clicking X button
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".project-modal");
      closeProjectModal(modal);
    });
  });

  // Close modal when clicking outside the content
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeProjectModal(modal);
      }
    });
  });

  // Function to close modal with escape key
  function closeModalOnEscape(e) {
    if (e.key === "Escape") {
      const openModal = document.querySelector(
        '.project-modal[style="display: block;"]'
      );
      if (openModal) {
        closeProjectModal(openModal);
      }
    }
  }

  // Helper function to close modal
  function closeProjectModal(modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    document.removeEventListener("keydown", closeModalOnEscape);
  }
}

// Setup additional scroll animations
function setupScrollAnimations() {
  // Animate skill bars on scroll
  const animateSkillBars = () => {
    const skillSectionPos = document.getElementById("skills").offsetTop;
    const windowHeight = window.innerHeight;
    const scrollPos = window.scrollY;

    if (scrollPos > skillSectionPos - windowHeight + 200) {
      document.querySelectorAll(".skill-progress-bar").forEach((bar) => {
        const width = bar.getAttribute("style").match(/width:\s*(\d+)%/)[1];
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width + "%";
        }, 200);
      });
      window.removeEventListener("scroll", animateSkillBars);
    }
  };

  // Animate elements on scroll
  const scrollFadeElements = document.querySelectorAll(
    ".heading, .card, .skill-item, .contact-info, .contact-form-container"
  );

  const fadeInOnScroll = () => {
    scrollFadeElements.forEach((element) => {
      const elementPos = element.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;

      // If no AOS attribute and element comes into view
      if (
        !element.hasAttribute("data-aos") &&
        elementPos < screenHeight - 100
      ) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Initialize styles for non-AOS elements
  scrollFadeElements.forEach((element) => {
    if (!element.hasAttribute("data-aos")) {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    }
  });

  // Add scroll event listeners
  window.addEventListener("scroll", animateSkillBars);
  window.addEventListener("scroll", fadeInOnScroll);

  // Initial check for elements already in view
  animateSkillBars();
  fadeInOnScroll();
}

// Resume download functionality
function downloadResume() {
  // Create a link to the PDF file
  const pdfURL = "media/Vedant_Singh_Resume.pdf"; // Updated path to the resume in media folder

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = pdfURL;
  link.setAttribute("download", "Vedant_Singh_Resume.pdf");

  // Show a small notification that download is starting
  const notification = document.createElement("div");
  notification.textContent = "Downloading resume...";
  notification.style.cssText =
    "position:fixed; bottom:20px; right:20px; background-color:var(--primary-color); color:white; padding:10px 15px; border-radius:5px; box-shadow:0 2px 5px rgba(0,0,0,0.2); z-index:9999;";
  document.body.appendChild(notification);

  // Append to the document
  document.body.appendChild(link);

  // Trigger the download
  link.click();

  // Clean up
  document.body.removeChild(link);

  // Remove notification after 3 seconds
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}
