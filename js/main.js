// ---------- Footer year stays current ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("hidden") === false;
  menuBtn.setAttribute("aria-expanded", open);
});

// ---------- Nav dropdowns (click support for touch / keyboard) ----------
document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const item = btn.closest(".dropdown");
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
    item.classList.toggle("open", !wasOpen);
    btn.setAttribute("aria-expanded", !wasOpen);
  });
});
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
});

// ---------- "Live account" widgets (one template, used in several cards) ----------
const widgetTpl = document.getElementById("live-widget-tpl");
document.querySelectorAll("[data-widget]").forEach((slot) => {
  slot.appendChild(widgetTpl.content.cloneNode(true));
});

// ---------- Testimonial slider ----------
const tTrack = document.querySelector(".t-track");
const tSlides = [...document.querySelectorAll(".t-slide")];
let tCurrent = 0;

function layoutTestimonials() {
  const n = tSlides.length;
  tSlides.forEach((slide, i) => {
    // shortest distance from the current slide, so the carousel loops both ways
    let offset = i - tCurrent;
    if (offset > n / 2) offset -= n;
    if (offset < -n / 2) offset += n;
    slide.style.setProperty("--offset", offset);
    slide.classList.toggle("is-active", offset === 0);
    slide.classList.toggle("is-far", Math.abs(offset) > 1);
    slide.setAttribute("aria-hidden", offset !== 0);
  });
}

// the track is as tall as the longest testimonial, so the buttons never jump
function sizeTestimonials() {
  tTrack.style.height = Math.max(...tSlides.map((s) => s.offsetHeight)) + "px";
}

function goTo(step) {
  tCurrent = (tCurrent + step + tSlides.length) % tSlides.length;
  layoutTestimonials();
}

document.getElementById("t-prev").addEventListener("click", () => goTo(-1));
document.getElementById("t-next").addEventListener("click", () => goTo(1));

// swipe on touch screens
let touchX = null;
tTrack.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
tTrack.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) goTo(dx < 0 ? 1 : -1);
  touchX = null;
});

layoutTestimonials();
new ResizeObserver(sizeTestimonials).observe(document.querySelector(".t-viewport"));
window.addEventListener("resize", sizeTestimonials);
document.fonts.ready.then(sizeTestimonials);

// ---------- Reveal sections as they scroll into view ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Hero "just made an investment" toast ----------
// Edit this list to change the names and amounts that rotate.
const investments = [
  { name: "Luiz Donovan", amount: "$2,200" },
  { name: "Amara Okafor", amount: "$5,000" },
  { name: "James Whitfield", amount: "$1,450" },
  { name: "Sofia Marchetti", amount: "$12,000" },
  { name: "Daniel Kim", amount: "$3,750" },
];

const toast = document.getElementById("invest-toast");
const toastName = document.getElementById("toast-name");
const toastAmount = document.getElementById("toast-amount");
const toastAvatar = document.getElementById("toast-avatar");
let current = 0;

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

setInterval(() => {
  toast.classList.add("is-hidden");
  setTimeout(() => {
    current = (current + 1) % investments.length;
    const { name, amount } = investments[current];
    toastName.textContent = name;
    toastAmount.textContent = amount;
    toastAvatar.textContent = initials(name);
    toast.classList.remove("is-hidden");
  }, 400);
}, 4500);
