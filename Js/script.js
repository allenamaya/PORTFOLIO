document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const audio = document.getElementById("background-audio");
  const toggleAudio = document.getElementById("toggle-audio");
  const audioIcon = toggleAudio.querySelector("svg");

  function setActiveLink() {
    let index = sections.length;
    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
    navLinks.forEach((link) => link.classList.remove("active"));
    navLinks[index].classList.add("active");
  }

  setActiveLink();
  window.addEventListener("scroll", setActiveLink);

  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 200,
  });

  // Set initial volume to 45%
  audio.volume = 0.45;

  // Audio player functionality with proper error handling
  let isFirstClick = true;

  toggleAudio.addEventListener("click", async () => {
    try {
      if (isFirstClick) {
        // First click - try to start playing
        await audio.play();
        isFirstClick = false;
        audioIcon.innerHTML =
          '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
      } else {
        // Subsequent clicks - toggle mute
        audio.muted = !audio.muted;
        if (audio.muted) {
          audioIcon.innerHTML =
            '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
        } else {
          audioIcon.innerHTML =
            '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
        }
      }
    } catch (error) {
      console.log("Audio playback error:", error);
      // If autoplay fails, we'll still show the unmuted icon
      // so users know they can click to play
      audioIcon.innerHTML =
        '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
    }
  });

  // Handle initial state
  audio.addEventListener("canplaythrough", () => {
    // Don't try to autoplay initially
    // Wait for user interaction instead
    audioIcon.innerHTML =
      '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
  });

  // Handle page visibility changes
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      audio.pause();
    } else {
      if (!isFirstClick && !audio.muted) {
        audio.play().catch((error) => {
          document.addEventListener("DOMContentLoaded", () => {
            const sections = document.querySelectorAll("section");
            const navLinks = document.querySelectorAll(".nav-links a");
            const audio = document.getElementById("background-audio");
            const toggleAudio = document.getElementById("toggle-audio");
            const audioIcon = toggleAudio.querySelector("svg");

            function setActiveLink() {
              let index = sections.length;

              while (
                --index &&
                window.scrollY + 100 < sections[index].offsetTop
              ) {}

              navLinks.forEach((link) => link.classList.remove("active"));
              navLinks[index].classList.add("active");
            }

            setActiveLink();
            window.addEventListener("scroll", setActiveLink);

            // Initialize AOS
            AOS.init({
              duration: 1000,
              once: true,
              offset: 200,
            });

            // Set initial volume to 45%
            audio.volume = 0.45;

            // Audio player functionality
            toggleAudio.addEventListener("click", () => {
              if (audio.muted) {
                audio.muted = false;
                audioIcon.innerHTML =
                  '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
              } else {
                audio.muted = true;
                audioIcon.innerHTML =
                  '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
              }
            });

            // Start playing audio when it's loaded
            audio.addEventListener("canplaythrough", () => {
              audio.play().catch((error) => {
                console.log("Autoplay prevented:", error);
              });
            });
          });
          console.log("Resume playback error:", error);
        });
      }
    }
  });
});
