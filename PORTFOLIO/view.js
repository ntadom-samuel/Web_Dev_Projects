"use strict";

const sliders = document.querySelectorAll(".slide__arrows");
const slides = document.querySelectorAll(".p_project");
const leftButton = document.querySelector(".arrow__left");
const rightButton = document.querySelector(".arrow__right");
const navLinksContainer = document.querySelector(".nav_links_container");
const navLinksTab = document.querySelector(
  ".nav_links_display_phones_container"
);
const projectSection = document.querySelector(".personal_projects");
const heroSection = document.querySelector(".landing_page");
const heroHeader = document.querySelector(".nav_bar");
const dateElement = document.querySelector(".date");
const contactLogo = document.querySelector(".bar__one__text");

////////////////////IMPLEMENTING SCROLL-TO-TOP ON PAGE RELOAD
window.addEventListener("load", function (e) {
  e.preventDefault();
  heroSection.scrollIntoView({ behavior: "smooth" });
});

//////////////////SET AUTOMATIC DATE
const date = new Date();
dateElement.textContent = date.getFullYear();

///////////////////REVEALING ELEMENTS ON SCROLL
const sections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section__hidden");

  observer.unobserve(entry.target);
};

//TODO: how to use intersection observer
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach((sec) => {
  sectionObserver.observe(sec);
});

//////////////////IMPLEMENTING SMOOTH SCROLLING
heroHeader.addEventListener("click", function (e) {
  if (e.target.classList.contains("nav_link")) {
    if (
      e.target.getAttribute("href") !== "activities.html" &&
      e.target.getAttribute("href") !== "about.html"
    ) {
      e.preventDefault();
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  }
});

contactLogo.addEventListener("click", function (e) {
  e.preventDefault();
  const id = e.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

////////////////IMPLEMENTING MOBILE APP FEATURES
//TODO: Add event listener
const implementMobile = () => {
  if (projectSection.offsetWidth <= 540) {
    // Renders buttons for sliding
    rightButton.classList.remove("hidden");

    //Changes nav links to icon
    navLinksContainer.innerHTML = `<ion-icon class="menu" name="menu-outline"></ion-icon>`;
  } else if (projectSection.offsetWidth > 540) {
    rightButton.classList.add("hidden");

    navLinksContainer.innerHTML = ` <a href="#home" class="nav_link">Home</a>
          <a href="#p_p" class="nav_link">Projects</a>
          <a href="#c_p" class="nav_link">Contact</a>
          <a href="activities.html" class="nav_link">Activities & Courses</a>
          <a href="about.html" class="nav_link">Me</a>`;
  }
};
window.addEventListener("resize", function (e) {
  implementMobile();
});

implementMobile();

////////////////////////Implementing Sliding of project slides
const maxSlide = slides.length - 1;
let curSlide = 0;

const slide = function (curSlide) {
  slides.forEach(
    (slide) => (slide.style.transform = `translateX(-${100 * curSlide}%)`)
  );
};

const nextSlide = () => {
  if (curSlide >= 0 && curSlide < maxSlide) {
    curSlide++;
  }

  if (curSlide === maxSlide) rightButton.classList.add("hidden");
  else {
    leftButton.classList.remove("hidden");
    rightButton.classList.remove("hidden");
  }
  slide(curSlide);
};

const prevSlide = () => {
  if (curSlide > 0 && curSlide <= maxSlide) {
    curSlide--;
  }

  if (curSlide === 0) leftButton.classList.add("hidden");
  else {
    leftButton.classList.remove("hidden");
    rightButton.classList.remove("hidden");
  }
  slide(curSlide);
};

rightButton.addEventListener("click", nextSlide);
leftButton.addEventListener("click", prevSlide);

//////////////////Implementing nav tab, its smooth scrolling,  and menu icon eventhandlers
//Display new links container
navLinksContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("menu")) {
    navLinksTab.classList.remove("hidden");
  }
});

//close new links container
navLinksTab.addEventListener("click", function (e) {
  if (e.target.classList.contains("close__icon")) {
    navLinksTab.classList.add("hidden");
  }
});

//Smooth scrolling
navLinksTab.addEventListener("click", function (e) {
  if (e.target.classList.contains("nav_link")) {
    if (
      //Something important happened with "activities.html"
      e.target.getAttribute("href") !== "/activities.html" &&
      e.target.getAttribute("href") !== "about.html"
    ) {
      e.preventDefault();
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  }
});

//////////////////////////////////////
// Preventing parcel from reloading my code everytime I save it
if (module.hot) module.hot.accept();

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

/////////////////Transpilling
// import "core-js/stable"; //doesn't work because parcel uses scrpts and not modules.

// TODO: fix stuff with ionoicons
