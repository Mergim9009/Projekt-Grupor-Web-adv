'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () { navbar.classList.toggle("active"); }

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () { navbar.classList.remove("active"); }

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
const forceHeader = document.body && document.body.getAttribute("data-force-header") === "true";

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100 || forceHeader) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }

  if (window.scrollY >= 100) {
    backTopBtn.classList.add("active");
  } else {
    backTopBtn.classList.remove("active");
  }
});

if (forceHeader) {
  header.classList.add("active");
}


/**
 * video modal controls
 */

const playBtn = document.querySelector(".play-btn");
const videoModal = document.getElementById("video-modal");
const cardioVideo = document.getElementById("cardio-video");
const videoClosers = document.querySelectorAll("[data-video-close]");
const inlineVideo = document.getElementById("inline-cardio-video");
const videoCard = document.querySelector(".video-card");

const openVideoModal = function () {
  if (!videoModal) return;
  videoModal.classList.add("active");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (cardioVideo) {
    try { cardioVideo.currentTime = 0; cardioVideo.play(); } catch (e) {}
  }
}

const closeVideoModal = function () {
  if (!videoModal) return;
  videoModal.classList.remove("active");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (cardioVideo) cardioVideo.pause();
}

const startInlinePlayback = function () {
  if (!inlineVideo) {
    // Fallback to modal if inline not present
    openVideoModal();
    return;
  }
  if (videoCard) videoCard.classList.add("playing");
  inlineVideo.hidden = false;
  try {
    inlineVideo.currentTime = 0;
    inlineVideo.play();
  } catch (e) {}
}

if (playBtn) addEventOnElem(playBtn, "click", startInlinePlayback);
if (videoClosers.length) addEventOnElem(videoClosers, "click", closeVideoModal);

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && videoModal && videoModal.classList.contains("active")) {
    closeVideoModal();
  }
});

if (inlineVideo) {
  inlineVideo.addEventListener("ended", function () {
    if (videoCard) videoCard.classList.remove("playing");
    inlineVideo.hidden = true;
  });
}