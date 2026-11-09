// Contact page form (contact.html only).
// The site has no backend, so "Send message" opens the visitor's email app with the message filled in.
// Kept out of main.js so a cached main.js can never leave this form without its handler.
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  const status = document.getElementById("contact-form-status");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactForm.classList.add("was-validated");
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }
    const f = (name) => contactForm.elements[name].value.trim();
    const name = `${f("first-name")} ${f("last-name")}`;
    const body = [f("message"), "", "—", `Name: ${name}`, `Email: ${f("email")}`, f("phone") ? `Phone: ${f("phone")}` : null]
      .filter((line) => line !== null) // drop the phone line when it's left blank
      .join("\n");
    const to = contactForm.dataset.mailto;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(`Website enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    status.textContent = `Your email app should open with your message ready to send. If it doesn't, email us at ${to}.`;
  });
}
