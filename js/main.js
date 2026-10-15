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

// ---------- Hero "just made an investment" card ----------
// Edit this list to change who rotates. `flag` is a country code (us, gb, mx, fr, de, ...).
const investments = [
  { avatar: "avatar-01", name: "Emily Carter", flag: "us", amount: "$2,200" },
  { avatar: "avatar-02", name: "Oliver Hughes", flag: "gb", amount: "$5,000" },
  { avatar: "avatar-03", name: "Sofia Hernández", flag: "mx", amount: "$1,450" },
  { avatar: "avatar-04", name: "Lucas Moreau", flag: "fr", amount: "$12,000" },
  { avatar: "avatar-05", name: "James Whitfield", flag: "ca", amount: "$3,750" },
  { avatar: "avatar-06", name: "Charlotte Evans", flag: "gb", amount: "$8,300" },
  { avatar: "avatar-07", name: "Isabella Rossi", flag: "it", amount: "$2,900" },
  { avatar: "avatar-08", name: "Mateo García", flag: "mx", amount: "$6,100" },
  { avatar: "avatar-09", name: "Hannah Schmidt", flag: "de", amount: "$15,000" },
  { avatar: "avatar-10", name: "Daniel Brooks", flag: "us", amount: "$4,250" },
  { avatar: "avatar-11", name: "Sophie van Dijk", flag: "nl", amount: "$9,800" },
  { avatar: "avatar-12", name: "Liam O'Connor", flag: "ie", amount: "$1,750" },
];
const TOAST_MS = 7000; // how long each person shows (the progress bar runs for this long)

const toast = document.getElementById("invest-toast");
const toastBar = document.getElementById("toast-bar");
const toastName = document.getElementById("toast-name");
const toastFlag = document.getElementById("toast-flag");
const toastAmount = document.getElementById("toast-amount");
const toastAvatar = document.getElementById("toast-avatar");
let current = 0;

// preload avatars and flags so swaps never flash empty
investments.forEach(({ avatar, flag }) => {
  new Image().src = `assets/images/avatars/${avatar}.png`;
  new Image().src = `https://flagcdn.com/${flag}.svg`;
});

// the bar fills over TOAST_MS; when it's full the card fades out and the next person fades in
function showNextInvestor() {
  toastBar.classList.remove("run");
  void toastBar.offsetWidth; // restart the CSS fill animation
  toastBar.classList.add("run");
  setTimeout(() => {
    toast.classList.add("is-hidden");
    setTimeout(() => {
      current = (current + 1) % investments.length;
      const { avatar, name, flag, amount } = investments[current];
      toastAvatar.src = `assets/images/avatars/${avatar}.png`;
      toastName.textContent = name;
      toastFlag.src = `https://flagcdn.com/${flag}.svg`;
      toastAmount.textContent = amount;
      toast.classList.remove("is-hidden");
      showNextInvestor();
    }, 400);
  }, TOAST_MS);
}

toastBar.style.setProperty("--toast-ms", TOAST_MS + "ms");
showNextInvestor();

// ---------- Animated foxes (section 2 headline + section 11) ----------
const foxes = [...document.querySelectorAll(".fox-live")];
const calmMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// each fox leans and tilts toward the cursor (movement scales with its size)
let leanFrame = null;
window.addEventListener("pointermove", (e) => {
  if (calmMotion || leanFrame) return;
  leanFrame = requestAnimationFrame(() => {
    leanFrame = null;
    foxes.forEach((fox) => {
      const r = fox.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return; // off screen: skip the work
      const k = r.width / 132;
      const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 500));
      const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 400));
      fox.querySelector(".fox-lean").style.transform = `translate(${dx * 8 * k}px, ${dy * 5 * k}px) rotate(${dx * 9}deg)`;
    });
  });
});

// happy hop on hover or tap
foxes.forEach((fox) => {
  const hop = () => {
    if (calmMotion || fox.classList.contains("hop")) return;
    fox.classList.add("hop");
    setTimeout(() => fox.classList.remove("hop"), 750);
  };
  fox.addEventListener("pointerenter", hop);
  fox.addEventListener("click", hop);
});
