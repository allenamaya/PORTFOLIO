(function () {
  // Function to safely initialize features
  function initializeFeatures() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
    const audio = document.getElementById("background-audio");
    const toggleAudio = document.getElementById("toggle-audio");

    // Initialize AOS
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 200,
        disable: window.innerWidth < 768, // Disable on mobile devices
      });
    } else {
      console.warn("AOS library not loaded. Animations will not work.");
    }

    // Audio functionality
    if (audio && toggleAudio) {
      let isPlaying = false;

      toggleAudio.addEventListener("click", function () {
        if (!isPlaying) {
          audio
            .play()
            .then(() => {
              isPlaying = true;
              this.classList.add("playing");
            })
            .catch((error) => {
              console.warn("Audio playback failed:", error);
            });
        } else {
          if (audio.paused) {
            audio.play();
            this.classList.remove("paused");
          } else {
            audio.pause();
            this.classList.add("paused");
          }
        }
      });

      // Set initial volume
      audio.volume = 0.45;
    }

    // Navigation highlight functionality
    if (sections.length && navLinks.length) {
      function setActiveLink() {
        let index = sections.length;
        while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove("active"));
        navLinks[index].classList.add("active");
      }

      window.addEventListener("scroll", setActiveLink);
      setActiveLink(); // Set initial state
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeFeatures);
  } else {
    initializeFeatures();
  }

  // Error handling for resource loading
  window.addEventListener(
    "error",
    function (e) {
      if (e.target.tagName === "IMG") {
        console.warn("Image failed to load:", e.target.src);
        e.target.src = "/placeholder.svg"; // Fallback image
      }
    },
    true
  );
})();
