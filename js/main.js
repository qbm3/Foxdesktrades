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
const tWrap = document.querySelector(".tc-wrap");
const tViewport = tWrap.querySelector(".tc-viewport");
const tTrack = tWrap.querySelector(".tc-track");
const tCards = [...tTrack.children];
const tPrev = document.getElementById("t-prev");
const tNext = document.getElementById("t-next");
let tCurrent = 0;

// how many cards fit beside the rating card decides how far the track can move
function layoutTestimonials() {
  const gap = parseFloat(getComputedStyle(tTrack).columnGap) || 0;
  const step = tCards[0].offsetWidth + gap;
  const room = tViewport.clientWidth - parseFloat(getComputedStyle(tViewport).paddingLeft);
  const visible = Math.max(1, Math.floor((room + gap + 1) / step));
  const last = Math.max(0, tCards.length - visible);
  tCurrent = Math.min(tCurrent, last);
  tTrack.style.transform = `translateX(${-tCurrent * step}px)`;
  tCards.forEach((card, i) => card.setAttribute("aria-hidden", i < tCurrent || i >= tCurrent + visible));
  tPrev.disabled = tCurrent === 0;
  tNext.disabled = tCurrent === last;
}

function goTo(step) {
  tCurrent = Math.max(0, tCurrent + step);
  layoutTestimonials();
}

tPrev.addEventListener("click", () => goTo(-1));
tNext.addEventListener("click", () => goTo(1));

// swipe on touch screens
let touchX = null;
tTrack.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
tTrack.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) goTo(dx < 0 ? 1 : -1);
  touchX = null;
});

new ResizeObserver(layoutTestimonials).observe(tViewport);

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

// ---------- Animated Civa logo marks (section 2 headline + section 11) ----------
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

// ---------- Lenis smooth scroll ----------
// Skipped for visitors who turn off motion in their system settings.
// Phones keep their native touch scrolling (Lenis only smooths mouse wheel / trackpad).
if (window.Lenis && !calmMotion) {
  const lenis = new Lenis({
    lerp: 0, // 0 = use the timed glide below instead of Lenis's default follow mode
    duration: 1.0, // seconds each scroll glides for — raise for floatier, lower for snappier
    easing: (t) => 1 - Math.pow(1 - t, 4), // fast start, long soft landing at the end
    wheelMultiplier: 1,
  });
  window.lenis = lenis; // handy for testing in the browser console
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // in-page links (#section) glide there too, stopping below the sticky header
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("href").length > 1 && document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -110 });
    });
  });
}

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

// Trade IPOs demo: stacked cards, front card fades up, the next one comes forward
document.querySelectorAll("[data-ipo-carousel]").forEach((root) => {
  const cards = [...root.querySelectorAll(".ipo-card")];
  const count = cards.length;
  let i = 0;
  let timer = null;
  const show = (n) => {
    i = (n + count) % count;
    cards.forEach((card, idx) => {
      const pos = (idx - i + count) % count;
      card.dataset.pos = pos === count - 1 ? "exit" : pos < 2 ? pos : "back";
    });
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };
  const start = () => {
    if (calmMotion || timer) return;
    timer = setInterval(() => show(i + 1), 3200);
  };
  show(0);
  root.addEventListener("pointerenter", stop);
  root.addEventListener("pointerleave", start);
  new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop())).observe(root);
});

// ---------- "Why choose us" pills: one line only ----------
// Shows as many pills as fit inside the card; any pill that would run past the edge is hidden (never wrapped).
function fitPills(row) {
  const pills = [...row.children];
  pills.forEach((p) => (p.hidden = false));
  for (let i = pills.length - 1; i > 0 && row.scrollWidth > row.clientWidth; i--) {
    pills[i].hidden = true;
  }
}
const pillRows = [...document.querySelectorAll("[data-fit-pills]")];
const pillObserver = new ResizeObserver((entries) => entries.forEach((e) => fitPills(e.target)));
pillRows.forEach((row) => pillObserver.observe(row));
document.fonts.ready.then(() => pillRows.forEach(fitPills));
