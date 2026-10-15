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
